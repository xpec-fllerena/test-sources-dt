import React from 'react';
import { X } from 'lucide-react';

interface JsonPreviewProps {
  data: any;
  onClose: () => void;
}

export const JsonPreview: React.FC<JsonPreviewProps> = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium">JSON Preview</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-4">
          <pre className="bg-gray-50 p-4 rounded-md overflow-auto max-h-96">
            <code className="text-sm">
              {JSON.stringify(data, null, 2)}
            </code>
          </pre>
        </div>
      </div>
    </div>
  );
};