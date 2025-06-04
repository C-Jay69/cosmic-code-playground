
import { Code2, Users, Zap, Shield, Cloud, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeaturesSection = () => {
  const features = [
    {
      icon: Code2,
      title: "Smart Code Editor",
      description: "Intelligent autocomplete, syntax highlighting, and error detection for 50+ languages.",
      color: "brand-blue",
      bgColor: "bg-brand-blue"
    },
    {
      icon: Users,
      title: "Real-time Collaboration",
      description: "Code together with your team in real-time, just like Google Docs but for code.",
      color: "brand-purple",
      bgColor: "bg-brand-purple"
    },
    {
      icon: Zap,
      title: "Instant Deployment",
      description: "Deploy your applications with a single click. No complex configurations needed.",
      color: "brand-cyan",
      bgColor: "bg-brand-cyan"
    },
    {
      icon: Shield,
      title: "Secure Environment",
      description: "Enterprise-grade security with encrypted connections and private repositories.",
      color: "brand-orange",
      bgColor: "bg-brand-orange"
    },
    {
      icon: Cloud,
      title: "Cloud Powered",
      description: "Run your code in powerful cloud containers with unlimited computing resources.",
      color: "brand-gray",
      bgColor: "bg-brand-gray"
    },
    {
      icon: Palette,
      title: "Custom Themes",
      description: "Personalize your coding experience with beautiful themes and layouts.",
      color: "brand-purple",
      bgColor: "bg-brand-purple"
    }
  ];

  return (
    <section id="explore" className="py-20 bg-gradient-to-b from-white to-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Everything You Need to
            <span className="bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">
              {" "}Code Better
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            From idea to deployment, our platform provides all the tools you need to bring your vision to life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-brand-light"
            >
              <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-gray mb-4">{feature.title}</h3>
              <p className="text-brand-gray leading-relaxed mb-6">{feature.description}</p>
              <Button 
                variant="outline" 
                className={`border-${feature.color} text-${feature.color} hover:bg-${feature.color} hover:text-white`}
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-brand-blue to-brand-purple text-white hover:opacity-90 px-8 py-4 text-lg"
          >
            Explore All Features
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
