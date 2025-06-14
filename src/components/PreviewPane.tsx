
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code } from 'lucide-react';

interface PreviewPaneProps {
  previewHtml: string;
}

export const PreviewPane = ({ previewHtml }: PreviewPaneProps) => {
  return (
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
  );
};
