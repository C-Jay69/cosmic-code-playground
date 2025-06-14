
import { Button } from '@/components/ui/button';
import { ArrowLeft, Code, Play, Save, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCodeFromPrompt = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Please enter a prompt",
        description: "Describe what kind of React app you want to create.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      // This is a simplified AI code generation - in a real implementation, 
      // you would call an actual AI service like OpenAI or Claude
      const generatedCode = await generateReactCode(prompt);
      setCode(generatedCode);
      
      toast({
        title: "Code Generated!",
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

  // Simplified code generation function - replace with actual AI service
  const generateReactCode = async (userPrompt: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simple pattern matching for demo purposes
    const lowerPrompt = userPrompt.toLowerCase();
    
    if (lowerPrompt.includes('todo') || lowerPrompt.includes('task')) {
      return `import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '500px' }}>
      <h1>Todo App</h1>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task..."
          style={{ 
            padding: '10px', 
            width: '300px', 
            marginRight: '10px',
            border: '1px solid #ccc',
            borderRadius: '4px'
          }}
          onKeyPress={(e) => e.key === 'Enter' && addTask()}
        />
        <button onClick={addTask} style={{
          padding: '10px 20px',
          backgroundColor: '#28a745',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Add
        </button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task.id} style={{ 
            marginBottom: '10px',
            padding: '10px',
            backgroundColor: task.completed ? '#f8f9fa' : 'white',
            border: '1px solid #dee2e6',
            borderRadius: '4px'
          }}>
            <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                style={{ marginRight: '10px' }}
              />
              <span style={{ 
                textDecoration: task.completed ? 'line-through' : 'none',
                color: task.completed ? '#6c757d' : 'black'
              }}>
                {task.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
      {tasks.length === 0 && (
        <p style={{ color: '#6c757d', fontStyle: 'italic' }}>No tasks yet. Add one above!</p>
      )}
    </div>
  );
}

export default App;`;
    }
    
    if (lowerPrompt.includes('calculator')) {
      return `import React, { useState } from 'react';

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num) => {
    if (waitingForNewValue) {
      setDisplay(String(num));
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? String(num) : display + num);
    }
  };

  const inputOperation = (nextOperation) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case '+': return firstValue + secondValue;
      case '-': return firstValue - secondValue;
      case '*': return firstValue * secondValue;
      case '/': return firstValue / secondValue;
      case '=': return secondValue;
      default: return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const buttonStyle = {
    width: '60px',
    height: '60px',
    fontSize: '18px',
    margin: '2px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#f8f9fa',
    border: '1px solid #dee2e6'
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '300px' }}>
      <h1>Calculator</h1>
      <div style={{ 
        marginBottom: '20px', 
        padding: '20px', 
        backgroundColor: '#000', 
        color: 'white', 
        textAlign: 'right',
        fontSize: '24px',
        borderRadius: '4px',
        minHeight: '40px'
      }}>
        {display}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '5px' }}>
        <button style={buttonStyle} onClick={clear}>C</button>
        <button style={buttonStyle} onClick={() => inputOperation('/')}>/</button>
        <button style={buttonStyle} onClick={() => inputOperation('*')}>*</button>
        <button style={buttonStyle} onClick={() => inputOperation('-')}>-</button>
        
        <button style={buttonStyle} onClick={() => inputNumber(7)}>7</button>
        <button style={buttonStyle} onClick={() => inputNumber(8)}>8</button>
        <button style={buttonStyle} onClick={() => inputNumber(9)}>9</button>
        <button style={buttonStyle} onClick={() => inputOperation('+')}>+</button>
        
        <button style={buttonStyle} onClick={() => inputNumber(4)}>4</button>
        <button style={buttonStyle} onClick={() => inputNumber(5)}>5</button>
        <button style={buttonStyle} onClick={() => inputNumber(6)}>6</button>
        <button style={{...buttonStyle, gridRow: 'span 2', height: '124px'}} onClick={performCalculation}>=</button>
        
        <button style={buttonStyle} onClick={() => inputNumber(1)}>1</button>
        <button style={buttonStyle} onClick={() => inputNumber(2)}>2</button>
        <button style={buttonStyle} onClick={() => inputNumber(3)}>3</button>
        
        <button style={{...buttonStyle, gridColumn: 'span 2', width: '124px'}} onClick={() => inputNumber(0)}>0</button>
        <button style={buttonStyle} onClick={() => inputNumber('.')}>.</button>
      </div>
    </div>
  );
}

export default App;`;
    }

    if (lowerPrompt.includes('profile') || lowerPrompt.includes('card') || lowerPrompt.includes('about')) {
      return `import React from 'react';

function App() {
  const profile = {
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate developer with 5+ years of experience building web applications. I love creating beautiful, functional, and user-friendly interfaces.",
    skills: ["React", "JavaScript", "Node.js", "Python", "CSS", "MongoDB"],
    contact: {
      email: "john.doe@example.com",
      linkedin: "linkedin.com/in/johndoe",
      github: "github.com/johndoe"
    }
  };

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        padding: '40px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: '#007bff',
            margin: '0 auto 20px auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '48px',
            color: 'white',
            fontWeight: 'bold'
          }}>
            {profile.name.split(' ').map(n => n[0]).join('')}
          </div>
          <h1 style={{ margin: '0 0 10px 0', color: '#333' }}>{profile.name}</h1>
          <h2 style={{ 
            margin: '0 0 20px 0', 
            color: '#007bff', 
            fontWeight: 'normal',
            fontSize: '18px'
          }}>
            {profile.title}
          </h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>{profile.bio}</p>
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Skills</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {profile.skills.map((skill, index) => (
              <span key={index} style={{
                backgroundColor: '#e9ecef',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '14px',
                color: '#495057'
              }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 style={{ color: '#333', marginBottom: '15px' }}>Contact</h3>
          <div style={{ color: '#666' }}>
            <p style={{ margin: '8px 0' }}>📧 {profile.contact.email}</p>
            <p style={{ margin: '8px 0' }}>💼 {profile.contact.linkedin}</p>
            <p style={{ margin: '8px 0' }}>🔗 {profile.contact.github}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;`;
    }

    // Default response for other prompts
    return `import React, { useState } from 'react';

function App() {
  const [message, setMessage] = useState('Hello! This app was generated from your prompt: "${userPrompt}"');

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#333', marginBottom: '20px' }}>Generated App</h1>
      <div style={{
        backgroundColor: '#f8f9fa',
        padding: '30px',
        borderRadius: '8px',
        border: '2px dashed #dee2e6'
      }}>
        <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px' }}>
          {message}
        </p>
        <button
          onClick={() => setMessage('Thanks for using the AI generator!')}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          Click me!
        </button>
      </div>
      <p style={{ marginTop: '30px', color: '#999', fontSize: '14px' }}>
        Try more specific prompts like "todo app", "calculator", or "profile card" for better results!
      </p>
    </div>
  );
}

export default App;`;
  };

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

          {/* AI Prompt Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="mr-2 h-5 w-5 text-purple-600" />
                AI No-Code Generator
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="prompt">Describe your app in plain English</Label>
                  <Input
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., 'Create a todo app with add, delete, and mark complete features'"
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={generateCodeFromPrompt} 
                  disabled={isGenerating}
                  className="bg-purple-600 hover:bg-purple-700"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  {isGenerating ? 'Generating...' : 'Generate App'}
                </Button>
              </div>
            </CardContent>
          </Card>

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-brand-gray">
            <div>
              <h3 className="font-semibold mb-2">1. Use AI Generator</h3>
              <p>Describe your app idea in plain English and let AI generate the code for you.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">2. Edit Your Code</h3>
              <p>Customize the generated code or write your own React components with JSX syntax.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">3. Preview Your App</h3>
              <p>Click "Run Code" to see your React app rendered in the preview pane.</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">4. Save Your Work</h3>
              <p>Download your code as a file to continue development locally.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReactAppBuilder;
