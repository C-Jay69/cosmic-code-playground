
import { Button } from '@/components/ui/button';
import { Play, GitBranch, Globe, Smartphone } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-light via-white to-brand-light animate-gradient-shift bg-[length:400%_400%]"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-brand-orange rounded-full opacity-20 animate-bounce"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-brand-purple rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute bottom-20 left-20 w-24 h-24 bg-brand-cyan rounded-full opacity-20 animate-bounce delay-500"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-brand-gray mb-6 leading-tight">
            Code, Create,
            <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-cyan bg-clip-text text-transparent">
              {" "}Collaborate
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto mb-8 leading-relaxed">
            The ultimate online IDE where ideas become reality. Build, share, and deploy your projects with lightning speed.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button 
            size="lg" 
            className="bg-gradient-to-r from-brand-purple to-brand-blue text-white hover:opacity-90 transform hover:scale-105 transition-all px-8 py-4 text-lg"
          >
            <Play className="mr-2 h-5 w-5" />
            Start Building Now
          </Button>
          <Button 
            size="lg" 
            variant="outline" 
            className="border-2 border-brand-cyan text-brand-cyan hover:bg-brand-cyan hover:text-white px-8 py-4 text-lg"
          >
            View Demo
          </Button>
        </div>

        {/* Feature Icons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-brand-orange rounded-lg flex items-center justify-center mb-3">
              <Globe className="h-6 w-6 text-white" />
            </div>
            <span className="text-brand-gray font-semibold">Web Apps</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-brand-blue rounded-lg flex items-center justify-center mb-3">
              <Smartphone className="h-6 w-6 text-white" />
            </div>
            <span className="text-brand-gray font-semibold">Mobile</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-brand-purple rounded-lg flex items-center justify-center mb-3">
              <GitBranch className="h-6 w-6 text-white" />
            </div>
            <span className="text-brand-gray font-semibold">Git Integration</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="w-12 h-12 bg-brand-cyan rounded-lg flex items-center justify-center mb-3">
              <Play className="h-6 w-6 text-white" />
            </div>
            <span className="text-brand-gray font-semibold">Live Preview</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
