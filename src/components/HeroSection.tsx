import { Button } from '@/components/ui/button';
import { ArrowRight, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const HeroSection = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleStartBuilding = () => {
    console.log('Start Building button clicked');
    try {
      navigate('/auth');
      toast({
        title: "Get Started",
        description: "Sign up or log in to start building amazing projects!",
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Navigation Error",
        description: "There was an issue navigating to the auth page.",
        variant: "destructive",
      });
    }
  };

  const handleViewDemo = () => {
    console.log('View Demo button clicked');
    try {
      navigate('/demo');
      toast({
        title: "Loading Demo",
        description: "Taking you to our interactive demo!",
      });
    } catch (error) {
      console.error('Navigation error:', error);
      toast({
        title: "Navigation Error",
        description: "There was an issue loading the demo.",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-light via-white to-brand-light overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand-cyan rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-brand-purple rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-brand-orange rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s' }}></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-gray mb-8 leading-tight">
            Code Your Ideas Into
            <span className="block bg-gradient-to-r from-brand-purple via-brand-cyan to-brand-blue bg-clip-text text-transparent animate-gradient-shift bg-300% mt-4">
              Reality
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-brand-gray mb-12 max-w-3xl mx-auto leading-relaxed">
            Transform your creative vision into powerful web applications with our intuitive coding platform. 
            Build, deploy, and share your projects with the world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={handleStartBuilding}
              size="lg" 
              className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90 transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg shadow-lg"
            >
              Start Building
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              onClick={handleViewDemo}
              size="lg" 
              variant="outline" 
              className="border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white transform hover:scale-105 transition-all duration-300 px-8 py-4 text-lg"
            >
              <Play className="mr-2 h-5 w-5" />
              View Demo
            </Button>
          </div>
          
          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-purple mb-2">10K+</div>
              <div className="text-brand-gray">Projects Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-cyan mb-2">5K+</div>
              <div className="text-brand-gray">Happy Developers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-orange mb-2">99.9%</div>
              <div className="text-brand-gray">Uptime</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-brand-gray rounded-full flex justify-center">
          <div className="w-1 h-3 bg-brand-gray rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
