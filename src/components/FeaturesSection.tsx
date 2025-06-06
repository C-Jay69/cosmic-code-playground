
import { Code2, Zap, Shield, Users, Rocket, Star } from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: Code2,
      title: "Intuitive Code Editor",
      description: "Write code with our powerful, syntax-highlighted editor that supports multiple programming languages and frameworks.",
      color: "brand-blue"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Experience blazing-fast performance with our optimized infrastructure and advanced caching mechanisms.",
      color: "brand-cyan"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your code and data are protected with enterprise-grade security measures and 99.9% uptime guarantee.",
      color: "brand-purple"
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Work seamlessly with your team using real-time collaboration tools and version control integration.",
      color: "brand-orange"
    },
    {
      icon: Rocket,
      title: "One-Click Deploy",
      description: "Deploy your applications instantly to the cloud with our streamlined deployment pipeline.",
      color: "brand-blue"
    },
    {
      icon: Star,
      title: "Premium Templates",
      description: "Start faster with our collection of professionally designed templates and boilerplates.",
      color: "brand-cyan"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Powerful Features for
            <span className="bg-gradient-to-r from-brand-cyan to-brand-purple bg-clip-text text-transparent">
              {" "}Modern Developers
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Everything you need to build, test, and deploy amazing web applications. 
            Our platform combines cutting-edge technology with developer-friendly tools.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-brand-light"
            >
              <div className={`w-16 h-16 bg-${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-brand-gray mb-4">{feature.title}</h3>
              <p className="text-brand-gray leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
