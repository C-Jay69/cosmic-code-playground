
import { Button } from '@/components/ui/button';
import { ArrowLeft, Plus, Code, Palette, Database, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Build = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCreateProject = (projectType: string) => {
    toast({
      title: "Creating Project",
      description: `Starting a new ${projectType} project...`,
    });
    console.log(`Creating new ${projectType} project`);
  };

  const projectTypes = [
    {
      id: 'react-app',
      title: 'React Web App',
      description: 'Build a modern web application with React and TypeScript',
      icon: Code,
      color: 'brand-blue'
    },
    {
      id: 'landing-page',
      title: 'Landing Page',
      description: 'Create a beautiful landing page for your business',
      icon: Globe,
      color: 'brand-purple'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Site',
      description: 'Showcase your work with a professional portfolio',
      icon: Palette,
      color: 'brand-cyan'
    },
    {
      id: 'dashboard',
      title: 'Dashboard App',
      description: 'Build a data-driven dashboard with charts and analytics',
      icon: Database,
      color: 'brand-orange'
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
            Start
            <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">
              {" "}Building
            </span>
          </h1>
          <p className="text-xl text-brand-gray max-w-3xl">
            Choose a project type to get started. Each template comes with everything you need to build amazing applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {projectTypes.map((project) => (
            <div 
              key={project.id}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className={`w-16 h-16 bg-${project.color} rounded-xl flex items-center justify-center mb-6`}>
                <project.icon className="h-8 w-8 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold text-brand-gray mb-4">{project.title}</h3>
              <p className="text-brand-gray mb-6 leading-relaxed">{project.description}</p>
              
              <Button 
                onClick={() => handleCreateProject(project.title)}
                className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90"
              >
                <Plus className="mr-2 h-4 w-4" />
                Create Project
              </Button>
            </div>
          ))}
        </div>

        <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
          <h2 className="text-2xl font-bold text-brand-gray mb-4">Need Inspiration?</h2>
          <p className="text-brand-gray mb-6">
            Browse our template library for ready-made solutions you can customize.
          </p>
          <Button 
            onClick={() => navigate('/templates')}
            variant="outline"
            className="border-2 border-brand-purple text-brand-purple hover:bg-brand-purple hover:text-white"
          >
            Browse Templates
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Build;
