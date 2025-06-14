
import { Button } from '@/components/ui/button';
import { Play, Save } from 'lucide-react';

interface ToolbarActionsProps {
  onRunCode: () => void;
  onSaveProject: () => void;
}

export const ToolbarActions = ({ onRunCode, onSaveProject }: ToolbarActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button onClick={onRunCode} className="bg-green-600 hover:bg-green-700">
        <Play className="mr-2 h-4 w-4" />
        Run Code
      </Button>
      <Button onClick={onSaveProject} variant="outline">
        <Save className="mr-2 h-4 w-4" />
        Save Project
      </Button>
    </div>
  );
};
