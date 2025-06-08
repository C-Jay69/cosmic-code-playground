import { Button } from '@/components/ui/button';
import { ArrowRight, Code, Globe, Smartphone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TemplatesSection = () => {
  const navigate = useNavigate();

  const handleUseTemplate = (templateTitle: string) => {
    console.log(`Use Template button clicked for: ${templateTitle}`);
    // Navigate to templates page to browse and download
    navigate('/templates');
  };

  const handleViewAllTemplates = () => {
    console.log('View All Templates button clicked');
    // Navigate to templates page
    navigate('/templates');
  };

  const templates = [
    {
      title: "E-commerce Store",
      description: "Complete online store with shopping cart, payment integration, and admin dashboard.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
      icon: Globe,
      tags: ["React", "Node.js", "Stripe"],
      color: "brand-blue"
    },
    {
      title: "Portfolio Website",
      description: "Professional portfolio template perfect for showcasing your work and skills.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop&crop=center",
      icon: Code,
      tags: ["HTML", "CSS", "JavaScript"],
      color: "brand-purple"
    },
    {
      title: "Mobile App UI",
      description: "Modern mobile app interface with smooth animations and responsive design.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center",
      icon: Smartphone,
      tags: ["React Native", "UI/UX"],
      color: "brand-cyan"
    }
  ];

  return (
    <section id="templates" className="py-20 bg-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Ready-to-Use
            <span className="bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">
              {" "}Templates
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Jump-start your projects with our carefully crafted templates. 
            Each template is fully customizable and production-ready.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={template.image} 
                  alt={template.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className={`absolute top-4 right-4 w-12 h-12 bg-${template.color} rounded-xl flex items-center justify-center`}>
                  <template.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-gray mb-3">{template.title}</h3>
                <p className="text-brand-gray mb-4">{template.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-brand-light text-brand-gray text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <Button 
                  onClick={() => handleUseTemplate(template.title)}
                  className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90"
                >
                  Use Template
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            onClick={handleViewAllTemplates}
            size="lg"
            variant="outline"
            className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-4 text-lg"
          >
            View All Templates
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
