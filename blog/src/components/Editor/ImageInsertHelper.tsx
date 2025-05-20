import React, { useState } from 'react';
import { FaImage, FaLink, FaUpload } from 'react-icons/fa';

interface ImageInsertHelperProps {
  onInsertImage: (url: string) => void;
}

const ImageInsertHelper: React.FC<ImageInsertHelperProps> = ({ onInsertImage }) => {
  const [showPanel, setShowPanel] = useState(false);
  const [imageUrl, setImageUrl] = useState('');

  const handleInsert = () => {
    if (imageUrl) {
      onInsertImage(imageUrl);
      setImageUrl('');
      setShowPanel(false);
    }
  };

  return (
    <div className="mt-2">
      {!showPanel ? (
        <button
          type="button"
          onClick={() => setShowPanel(true)}
          className="flex items-center text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          <FaImage className="mr-1" /> Add an image by URL
        </button>
      ) : (
        <div className="bg-slate-50 dark:bg-slate-800 p-3 rounded border border-slate-200 dark:border-slate-700">
          <h4 className="text-sm font-medium mb-2 flex items-center text-slate-700 dark:text-slate-300">
            <FaImage className="mr-1" /> Insert Image URL
          </h4>
          <div className="flex gap-2">
            <input
              type="text"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="lofi-input flex-grow"
            />
            <button
              type="button"
              onClick={handleInsert}
              disabled={!imageUrl}
              className="lofi-button-secondary"
            >
              Insert
            </button>
            <button
              type="button"
              onClick={() => setShowPanel(false)}
              className="lofi-button-secondary"
            >
              Cancel
            </button>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            You can use images from Cloudinary, Unsplash, or any public image URL
          </p>
        </div>
      )}
    </div>
  );
};

export default ImageInsertHelper;