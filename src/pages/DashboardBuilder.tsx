
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

const DashboardBuilder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [code, setCode] = useState(`import React from 'react';

function App() {
  const salesData = [
    { month: 'Jan', revenue: 45000, orders: 320 },
    { month: 'Feb', revenue: 52000, orders: 380 },
    { month: 'Mar', revenue: 48000, orders: 350 },
    { month: 'Apr', revenue: 61000, orders: 420 },
    { month: 'May', revenue: 55000, orders: 390 },
    { month: 'Jun', revenue: 67000, orders: 450 }
  ];

  const MetricCard = ({ title, value, change, color }) => (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ fontSize: '14px', color: '#666', marginBottom: '8px', fontWeight: 'normal' }}>
        {title}
      </h3>
      <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#333', marginBottom: '8px' }}>
        {value}
      </div>
      <div style={{ fontSize: '12px', color: color }}>
        {change}
      </div>
    </div>
  );

  const SimpleChart = ({ data }) => (
    <div style={{
      backgroundColor: 'white',
      padding: '24px',
      borderRadius: '12px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
      border: '1px solid #e0e0e0'
    }}>
      <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
        Revenue Trend
      </h3>
      <div style={{ display: 'flex', alignItems: 'end', height: '200px', gap: '8px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            flex: 1
          }}>
            <div style={{
              backgroundColor: '#667eea',
              width: '100%',
              height: \`\${(item.revenue / 70000) * 160}px\`,
              borderRadius: '4px 4px 0 0',
              marginBottom: '8px'
            }}></div>
            <span style={{ fontSize: '12px', color: '#666' }}>{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        padding: '20px 30px',
        borderRadius: '12px',
        marginBottom: '30px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', margin: 0 }}>
            Analytics Dashboard
          </h1>
          <p style={{ color: '#666', margin: '4px 0 0 0' }}>
            Welcome back! Here's what's happening with your business.
          </p>
        </div>
        <button style={{
          backgroundColor: '#667eea',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold'
        }}>
          Export Report
        </button>
      </header>

      {/* Metrics Grid */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <MetricCard 
          title="Total Revenue" 
          value="$328,000" 
          change="+12.5% from last month"
          color="#10b981"
        />
        <MetricCard 
          title="Total Orders" 
          value="2,310" 
          change="+8.2% from last month"
          color="#10b981"
        />
        <MetricCard 
          title="Active Users" 
          value="12,456" 
          change="+15.3% from last month"
          color="#10b981"
        />
        <MetricCard 
          title="Conversion Rate" 
          value="3.24%" 
          change="-2.1% from last month"
          color="#ef4444"
        />
      </div>

      {/* Charts Section */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '2fr 1fr', 
        gap: '20px',
        marginBottom: '30px'
      }}>
        <SimpleChart data={salesData} />
        
        <div style={{
          backgroundColor: 'white',
          padding: '24px',
          borderRadius: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          border: '1px solid #e0e0e0'
        }}>
          <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
            Top Products
          </h3>
          {[
            { name: 'Premium Plan', sales: '1,234', revenue: '$123,400' },
            { name: 'Basic Plan', sales: '856', revenue: '$42,800' },
            { name: 'Pro Plan', sales: '642', revenue: '$96,300' }
          ].map((product, index) => (
            <div key={index} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '12px 0',
              borderBottom: index < 2 ? '1px solid #e0e0e0' : 'none'
            }}>
              <div>
                <div style={{ fontWeight: 'bold', color: '#333' }}>{product.name}</div>
                <div style={{ fontSize: '12px', color: '#666' }}>{product.sales} sales</div>
              </div>
              <div style={{ fontWeight: 'bold', color: '#667eea' }}>{product.revenue}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        border: '1px solid #e0e0e0'
      }}>
        <h3 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '20px', color: '#333' }}>
          Recent Activity
        </h3>
        {[
          { user: 'John Doe', action: 'made a purchase', time: '2 minutes ago' },
          { user: 'Jane Smith', action: 'signed up for Premium', time: '15 minutes ago' },
          { user: 'Bob Johnson', action: 'updated their profile', time: '1 hour ago' },
          { user: 'Sarah Wilson', action: 'left a 5-star review', time: '2 hours ago' }
        ].map((activity, index) => (
          <div key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: index < 3 ? '1px solid #e0e0e0' : 'none'
          }}>
            <div>
              <strong>{activity.user}</strong> {activity.action}
            </div>
            <div style={{ fontSize: '12px', color: '#666' }}>{activity.time}</div>
          </div>
        ))}
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
      const generatedCode = await generateReactCode(`Create a dashboard for: ${prompt}`);
      setCode(generatedCode);
      
      toast({
        title: "Dashboard Generated! 🎉",
        description: "Your dashboard has been generated from your prompt.",
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
          <title>Dashboard Preview</title>
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
        description: "Your dashboard preview has been updated!",
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
    link.download = 'Dashboard.js';
    link.click();
    URL.revokeObjectURL(url);
    
    toast({
      title: "Project Saved! 💾",
      description: "Your dashboard has been downloaded as Dashboard.js",
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
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-brand-gray">Dashboard Builder</h1>
                <p className="text-brand-gray">Create data-driven dashboards with live preview</p>
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

export default DashboardBuilder;
