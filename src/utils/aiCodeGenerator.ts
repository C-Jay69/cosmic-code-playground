
// Enhanced AI code generation with more sophisticated patterns
export const generateReactCode = async (userPrompt: string): Promise<string> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const lowerPrompt = userPrompt.toLowerCase();
  
  // Todo/Task App
  if (lowerPrompt.includes('todo') || lowerPrompt.includes('task')) {
    return `import React, { useState } from 'react';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { 
        id: Date.now(), 
        text: newTask, 
        completed: false,
        createdAt: new Date().toLocaleDateString()
      }]);
      setNewTask('');
    }
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  const completedCount = tasks.filter(task => task.completed).length;

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
        padding: '30px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          Todo App
        </h1>
        
        <div style={{ marginBottom: '30px' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            <input
              type="text"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              placeholder="Add a new task..."
              style={{ 
                flex: 1,
                padding: '12px', 
                border: '2px solid #e9ecef',
                borderRadius: '8px',
                fontSize: '16px'
              }}
              onKeyPress={(e) => e.key === 'Enter' && addTask()}
            />
            <button onClick={addTask} style={{
              padding: '12px 24px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold'
            }}>
              Add
            </button>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
            {['all', 'active', 'completed'].map(filterType => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: filter === filterType ? '#007bff' : '#e9ecef',
                  color: filter === filterType ? 'white' : '#495057',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textTransform: 'capitalize'
                }}
              >
                {filterType}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <p style={{ color: '#6c757d', fontSize: '14px' }}>
            {tasks.length} total tasks, {completedCount} completed
          </p>
        </div>

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {filteredTasks.map(task => (
            <li key={task.id} style={{ 
              marginBottom: '12px',
              padding: '16px',
              backgroundColor: task.completed ? '#f8f9fa' : 'white',
              border: '2px solid #dee2e6',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', flex: 1 }}>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  style={{ marginRight: '12px', transform: 'scale(1.2)' }}
                />
                <div>
                  <span style={{ 
                    textDecoration: task.completed ? 'line-through' : 'none',
                    color: task.completed ? '#6c757d' : 'black',
                    fontSize: '16px'
                  }}>
                    {task.text}
                  </span>
                  <div style={{ fontSize: '12px', color: '#6c757d', marginTop: '4px' }}>
                    Created: {task.createdAt}
                  </div>
                </div>
              </label>
              <button
                onClick={() => deleteTask(task.id)}
                style={{
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '6px 12px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
        
        {filteredTasks.length === 0 && (
          <div style={{ 
            textAlign: 'center', 
            padding: '40px',
            color: '#6c757d',
            backgroundColor: '#f8f9fa',
            borderRadius: '8px',
            border: '2px dashed #dee2e6'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>
              {filter === 'all' ? 'No tasks yet!' : \`No \${filter} tasks\`}
            </p>
            <p style={{ fontSize: '14px' }}>
              {filter === 'all' ? 'Add your first task above' : 'Try changing the filter'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;`;
  }
  
  // Calculator
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

  const inputDot = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
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

  const clearEntry = () => {
    setDisplay('0');
    setWaitingForNewValue(false);
  };

  const buttonStyle = {
    width: '70px',
    height: '70px',
    fontSize: '20px',
    margin: '4px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    backgroundColor: '#f8f9fa',
    border: '2px solid #dee2e6',
    transition: 'all 0.2s'
  };

  const operatorStyle = {
    ...buttonStyle,
    backgroundColor: '#007bff',
    color: 'white'
  };

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '400px', 
      margin: '0 auto',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div style={{
        backgroundColor: 'white',
        borderRadius: '16px',
        padding: '30px',
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ textAlign: 'center', color: '#333', marginBottom: '30px' }}>
          Calculator
        </h1>
        
        <div style={{ 
          marginBottom: '30px', 
          padding: '20px', 
          backgroundColor: '#000', 
          color: 'white', 
          textAlign: 'right',
          fontSize: '32px',
          borderRadius: '8px',
          minHeight: '50px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          fontFamily: 'monospace'
        }}>
          {display}
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          <button style={buttonStyle} onClick={clear}>AC</button>
          <button style={buttonStyle} onClick={clearEntry}>CE</button>
          <button style={buttonStyle} onClick={() => inputOperation('/')}>/</button>
          <button style={operatorStyle} onClick={() => inputOperation('*')}>×</button>
          
          <button style={buttonStyle} onClick={() => inputNumber(7)}>7</button>
          <button style={buttonStyle} onClick={() => inputNumber(8)}>8</button>
          <button style={buttonStyle} onClick={() => inputNumber(9)}>9</button>
          <button style={operatorStyle} onClick={() => inputOperation('-')}>-</button>
          
          <button style={buttonStyle} onClick={() => inputNumber(4)}>4</button>
          <button style={buttonStyle} onClick={() => inputNumber(5)}>5</button>
          <button style={buttonStyle} onClick={() => inputNumber(6)}>6</button>
          <button style={operatorStyle} onClick={() => inputOperation('+')}>+</button>
          
          <button style={buttonStyle} onClick={() => inputNumber(1)}>1</button>
          <button style={buttonStyle} onClick={() => inputNumber(2)}>2</button>
          <button style={buttonStyle} onClick={() => inputNumber(3)}>3</button>
          <button style={{...operatorStyle, gridRow: 'span 2', height: '148px'}} onClick={performCalculation}>=</button>
          
          <button style={{...buttonStyle, gridColumn: 'span 2', width: '148px'}} onClick={() => inputNumber(0)}>0</button>
          <button style={buttonStyle} onClick={inputDot}>.</button>
        </div>
      </div>
    </div>
  );
}

