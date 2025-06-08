
import { Button } from '@/components/ui/button';
import { ArrowLeft, Download, Eye, Code, Globe, Smartphone, ShoppingCart, User, Briefcase } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Templates = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownload = (templateName: string) => {
    toast({
      title: "Download Started",
      description: `Downloading ${templateName} template...`,
    });
    // Simulate download - in real app, this would trigger actual file download
    console.log(`Downloading template: ${templateName}`);
  };

  const handlePreview = (templateName: string) => {
    toast({
      title: "Preview Available",
      description: `Opening preview for ${templateName}...`,
    });
    // In real app, this would open a preview window
    console.log(`Previewing template: ${templateName}`);
  };

  const templates = [
    {
      id: 1,
      title: "E-commerce Store",
      description: "Complete online store with shopping cart, payment integration, and admin dashboard. Perfect for retail businesses.",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=250&fit=crop&crop=center",
      icon: ShoppingCart,
      tags: ["React", "Node.js", "Stripe", "MongoDB"],
      color: "brand-blue",
      downloads: "2.3k",
      rating: "4.8"
    },
    {
      id: 2,
      title: "Portfolio Website",
      description: "Professional portfolio template perfect for showcasing your work, skills, and experience to potential clients.",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=250&fit=crop&crop=center",
      icon: User,
      tags: ["HTML", "CSS", "JavaScript", "GSAP"],
      color: "brand-purple",
      downloads: "1.8k",
      rating: "4.9"
    },
    {
      id: 3,
      title: "Mobile App UI",
      description: "Modern mobile app interface with smooth animations and responsive design. Great for mobile-first applications.",
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=250&fit=crop&crop=center",
      icon: Smartphone,
      tags: ["React Native", "UI/UX", "Expo"],
      color: "brand-cyan",
      downloads: "1.2k",
      rating: "4.7"
    },
    {
      id: 4,
      title: "Business Landing",
      description: "Professional business landing page with contact forms, testimonials, and service showcase sections.",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&crop=center",
      icon: Briefcase,
      tags: ["Vue.js", "Tailwind", "Forms"],
      color: "brand-orange",
      downloads: "1.5k",
      rating: "4.6"
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "Full-featured blog platform with CMS, user authentication, and comment system. SEO optimized.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop&crop=center",
      icon: Globe,
      tags: ["Next.js", "Prisma", "PostgreSQL"],
      color: "brand-blue",
      downloads: "950",
      rating: "4.8"
    },
    {
      id: 6,
      title: "SaaS Dashboard",
      description: "Complete SaaS application dashboard with analytics, user management, and subscription handling.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=250&fit=crop&crop=center",
      icon: Code,
      tags: ["React", "Charts", "Auth", "Stripe"],
      color: "brand-purple",
      downloads: "2.1k",
      rating: "4.9"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Button 
            variant="outline" 
            onClick={() => navigate('/')}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
          
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Template
            <span className="bg-gradient-to-r from-brand-orange to-brand-purple bg-clip-text text-transparent">
              {" "}Library
            </span>
          </h1>
          <p className="text-xl text-brand-gray max-w-3xl">
            Download professional, production-ready templates to jumpstart your projects. 
            Each template is fully customizable and comes with documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div 
              key={template.id}
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
                <div className="absolute bottom-4 left-4 flex gap-2">
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                    ★ {template.rating}
                  </span>
                  <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
                    {template.downloads} downloads
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-brand-gray mb-3">{template.title}</h3>
                <p className="text-brand-gray mb-4 text-sm leading-relaxed">{template.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {template.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-3 py-1 bg-brand-light text-brand-gray text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    onClick={() => handlePreview(template.title)}
                    variant="outline"
                    size="sm"
                    className="flex-1"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                  <Button 
                    onClick={() => handleDownload(template.title)}
                    size="sm"
                    className="flex-1 bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold text-brand-gray mb-4">Need a Custom Template?</h2>
            <p className="text-brand-gray mb-6">Can't find what you're looking for? Our team can create custom templates tailored to your specific needs.</p>
            <Button 
              onClick={() => navigate('/auth')}
              className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90"
            >
              Request Custom Template
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Templates;
