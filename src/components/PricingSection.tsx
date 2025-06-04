
import { Button } from '@/components/ui/button';
import { Check, Zap, Crown, Rocket } from 'lucide-react';

const PricingSection = () => {
  const plans = [
    {
      name: "Free",
      icon: Zap,
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 public projects",
        "1GB storage",
        "Community support",
        "Basic templates",
        "Standard performance"
      ],
      buttonText: "Get Started",
      buttonStyle: "outline",
      popular: false,
      color: "brand-gray"
    },
    {
      name: "Pro",
      icon: Crown,
      price: "$10",
      period: "per month",
      description: "For serious developers",
      features: [
        "Unlimited projects",
        "100GB storage",
        "Priority support",
        "Advanced templates",
        "High performance",
        "Private repositories",
        "Custom domains",
        "Team collaboration"
      ],
      buttonText: "Start Pro Trial",
      buttonStyle: "gradient",
      popular: true,
      color: "brand-purple"
    },
    {
      name: "Enterprise",
      icon: Rocket,
      price: "$50",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Unlimited storage",
        "24/7 phone support",
        "Custom integrations",
        "SSO authentication",
        "Advanced analytics",
        "Dedicated account manager",
        "SLA guarantee"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "outline",
      popular: false,
      color: "brand-orange"
    }
  ];

  return (
    <section id="pricing" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Simple,
            <span className="bg-gradient-to-r from-brand-cyan to-brand-blue bg-clip-text text-transparent">
              {" "}Transparent Pricing
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Choose the perfect plan for your coding journey. All plans include our core features with no hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {plans.map((plan, index) => (
            <div 
              key={index}
              className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 ${
                plan.popular ? 'border-brand-purple' : 'border-brand-light'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white px-6 py-2 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <plan.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-gray mb-2">{plan.name}</h3>
                  <p className="text-brand-gray mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-4xl font-bold text-brand-gray">{plan.price}</span>
                    <span className="text-brand-gray ml-2">/{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-brand-gray">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full py-4 text-lg ${
                    plan.buttonStyle === 'gradient' 
                      ? 'bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90' 
                      : `border-2 border-${plan.color} text-${plan.color} hover:bg-${plan.color} hover:text-white`
                  }`}
                  variant={plan.buttonStyle === 'outline' ? 'outline' : 'default'}
                >
                  {plan.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center bg-brand-light rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-brand-gray mb-4">Need a Custom Solution?</h3>
          <p className="text-brand-gray mb-6">
            We offer custom enterprise solutions tailored to your specific needs and requirements.
          </p>
          <Button 
            size="lg"
            className="bg-gradient-to-r from-brand-orange to-brand-purple text-white hover:opacity-90 px-8 py-4 text-lg"
          >
            Contact Enterprise Sales
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