export default App;`;
  }

  // Portfolio/Profile
  if (lowerPrompt.includes('portfolio') || lowerPrompt.includes('profile') || lowerPrompt.includes('about')) {
    return `import React, { useState } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('about');
  
  const profile = {
    name: "Alex Johnson",
    title: "Full Stack Developer & Designer",
    bio: "Passionate developer with 5+ years of experience building beautiful, functional web applications. I love turning complex problems into simple, elegant solutions.",
    skills: ["React", "TypeScript", "Node.js", "Python", "AWS", "MongoDB", "Figma", "CSS"],
    projects: [
      {
        title: "E-commerce Platform",
        description: "A modern e-commerce solution with real-time inventory management",
        tech: ["React", "Node.js", "MongoDB"],
        status: "Live"
      },
      {
        title: "Task Management App",
        description: "Collaborative project management tool with team features",
        tech: ["Vue.js", "Express", "PostgreSQL"],
        status: "In Development"
      },
      {
        title: "Weather Dashboard",
        description: "Real-time weather tracking with beautiful data visualization",
        tech: ["React", "D3.js", "OpenWeather API"],
        status: "Live"
      }
    ],
    contact: {
      email: "alex.johnson@example.com",
      linkedin: "linkedin.com/in/alexjohnson",
      github: "github.com/alexjohnson",
      website: "alexjohnson.dev"
    }
  };

  const sections = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh'
    }}>
      {/* Header */}
      <header style={{
        backgroundColor: 'white',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h1 style={{ margin: 0, color: '#333', fontSize: '24px' }}>{profile.name}</h1>
          <nav style={{ display: 'flex', gap: '30px' }}>
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: activeSection === section.id ? '#007bff' : '#666',
                  fontSize: '16px',
                  cursor: 'pointer',
                  padding: '10px',
                  borderBottom: activeSection === section.id ? '2px solid #007bff' : 'none'
                }}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '40px 20px'
      }}>
        {/* About Section */}
        {activeSection === 'about' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              width: '150px',
              height: '150px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #007bff, #6610f2)',
              margin: '0 auto 30px auto',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '60px',
              color: 'white',
              fontWeight: 'bold'
            }}>
              {profile.name.split(' ').map(n => n[0]).join('')}
            </div>
            <h2 style={{ fontSize: '36px', margin: '0 0 10px 0', color: '#333' }}>{profile.name}</h2>
            <h3 style={{ 
              fontSize: '20px', 
              color: '#007bff', 
              fontWeight: 'normal',
              margin: '0 0 30px 0'
            }}>
              {profile.title}
            </h3>
            <p style={{ 
              fontSize: '18px',
              color: '#666', 
              lineHeight: '1.8',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              {profile.bio}
            </p>
          </div>
        )}

        {/* Projects Section */}
        {activeSection === 'projects' && (
          <div>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>My Projects</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {profile.projects.map((project, index) => (
                <div key={index} style={{
                  backgroundColor: 'white',
                  borderRadius: '12px',
                  padding: '30px',
                  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                  border: '1px solid #e9ecef'
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '15px' }}>
                    <h3 style={{ fontSize: '22px', margin: 0, color: '#333' }}>{project.title}</h3>
                    <span style={{
                      backgroundColor: project.status === 'Live' ? '#28a745' : '#ffc107',
                      color: 'white',
                      padding: '4px 12px',
                      borderRadius: '20px',
                      fontSize: '12px'
                    }}>
                      {project.status}
                    </span>
                  </div>
                  <p style={{ color: '#666', lineHeight: '1.6', marginBottom: '20px' }}>
                    {project.description}
                  </p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                    {project.tech.map((tech, techIndex) => (
                      <span key={techIndex} style={{
                        backgroundColor: '#e9ecef',
                        padding: '6px 12px',
                        borderRadius: '16px',
                        fontSize: '14px',
                        color: '#495057'
                      }}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Skills Section */}
        {activeSection === 'skills' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#333', textAlign: 'center' }}>
              Skills & Technologies
            </h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
              maxWidth: '800px',
              margin: '0 auto'
            }}>
              {profile.skills.map((skill, index) => (
                <div key={index} style={{
                  backgroundColor: '#f8f9fa',
                  padding: '20px',
                  borderRadius: '12px',
                  textAlign: 'center',
                  border: '2px solid #e9ecef',
                  transition: 'transform 0.3s ease'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: '#495057'
                  }}>
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Contact Section */}
        {activeSection === 'contact' && (
          <div style={{
            backgroundColor: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ fontSize: '32px', marginBottom: '30px', color: '#333' }}>
              Get In Touch
            </h2>
            <p style={{ fontSize: '18px', color: '#666', marginBottom: '40px' }}>
              I'm always interested in new opportunities and interesting projects.
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '20px',
              maxWidth: '600px',
              margin: '0 auto'
            }}>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>📧 Email</h4>
                <p style={{ margin: 0, color: '#666' }}>{profile.contact.email}</p>
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>💼 LinkedIn</h4>
                <p style={{ margin: 0, color: '#666' }}>{profile.contact.linkedin}</p>
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🔗 GitHub</h4>
                <p style={{ margin: 0, color: '#666' }}>{profile.contact.github}</p>
              </div>
              <div style={{
                padding: '20px',
                backgroundColor: '#f8f9fa',
                borderRadius: '12px'
              }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🌐 Website</h4>
                <p style={{ margin: 0, color: '#666' }}>{profile.contact.website}</p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;`;
  }

  // Dashboard
  if (lowerPrompt.includes('dashboard') || lowerPrompt.includes('analytics') || lowerPrompt.includes('chart')) {
    return `import React, { useState, useEffect } from 'react';

function App() {
  const [selectedPeriod, setSelectedPeriod] = useState('7d');
  const [data, setData] = useState({
    revenue: 45230,
    users: 12450,
    orders: 892,
    conversion: 3.2
  });

  const periods = [
    { value: '7d', label: '7 Days' },
    { value: '30d', label: '30 Days' },
    { value: '90d', label: '90 Days' }
  ];

  const chartData = [
    { day: 'Mon', revenue: 4800, users: 240 },
    { day: 'Tue', revenue: 5200, users: 280 },
    { day: 'Wed', revenue: 4600, users: 220 },
    { day: 'Thu', revenue: 6100, users: 320 },
    { day: 'Fri', revenue: 7200, users: 390 },
    { day: 'Sat', revenue: 8100, users: 410 },
    { day: 'Sun', revenue: 9200, users: 450 }
  ];

  const maxRevenue = Math.max(...chartData.map(d => d.revenue));

  return (
    <div style={{ 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f8f9fa',
      minHeight: '100vh',
      padding: '20px'
    }}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '40px'
      }}>
        <div>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', color: '#333' }}>
            Analytics Dashboard
          </h1>
          <p style={{ margin: 0, color: '#666', fontSize: '16px' }}>
            Track your business performance and key metrics
          </p>
        </div>
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          style={{
            padding: '12px 16px',
            borderRadius: '8px',
            border: '2px solid #e9ecef',
            backgroundColor: 'white',
            fontSize: '16px',
            cursor: 'pointer'
          }}
        >
          {periods.map(period => (
            <option key={period.value} value={period.value}>
              {period.label}
            </option>
          ))}
        </select>
      </div>

      {/* Key Metrics */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
        marginBottom: '40px'
      }}>
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px', textTransform: 'uppercase' }}>
                Total Revenue
              </p>
              <h3 style={{ margin: 0, fontSize: '28px', color: '#333' }}>
                \$\{data.revenue.toLocaleString()}
              </h3>
            </div>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#28a745',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              💰
            </div>
          </div>
          <p style={{ margin: '16px 0 0 0', color: '#28a745', fontSize: '14px' }}>
            ↗️ +12.5% from last period
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px', textTransform: 'uppercase' }}>
                Active Users
              </p>
              <h3 style={{ margin: 0, fontSize: '28px', color: '#333' }}>
                \{data.users.toLocaleString()}
              </h3>
            </div>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#007bff',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              👥
            </div>
          </div>
          <p style={{ margin: '16px 0 0 0', color: '#007bff', fontSize: '14px' }}>
            ↗️ +8.2% from last period
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px', textTransform: 'uppercase' }}>
                Total Orders
              </p>
              <h3 style={{ margin: 0, fontSize: '28px', color: '#333' }}>
                \{data.orders.toLocaleString()}
              </h3>
            </div>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#6f42c1',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📦
            </div>
          </div>
          <p style={{ margin: '16px 0 0 0', color: '#6f42c1', fontSize: '14px' }}>
            ↗️ +15.3% from last period
          </p>
        </div>

        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <p style={{ margin: '0 0 8px 0', color: '#666', fontSize: '14px', textTransform: 'uppercase' }}>
                Conversion Rate
              </p>
              <h3 style={{ margin: 0, fontSize: '28px', color: '#333' }}>
                \{data.conversion}%
              </h3>
            </div>
            <div style={{
              width: '50px',
              height: '50px',
              backgroundColor: '#fd7e14',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px'
            }}>
              📈
            </div>
          </div>
          <p style={{ margin: '16px 0 0 0', color: '#fd7e14', fontSize: '14px' }}>
            ↗️ +2.1% from last period
          </p>
        </div>
      </div>

      {/* Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
        gap: '24px'
      }}>
        {/* Revenue Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 30px 0', fontSize: '20px', color: '#333' }}>
            Revenue Trend
          </h3>
          <div style={{ height: '200px', position: 'relative' }}>
            {chartData.map((item, index) => (
              <div key={index} style={{
                position: 'absolute',
                bottom: 0,
                left: \`\${(index / (chartData.length - 1)) * 85}%\`,
                width: '40px',
                marginLeft: '-20px'
              }}>
                <div style={{
                  height: \`\${(item.revenue / maxRevenue) * 160}px\`,
                  backgroundColor: '#007bff',
                  borderRadius: '4px 4px 0 0',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '12px',
                  paddingBottom: '4px'
                }}>
                  \$\{(item.revenue / 1000).toFixed(1)}k
                </div>
                <div style={{
                  textAlign: 'center',
                  fontSize: '12px',
                  color: '#666'
                }}>
                  {item.day}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Users Chart */}
        <div style={{
          backgroundColor: 'white',
          padding: '30px',
          borderRadius: '16px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ margin: '0 0 30px 0', fontSize: '20px', color: '#333' }}>
            User Activity
          </h3>
          <div style={{ height: '200px', position: 'relative' }}>
            <svg width="100%" height="160" style={{ overflow: 'visible' }}>
              <polyline
                points={chartData.map((item, index) => 
                  \`\${(index / (chartData.length - 1)) * 100},\${160 - (item.users / 500) * 140}\`
                ).join(' ')}
                fill="none"
                stroke="#28a745"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {chartData.map((item, index) => (
                <circle
                  key={index}
                  cx={\`\${(index / (chartData.length - 1)) * 100}%\`}
                  cy={160 - (item.users / 500) * 140}
                  r="4"
                  fill="#28a745"
                />
              ))}
            </svg>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              {chartData.map((item, index) => (
                <div key={index} style={{
                  fontSize: '12px',
                  color: '#666',
                  textAlign: 'center'
                }}>
                  {item.day}
                </div>
              ))}
            </div>
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
  const [count, setCount] = useState(0);

  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif', 
      maxWidth: '800px', 
      margin: '0 auto',
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
        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#333', marginBottom: '20px', fontSize: '32px' }}>
          🚀 Generated App
        </h1>
        <div style={{
          backgroundColor: '#f8f9fa',
          padding: '30px',
          borderRadius: '12px',
          border: '2px dashed #dee2e6',
          marginBottom: '30px'
        }}>
          <p style={{ fontSize: '18px', color: '#666', marginBottom: '20px', lineHeight: '1.6' }}>
            {message}
          </p>
          <div style={{ marginBottom: '20px' }}>
            <h3 style={{ color: '#333', marginBottom: '15px' }}>Interactive Counter</h3>
            <div style={{ fontSize: '24px', marginBottom: '15px', color: '#007bff' }}>
              Count: {count}
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={() => setCount(count + 1)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                +1
              </button>
              <button
                onClick={() => setCount(count - 1)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#dc3545',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                -1
              </button>
              <button
                onClick={() => setCount(0)}
                style={{
                  padding: '12px 24px',
                  backgroundColor: '#6c757d',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  cursor: 'pointer',
                  fontWeight: 'bold'
                }}
              >
                Reset
              </button>
            </div>
          </div>
          <button
            onClick={() => setMessage('Thanks for using the AI generator! 🎉')}
            style={{
              padding: '12px 24px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Click me for a surprise! ✨
          </button>
        </div>
        <div style={{
          backgroundColor: '#e3f2fd',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #bbdefb'
        }}>
          <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>💡 Try More Specific Prompts</h4>
          <p style={{ margin: 0, color: '#1976d2', fontSize: '14px' }}>
            For better results, try prompts like "todo app", "calculator", "portfolio website", or "dashboard with charts"
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;`;
};
