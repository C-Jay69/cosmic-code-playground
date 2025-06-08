
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Demo = () => {
  const navigate = useNavigate();

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
            Live Demo
            <span className="bg-gradient-to-r from-brand-purple to-brand-cyan bg-clip-text text-transparent">
              {" "}Preview
            </span>
          </h1>
          <p className="text-xl text-brand-gray max-w-3xl">
            Watch our platform in action and see how easy it is to build amazing web applications.
          </p>
        </div>

        {/* Demo Video Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-6">
            <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-video bg-gray-900 flex items-center justify-center">
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Vibe Coding Platform Demo"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg"
                ></iframe>
              </div>
            </div>
            
            <div className="flex gap-4">
              <Button 
                className="bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90"
                onClick={() => navigate('/auth')}
              >
                <Play className="mr-2 h-4 w-4" />
                Try It Now
              </Button>
              <Button 
                variant="outline"
                onClick={() => navigate('/templates')}
              >
                <Download className="mr-2 h-4 w-4" />
                Browse Templates
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-brand-gray">Key Features Demonstrated</h2>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-purple rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-brand-gray">Drag & Drop Interface</h3>
                  <p className="text-brand-gray">Build layouts visually with our intuitive editor</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-cyan rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-brand-gray">Real-time Preview</h3>
                  <p className="text-brand-gray">See your changes instantly as you code</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-brand-orange rounded-full mt-2"></div>
                <div>
                  <h3 className="font-semibold text-brand-gray">One-Click Deploy</h3>
                  <p className="text-brand-gray">Launch your app to the web in seconds</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Demo Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-white rounded-2xl p-8 shadow-lg">
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-purple mb-2">5 min</div>
            <div className="text-brand-gray">Average Build Time</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-cyan mb-2">Zero</div>
            <div className="text-brand-gray">Setup Required</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-brand-orange mb-2">100%</div>
            <div className="text-brand-gray">Cloud-based</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Demo;
