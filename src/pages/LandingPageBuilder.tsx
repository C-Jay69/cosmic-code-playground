
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewPane } from '@/components/PreviewPane';
import { AIPromptSection } from '@/components/AIPromptSection';
import { PageHeader } from '@/components/PageHeader';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { generateReactCode } from '@/utils/aiCodeGenerator';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPageBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState(`import React from 'react';

function App() {
  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      minHeight: '100vh'
    }}>
      {/* Hero Section */}
      <header style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '100px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '20px', fontWeight: 'bold' }}>
          Welcome to Our Amazing Product
        </h1>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px', maxWidth: '600px', margin: '0 auto 30px' }}>
          Transform your business with our innovative solution. Built for modern teams who want to achieve more.
        </p>
        <button style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '15px 30px',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Get Started Today
        </button>
      </header>

      {/* Features Section */}
      <section style={{ padding: '80px 20px', backgroundColor: '#f8f9fa' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '50px', color: '#333' }}>
            Why Choose Us?
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '40px' 
          }}>
            {[
              { title: 'Fast & Reliable', desc: 'Lightning fast performance with 99.9% uptime guarantee' },
              { title: 'Easy to Use', desc: 'Intuitive interface that anyone can master in minutes' },
              { title: '24/7 Support', desc: 'Round-the-clock customer support whenever you need help' }
            ].map((feature, index) => (
              <div key={index} style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
              }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '15px', color: '#333' }}>
                  {feature.title}
                </h3>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '80px 20px', 
        textAlign: 'center' 
      }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
          Ready to Get Started?
        </h2>
        <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>
          Join thousands of satisfied customers today.
        </p>
        <button style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '15px 30px',
          fontSize: '1.1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Start Free Trial
        </button>
      </section>
    </div>
  );
}

export default App;`);

  const [previewHtml, setPreviewHtml] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCode = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const generatedCode = await generateReactCode(`Create a landing page for: ${prompt}`);
      setCode(generatedCode);
      
      toast({
        title: "Landing Page Generated! 🎉",
        description: "Your landing page has been generated from your prompt.",
      });
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate code. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRunCode = () => {
    try {
      const htmlPreview = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Landing Page Preview</title>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
          <style>
            body { margin: 0; font-family: Arial, sans-serif; }
            * { box-sizing: border-box; }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="text/babel">
            ${code}
            
            const root = ReactDOM.createRoot(document.getElementById('root'));
            root.render(<App />);
          </script>
        </body>
        </html>
      `;
      
      setPreviewHtml(htmlPreview);
      toast({
        title: "Preview Updated! ✨",
        description: "Your landing page preview has been updated!",
      });
    } catch (error) {
      toast({
        title: "Preview Error",
        description: "There was an error in your code. Please check the syntax.",
        variant: "destructive"
      });
    }
  };

  const handleSaveProject = () => {
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'LandingPage.js';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Project Saved! 💾",
      description: "Your landing page has been downloaded as LandingPage.js",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-light via-white to-brand-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/build')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Build
        </Button>

        <div className="bg-white rounded-2xl p-8 shadow-lg mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center">
              <div className="w-16 h-16 bg-gradient-to-r from-brand-purple to-brand-cyan rounded-xl flex items-center justify-center mr-4">
                <span className="text-2xl">🌐</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-brand-gray">Landing Page Builder</h1>
                <p className="text-brand-gray">Create beautiful landing pages with live preview</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleRunCode}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                ▶ Run Code
              </button>
              <button 
                onClick={handleSaveProject}
                className="border border-gray-300 hover:bg-gray-50 px-4 py-2 rounded flex items-center gap-2"
              >
                💾 Save Project
              </button>
            </div>
          </div>
        </div>

        <AIPromptSection 
          onGenerate={handleGenerateCode}
          isGenerating={isGenerating}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <CodeEditor 
            code={code}
            onChange={setCode}
          />
          <PreviewPane previewHtml={previewHtml} />
        </div>

        <FeaturesGrid />
      </div>
    </div>
  );
};

export default LandingPageBuilder;
