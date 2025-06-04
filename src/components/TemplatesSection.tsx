
import { Button } from '@/components/ui/button';
import { ExternalLink, Star, Download } from 'lucide-react';

const TemplatesSection = () => {
  const templates = [
    {
      title: "React Todo App",
      description: "A complete todo application with React hooks and local storage",
      language: "JavaScript",
      stars: 1247,
      downloads: 5632,
      color: "brand-cyan",
      gradient: "from-brand-cyan to-brand-blue"
    },
    {
      title: "Node.js API Server",
      description: "RESTful API with Express, MongoDB, and authentication",
      language: "Node.js",
      stars: 892,
      downloads: 3421,
      color: "brand-orange",
      gradient: "from-brand-orange to-brand-purple"
    },
    {
      title: "Python Data Analyzer",
      description: "Data visualization dashboard with Pandas and Matplotlib",
      language: "Python",
      stars: 2156,
      downloads: 7893,
      color: "brand-purple",
      gradient: "from-brand-purple to-brand-cyan"
    },
    {
      title: "Flutter Mobile App",
      description: "Cross-platform mobile app with beautiful UI components",
      language: "Dart",
      stars: 634,
      downloads: 2187,
      color: "brand-blue",
      gradient: "from-brand-blue to-brand-orange"
    },
    {
      title: "Vue.js Dashboard",
      description: "Admin dashboard with charts, tables, and user management",
      language: "Vue.js",
      stars: 1589,
      downloads: 4567,
      color: "brand-cyan",
      gradient: "from-brand-cyan to-brand-purple"
    },
    {
      title: "Machine Learning Model",
      description: "TensorFlow model for image classification and prediction",
      language: "Python",
      stars: 3421,
      downloads: 12456,
      color: "brand-orange",
      gradient: "from-brand-orange to-brand-blue"
    }
  ];

  return (
    <section id="templates" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Start with
            <span className="bg-gradient-to-r from-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {" "}Ready-Made Templates
            </span>
          </h2>
          <p className="text-xl text-brand-gray max-w-3xl mx-auto">
            Skip the setup and jump straight into coding with our curated collection of project templates.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {templates.map((template, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-brand-light"
            >
              <div className={`h-32 bg-gradient-to-r ${template.gradient} flex items-center justify-center`}>
                <div className="text-white text-center">
                  <div className="text-sm font-semibold opacity-90">{template.language}</div>
                  <div className="text-2xl font-bold mt-1">{template.title}</div>
                </div>
              </div>
              
              <div className="p-6">
                <p className="text-brand-gray mb-4 leading-relaxed">{template.description}</p>
                
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4 text-sm text-brand-gray">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      {template.stars.toLocaleString()}
                    </div>
                    <div className="flex items-center">
                      <Download className="h-4 w-4 mr-1" />
                      {template.downloads.toLocaleString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex space-x-3">
                  <Button 
                    className={`flex-1 bg-${template.color} hover:opacity-90 text-white`}
                  >
                    Use Template
                  </Button>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            variant="outline"
            className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white px-8 py-4 text-lg"
          >
            Browse All Templates
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TemplatesSection;
