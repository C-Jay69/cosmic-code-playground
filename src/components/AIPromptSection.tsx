
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Wand2 } from 'lucide-react';
import { useState } from 'react';

interface AIPromptSectionProps {
  onGenerate: (prompt: string) => void;
  isGenerating: boolean;
}

export const AIPromptSection = ({ onGenerate, isGenerating }: AIPromptSectionProps) => {
  const [prompt, setPrompt] = useState('');

  const handleGenerate = () => {
    if (prompt.trim()) {
      onGenerate(prompt);
    }
  };

  const examplePrompts = [
    "Create a todo app with add, delete, and mark complete features",
    "Build a calculator with basic arithmetic operations",
    "Make a portfolio website with sections for about, projects, and contact",
    "Create a dashboard with charts and data visualization",
    "Build a blog with posts, comments, and search functionality"
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Wand2 className="mr-2 h-5 w-5 text-purple-600" />
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
              onKeyPress={(e) => e.key === 'Enter' && handleGenerate()}
            />
          </div>
          
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating || !prompt.trim()}
            className="bg-purple-600 hover:bg-purple-700"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            {isGenerating ? 'Generating...' : 'Generate App'}
          </Button>

          <div className="mt-4">
            <Label className="text-sm text-gray-600">Try these examples:</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {examplePrompts.map((example, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setPrompt(example)}
                  className="text-xs"
                >
                  {example.length > 40 ? example.substring(0, 40) + '...' : example}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
