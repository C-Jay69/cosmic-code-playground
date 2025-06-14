
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Play, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';

const ReactAppBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState(`import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>My React App</h1>
      <p>Count: {count}</p>
      <button 
        onClick={() => setCount(count + 1)}
        style={{ 
          padding: '10px 20px', 
          backgroundColor: '#007bff', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Increment
      </button>
    </div>
  );
}

export default App;`);

  const [previewHtml, setPreviewHtml] = useState('');

  const handleRunCode = () => {
    try {
      // Create a simple preview by converting the React code to HTML
      // This is a basic implementation - in a real app builder you'd use proper React rendering
      const htmlPreview = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>React App Preview</title>
          <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
          <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
          <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
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
        title: "Code Updated",
        description: "Your React app preview has been updated!",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error in your code. Please check the syntax.",
        variant: "destructive"
      });
    }
  };

  const handleSaveProject = () => {
    // In a real implementation, this would save to a backend
    const blob = new Blob([code], { type: 'text/javascript' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'App.js';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Project Saved",
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
              <div className="w-16 h-16 bg-brand-blue rounded-xl flex items-center justify-center mr-4">
                <Code className="h-8 w-8 text-white" />
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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Code Editor</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="min-h-[500px] font-mono text-sm"
                  placeholder="Write your React code here..."
                />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                {previewHtml ? (
                  <iframe
                    srcDoc={previewHtml}
                    className="w-full h-[500px] border rounded"
                    title="React App Preview"
                  />
                ) : (
                  <div className="w-full h-[500px] border rounded flex items-center justify-center bg-gray-50">
                    <div className="text-center">
                      <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">Click "Run Code" to see your app preview</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold text-brand-gray mb-4">Getting Started</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-brand-gray">
            <div>
              <h3 className="font-semibold mb-2">1. Write Your Code</h3>
              <p>Use the code editor to write your React components with JSX syntax.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Preview Your App</h3>
              <p>Click "Run Code" to see your React app rendered in the preview pane.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Save Your Work</h3>
              <p>Download your code as a file to continue development locally.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactAppBuilder;
