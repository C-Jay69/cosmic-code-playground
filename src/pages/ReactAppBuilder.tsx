
import { Button } from '@/components/ui/button';
import { ArrowLeft, Play, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewPane } from '@/components/PreviewPane';
import { AIPromptSection } from '@/components/AIPromptSection';
import { generateReactCode } from '@/utils/aiCodeGenerator';

const ReactAppBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState(`import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      textAlign: 'center',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '40px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>Welcome to React Builder!</h1>
        <p style={{ color: '#666', marginBottom: '30px' }}>
          Use the AI generator or edit the code directly to build your app.
        </p>
        <div style={{ marginBottom: '20px' }}>
          <p style={{ fontSize: '24px', color: '#007bff', marginBottom: '15px' }}>
            Count: {count}
          </p>
          <button 
            onClick={() => setCount(count + 1)}
            style={{ 
              padding: '12px 24px', 
              backgroundColor: '#007bff', 
              color: 'white', 
              border: 'none', 
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}
          >
            Click me! +1
          </button>
        </div>
        <p style={{ color: '#999', fontSize: '14px' }}>
          Try the AI generator above to create different types of apps!
        </p>
      </div>
    </div>
  );
}

export default App;`);

  const [previewHtml, setPreviewHtml] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateCode = async (prompt: string) => {
    setIsGenerating(true);
    
    try {
      const generatedCode = await generateReactCode(prompt);
      setCode(generatedCode);
      
      toast({
        title: "Code Generated! 🎉",
        description: "Your React app has been generated from your prompt.",
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
          <title>React App Preview</title>
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
        description: "Your React app preview has been updated!",
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
    link.download = 'App.js';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Project Saved! 💾",
      description: "Your React app has been downloaded as App.js",
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
                <span className="text-2xl">🚀</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-brand-gray">React App Builder</h1>
                <p className="text-brand-gray">Build and preview your React application in real-time</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleRunCode} className="bg-green-600 hover:bg-green-700">
                <Play className="mr-2 h-4 w-4" />
                Run Code
              </Button>
              <Button onClick={handleSaveProject} variant="outline">
                <Save className="mr-2 h-4 w-4" />
                Save Project
              </Button>
            </div>
          </div>

          <AIPromptSection 
            onGenerate={handleGenerateCode}
            isGenerating={isGenerating}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CodeEditor 
              code={code}
              onChange={setCode}
            />
            <PreviewPane previewHtml={previewHtml} />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-brand-gray mb-4">✨ Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-brand-gray">
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-semibold mb-2">🤖 AI Code Generation</h3>
              <p>Describe your app in plain English and let AI generate the code for you instantly.</p>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold mb-2">⚡ Live Preview</h3>
              <p>See your React app rendered in real-time as you make changes to the code.</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold mb-2">📝 Code Editor</h3>
              <p>Edit your React components with JSX syntax highlighting and validation.</p>
            </div>
            <div className="p-4 bg-orange-50 rounded-lg">
              <h3 className="font-semibold mb-2">💾 Export & Save</h3>
              <p>Download your code as a file to continue development in your local environment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactAppBuilder;
