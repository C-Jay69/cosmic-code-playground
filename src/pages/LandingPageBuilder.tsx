
import { Button } from '@/components/ui/button';
import { ArrowLeft, Globe, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const LandingPageBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleDownloadTemplate = () => {
    toast({
      title: "Downloading Template",
      description: "Your landing page template is being prepared...",
    });
    // Simulate template download
    setTimeout(() => {
      const link = document.createElement('a');
      link.href = 'data:application/zip;base64,UEsDBAoAAAAAAA=='; // Mock zip data
      link.download = 'landing-page-template.zip';
      link.click();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/build')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Build
        </Button>

        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-brand-purple rounded-xl flex items-center justify-center mr-4">
              <Globe className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-brand-gray">Landing Page Builder</h1>
              <p className="text-brand-gray">Create a beautiful landing page for your business</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold text-brand-gray mb-3">Includes:</h3>
              <ul className="space-y-2 text-brand-gray">
                <li>• Hero section with CTA</li>
                <li>• Features showcase</li>
                <li>• Testimonials section</li>
                <li>• Contact form</li>
                <li>• Responsive design</li>
              </ul>
            </div>
            <div className="p-6 border rounded-lg">
              <h3 className="text-lg font-semibold text-brand-gray mb-3">Features:</h3>
              <ul className="space-y-2 text-brand-gray">
                <li>• SEO optimized</li>
                <li>• Fast loading times</li>
                <li>• Mobile-first design</li>
                <li>• Analytics ready</li>
                <li>• Easy customization</li>
              </ul>
            </div>
          </div>

          <Button 
            onClick={handleDownloadTemplate}
            className="w-full bg-gradient-to-r from-brand-purple to-brand-cyan text-white hover:opacity-90"
            size="lg"
          >
            <Download className="mr-2 h-5 w-5" />
            Download Landing Page Template
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LandingPageBuilder;
