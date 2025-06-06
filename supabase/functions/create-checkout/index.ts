
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

    const { plan, billing, couponCode } = await req.json();
    logStep("Request data", { plan, billing, couponCode });

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

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Define pricing based on plan and billing cycle
    const pricing = {
      pro: {
        monthly: { amount: 1995, interval: 'month' }, // $19.95
        yearly: { amount: 17940, interval: 'year' }   // $179.40 ($14.95/month)
      },
      'boss-teams': {
        monthly: { amount: 2995, interval: 'month' }, // $29.95
        yearly: { amount: 29940, interval: 'year' }   // $299.40 ($24.95/month)
      }
    };

    if (plan === 'starter') {
      throw new Error("Starter plan is free - no payment required");
    }

    const planPricing = pricing[plan as keyof typeof pricing];
    if (!planPricing) throw new Error("Invalid plan selected");

    const billingPricing = planPricing[billing as keyof typeof planPricing];
    if (!billingPricing) throw new Error("Invalid billing cycle selected");

    // Check for existing customer
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
      logStep("Found existing customer", { customerId });
    }

    // Validate coupon if provided
    let coupon = null;
    if (couponCode) {
      const { data: couponData } = await supabaseClient
        .from('coupons')
        .select('*')
        .eq('code', couponCode.toUpperCase())
        .eq('active', true)
        .single();

      if (couponData) {
        const now = new Date();
        const expiresAt = couponData.expires_at ? new Date(couponData.expires_at) : null;
        if (!expiresAt || expiresAt > now) {
          coupon = couponData;
          logStep("Valid coupon found", { code: couponCode, discount: coupon.discount_percentage });
        }
      }
    }

    // Create Stripe coupon if we have a valid one
    let stripeCouponId = null;
    if (coupon) {
      const stripeCoupon = await stripe.coupons.create({
        percent_off: coupon.discount_percentage,
        duration: 'once',
        name: `${coupon.discount_percentage}% off`,
      });
      stripeCouponId = stripeCoupon.id;
    }

    const sessionData: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { 
              name: plan === 'pro' ? 'Pro Plan' : 'The Boss Teams Plan',
              description: plan === 'pro' 
                ? 'Full Agent access, unlimited apps, $20 monthly credits'
                : 'Everything in Pro + $30 monthly credits, 50 viewer seats, role-based access'
            },
            unit_amount: billingPricing.amount,
            recurring: { interval: billingPricing.interval },
          },
          quantity: 1,
        },
      ],
      mode: "subscription",
      success_url: `${req.headers.get("origin")}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/pricing`,
      metadata: {
        user_id: user.id,
        plan: plan,
        billing: billing,
      },
    };

    if (stripeCouponId) {
      sessionData.discounts = [{ coupon: stripeCouponId }];
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
