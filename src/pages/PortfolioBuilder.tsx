
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

const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState(`import React from 'react';

function App() {
  const projects = [
    { title: 'E-commerce Website', tech: 'React, Node.js', desc: 'Full-stack online store with payment integration' },
    { title: 'Mobile App UI', tech: 'React Native', desc: 'Beautiful mobile interface with smooth animations' },
    { title: 'Data Dashboard', tech: 'React, D3.js', desc: 'Interactive analytics dashboard with real-time data' }
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      margin: 0,
      padding: 0,
      minHeight: '100vh',
      backgroundColor: '#f8f9fa'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '60px 20px',
        textAlign: 'center',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
      }}>
        <div style={{
          width: '120px',
          height: '120px',
          borderRadius: '50%',
          backgroundColor: '#667eea',
          margin: '0 auto 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '48px',
          color: 'white'
        }}>
          👨‍💻
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '10px', color: '#333' }}>
          John Developer
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#666', marginBottom: '20px' }}>
          Full Stack Developer & UI/UX Designer
        </p>
        <p style={{ color: '#888', maxWidth: '600px', margin: '0 auto' }}>
          Passionate about creating beautiful and functional web applications. 
          5+ years of experience in modern web technologies.
        </p>
      </header>

      {/* Skills Section */}
      <section style={{ padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: '#333' }}>
            Skills & Technologies
          </h2>
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '15px', 
            justifyContent: 'center' 
          }}>
            {['React', 'JavaScript', 'TypeScript', 'Node.js', 'Python', 'CSS', 'HTML', 'Git'].map((skill, index) => (
              <span key={index} style={{
                backgroundColor: '#667eea',
                color: 'white',
                padding: '10px 20px',
                borderRadius: '25px',
                fontSize: '14px',
                fontWeight: 'bold'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section style={{ backgroundColor: 'white', padding: '60px 20px' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: '#333', textAlign: 'center' }}>
            Featured Projects
          </h2>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '30px' 
          }}>
            {projects.map((project, index) => (
              <div key={index} style={{
                border: '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '30px',
                backgroundColor: '#fafafa',
                transition: 'transform 0.3s ease'
              }}>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '10px', color: '#333' }}>
                  {project.title}
                </h3>
                <p style={{ 
                  color: '#667eea', 
                  fontSize: '14px', 
                  fontWeight: 'bold', 
                  marginBottom: '15px' 
                }}>
                  {project.tech}
                </p>
                <p style={{ color: '#666', lineHeight: '1.6' }}>{project.desc}</p>
                <button style={{
                  marginTop: '20px',
                  backgroundColor: '#667eea',
                  color: 'white',
                  border: 'none',
                  padding: '10px 20px',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}>
                  View Project
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section style={{ 
        backgroundColor: '#333', 
        color: 'white', 
        padding: '60px 20px', 
        textAlign: 'center' 
      }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>
          Let's Work Together
        </h2>
        <p style={{ fontSize: '1.1rem', marginBottom: '30px' }}>
          I'm always interested in new opportunities and exciting projects.
        </p>
        <button style={{
          backgroundColor: '#667eea',
          color: 'white',
          padding: '15px 30px',
          fontSize: '1rem',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Get In Touch
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
      const generatedCode = await generateReactCode(`Create a portfolio website for: ${prompt}`);
      setCode(generatedCode);
      
      toast({
        title: "Portfolio Generated! 🎉",
        description: "Your portfolio has been generated from your prompt.",
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
          <title>Portfolio Preview</title>
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
        description: "Your portfolio preview has been updated!",
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
    link.download = 'Portfolio.js';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Project Saved! 💾",
      description: "Your portfolio has been downloaded as Portfolio.js",
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
                <span className="text-2xl">🎨</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-brand-gray">Portfolio Builder</h1>
                <p className="text-brand-gray">Create professional portfolios with live preview</p>
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

export default PortfolioBuilder;
