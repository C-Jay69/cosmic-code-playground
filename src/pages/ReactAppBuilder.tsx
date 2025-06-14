
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { CodeEditor } from '@/components/CodeEditor';
import { PreviewPane } from '@/components/PreviewPane';
import { AIPromptSection } from '@/components/AIPromptSection';
import { PageHeader } from '@/components/PageHeader';
import { FeaturesGrid } from '@/components/FeaturesGrid';
import { generateReactCode } from '@/utils/aiCodeGenerator';

const ReactAppBuilder = () => {
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
        <PageHeader onRunCode={handleRunCode} onSaveProject={handleSaveProject} />

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

export default ReactAppBuilder;
