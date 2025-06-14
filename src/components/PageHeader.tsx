
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ToolbarActions } from './ToolbarActions';

interface PageHeaderProps {
  onRunCode: () => void;
  onSaveProject: () => void;
}

export const PageHeader = ({ onRunCode, onSaveProject }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <>
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
          <ToolbarActions onRunCode={onRunCode} onSaveProject={onSaveProject} />
        </div>
      </div>
    </>
  );
};
