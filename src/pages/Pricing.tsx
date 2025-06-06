
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Zap, Crown, Rocket } from 'lucide-react';
import { useSubscription } from '@/contexts/SubscriptionContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Pricing = () => {
  const { user, subscription, refreshSubscription } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');
  const [couponCode, setCouponCode] = useState('');

  useEffect(() => {
    // Handle success/cancel from Stripe checkout
    if (searchParams.get('success') === 'true') {
      toast({
        title: "Payment Successful!",
        description: "Your subscription has been activated. It may take a moment to update.",
      });
      setTimeout(() => {
        refreshSubscription();
      }, 2000);
    } else if (searchParams.get('canceled') === 'true') {
      toast({
        title: "Payment Canceled",
        description: "Your subscription was not created. You can try again anytime.",
        variant: "destructive",
      });
    }
  }, [searchParams, toast, refreshSubscription]);

  const plans = [
    {
      id: 'starter',
      name: "Starter Plan",
      icon: Zap,
      price: { monthly: 0, yearly: 0 },
      description: "Perfect for getting started",
      features: [
        "Limited Agent access",
        "5 public apps",
        "Basic AI features",
        "Community support"
      ],
      buttonText: "Current Plan",
      color: "brand-gray",
      free: true
    },
    {
      id: 'pro',
      name: "Pro Plan",
      icon: Crown,
      price: { monthly: 19.95, yearly: 14.95 },
      yearlyTotal: 179.40,
      description: "For serious developers",
      features: [
        "Full Agent access",
        "$20 of monthly credits (~100 Agent checkpoints)",
        "Unlimited public and private apps",
        "Deploy and host live apps",
        "Pay-as-you-go for additional usage"
      ],
      buttonText: "Upgrade to Pro",
      color: "brand-purple",
      popular: true
    },
    {
      id: 'boss-teams',
      name: "The Boss Teams",
      icon: Rocket,
      price: { monthly: 29.95, yearly: 24.95 },
      yearlyTotal: 299.40,
      description: "For teams and organizations",
      features: [
        "Everything included with Pro Plan",
        "$30/mo in usage credits included",
        "Credits granted upfront on annual plan",
        "50 Viewer seats",
        "Centralized billing",
        "Role-based access control",
        "Private deployments",
        "Pay-as-you-go for additional usage"
      ],
      buttonText: "Upgrade to Boss Teams",
      color: "brand-orange",
      popular: false
    }
  ];

  const handleSubscribe = async (planId: string) => {
    console.log('Subscribe button clicked for plan:', planId);
    
    if (!user) {
      console.log('No user found, redirecting to auth');
      toast({
        title: "Authentication Required",
        description: "Please sign in to subscribe to a plan.",
        variant: "destructive",
      });
      navigate('/auth');
      return;
    }

    if (planId === 'starter') {
      toast({
        title: "Already on Starter Plan",
        description: "You're already on the free Starter plan!",
      });
      return;
    }

    setLoading(true);
    try {
      console.log('Getting session for checkout...');
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        console.log('No session found');
        throw new Error('No session found');
      }

      console.log('Invoking create-checkout function...');
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          plan: planId,
          billing: billingCycle,
          couponCode: couponCode || null
        },
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      console.log('Checkout session created, redirecting to:', data.url);
      // Redirect to Stripe checkout
      window.location.href = data.url;
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    console.log('Manage subscription button clicked');
    
    if (!user) {
      console.log('No user found for subscription management');
      return;
    }
    
    setLoading(true);
    try {
      console.log('Getting session for customer portal...');
      const { data: session } = await supabase.auth.getSession();
      if (!session.session) {
        console.log('No session found');
        throw new Error('No session found');
      }

      console.log('Invoking customer-portal function...');
      const { data, error } = await supabase.functions.invoke('customer-portal', {
        headers: {
          Authorization: `Bearer ${session.session.access_token}`,
        },
      });

      if (error) {
        console.error('Customer portal error:', error);
        throw error;
      }

      console.log('Customer portal session created, opening:', data.url);
      window.open(data.url, '_blank');
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Error",
        description: "Failed to open subscription management",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshSubscription = async () => {
    console.log('Refresh subscription button clicked');
    try {
      await refreshSubscription();
      toast({
        title: "Subscription Refreshed",
        description: "Your subscription status has been updated.",
      });
    } catch (error) {
      console.error('Error refreshing subscription:', error);
      toast({
        title: "Error",
        description: "Failed to refresh subscription status",
        variant: "destructive",
      });
    }
  };

  const currentPlan = subscription?.subscription_tier || 'starter';

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Choose Your
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              {" "}Perfect Plan
            </span>
          </h1>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto mb-8">
            Start with our free Starter plan or upgrade to unlock advanced features and higher limits.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <span className={billingCycle === 'monthly' ? 'font-semibold' : 'text-gray-500'}>Monthly</span>
            <button
              onClick={() => {
                console.log('Billing toggle clicked, changing to:', billingCycle === 'monthly' ? 'yearly' : 'monthly');
                setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly');
              }}
              className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-purple focus:ring-offset-2"
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={billingCycle === 'yearly' ? 'font-semibold' : 'text-gray-500'}>
              Yearly <Badge variant="secondary" className="ml-1">Save 25%</Badge>
            </span>
          </div>

          {/* Coupon Code Input */}
          <div className="max-w-md mx-auto mb-4">
            <Input
              placeholder="Enter coupon code (optional)"
              value={couponCode}
              onChange={(e) => {
                console.log('Coupon code changed:', e.target.value);
                setCouponCode(e.target.value.toUpperCase());
              }}
              className="text-center"
            />
          </div>

          {/* Refresh Subscription Button */}
          <div className="mb-8">
            <Button 
              onClick={handleRefreshSubscription}
              variant="outline"
              size="sm"
            >
              Refresh Subscription Status
            </Button>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan) => (
            <Card 
              key={plan.id}
              className={`relative hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 ${
                plan.popular || plan.id === 'boss-teams' ? 'border-2 border-brand-purple' : 'border border-brand-light'
              } ${currentPlan === plan.id ? 'ring-2 ring-green-500' : ''}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white px-4 py-1">
                    Most Popular
                  </Badge>
                </div>
              )}
              
              {currentPlan === plan.id && (
                <div className="absolute -top-4 right-4">
                  <Badge variant="secondary" className="bg-green-500 text-white">
                    Current Plan
                  </Badge>
                </div>
              )}

              <CardHeader className="text-center">
                <div className={`w-16 h-16 bg-${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                  <plan.icon className="h-8 w-8 text-white" />
                </div>
                <CardTitle className="text-2xl">{plan.name}</CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  {plan.free ? (
                    <span className="text-4xl font-bold text-brand-gray">Free</span>
                  ) : (
                    <div>
                      <span className="text-4xl font-bold text-brand-gray">
                        ${billingCycle === 'monthly' ? plan.price.monthly : plan.price.yearly}
                      </span>
                      <span className="text-brand-gray ml-2">
                        {billingCycle === 'monthly' ? '/month' : '/month'}
                      </span>
                      {billingCycle === 'yearly' && plan.yearlyTotal && (
                        <div className="text-sm text-gray-500 mt-1">
                          Billed annually (${plan.yearlyTotal})
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-brand-gray">{feature}</span>
                    </li>
                  ))}
                </ul>

                {currentPlan === plan.id ? (
                  currentPlan !== 'starter' && subscription?.subscribed ? (
                    <Button 
                      onClick={handleManageSubscription}
                      disabled={loading}
                      className="w-full"
                      variant="outline"
                    >
                      {loading ? 'Loading...' : 'Manage Subscription'}
                    </Button>
                  ) : (
                    <Button disabled className="w-full" variant="outline">
                      Current Plan
                    </Button>
                  )
                ) : (
                  <Button 
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={loading}
                    className={`w-full ${
                      (plan.popular || plan.id === 'boss-teams')
                        ? 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90' 
                        : ''
                    }`}
                    variant={(plan.popular || plan.id === 'boss-teams') ? 'default' : 'outline'}
                  >
                    {loading ? 'Loading...' : plan.buttonText}
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Current Subscription Status */}
        {user && subscription && (
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle className="text-center">Your Current Subscription</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="space-y-2">
                <p><strong>Plan:</strong> {subscription.subscription_tier.charAt(0).toUpperCase() + subscription.subscription_tier.slice(1)}</p>
                <p><strong>Status:</strong> {subscription.subscribed ? 'Active' : 'Free'}</p>
                {subscription.subscription_end && (
                  <p><strong>Next Billing:</strong> {new Date(subscription.subscription_end).toLocaleDateString()}</p>
                )}
                {subscription.is_admin && (
                  <Badge className="bg-purple-500 text-white">Admin Access</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Pricing;
