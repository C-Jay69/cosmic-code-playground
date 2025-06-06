
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      { auth: { persistSession: false } }
    );

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");
    logStep("User authenticated", { userId: user.id, email: user.email });

    const { plan, billing, couponCode } = await req.json();
    logStep("Request data", { plan, billing, couponCode });

    if (plan === 'starter') {
      throw new Error("Cannot create checkout for free starter plan");
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check for existing customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    } else {
      const customer = await stripe.customers.create({ email: user.email });
      customerId = customer.id;
      logStep("Created new customer", { customerId });
    }

    // Define price data based on plan and billing cycle
    let priceData;
    if (plan === 'pro') {
      priceData = {
        currency: "usd",
        product_data: { name: "Pro Plan" },
        unit_amount: billing === 'yearly' ? 1495 : 1995, // $14.95/month yearly or $19.95/month
        recurring: { interval: billing === 'yearly' ? 'year' : 'month' },
      };
    } else if (plan === 'boss-teams') {
      priceData = {
        currency: "usd",
        product_data: { name: "The Boss Teams" },
        unit_amount: billing === 'yearly' ? 2495 : 2995, // $24.95/month yearly or $29.95/month
        recurring: { interval: billing === 'yearly' ? 'year' : 'month' },
      };
    } else {
      throw new Error("Invalid plan specified");
    }

    // Create checkout session
    const sessionData: any = {
      customer: customerId,
      line_items: [
        {
          price_data: priceData,
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/pricing?success=true`,
      cancel_url: `${req.headers.get("origin")}/pricing?canceled=true`,
    };

    // Apply coupon if provided
    if (couponCode) {
      const { data: coupon } = await supabaseClient
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('active', true)
        .single();

      if (coupon) {
        const stripeCoupon = await stripe.coupons.create({
          percent_off: coupon.discount_percentage,
          duration: 'once',
        });
        sessionData.discounts = [{ coupon: stripeCoupon.id }];
        logStep("Applied coupon", { couponCode, discount: coupon.discount_percentage });
      }
    }

    const session = await stripe.checkout.sessions.create(sessionData);
    logStep("Checkout session created", { sessionId: session.id, url: session.url });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR in create-checkout", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
