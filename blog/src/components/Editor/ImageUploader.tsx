import React, { useState } from 'react';
import { FaUpload, FaSpinner, FaCheck, FaTimes } from 'react-icons/fa';

interface ImageUploaderProps {
  onImageUrl: (url: string) => void;
  currentUrl?: string;
  label?: string;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({ 
  onImageUrl, 
  currentUrl = '',
  label = 'Image URL'
}) => {
  const [url, setUrl] = useState(currentUrl);
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(currentUrl);
  const [error, setError] = useState('');

  // For now, we'll just use URL input, but this could be extended to upload to Firebase Storage
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
    setError('');
  };

  const handlePreview = () => {
    if (!url) {
      setError('Please enter an image URL');
      return;
    }
    
    // Validate URL
    try {
      new URL(url);
      setPreviewUrl(url);
      onImageUrl(url);
      setError('');
    } catch (e) {
      setError('Please enter a valid URL');
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        <div className="flex-grow">
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            {label}
          </label>
          <div className="flex">
            <input
              type="text"
              className={`lofi-input w-full rounded-r-none ${error ? 'border-red-300 focus:border-red-500' : ''}`}
              value={url}
              onChange={handleUrlChange}
              placeholder="Enter image URL (https://...)"
            />
            <button
              type="button"
              className="lofi-button rounded-l-none flex items-center"
              onClick={handlePreview}
              disabled={isUploading}
            >
              {isUploading ? (
                <FaSpinner className="animate-spin mr-1" />
              ) : previewUrl === url ? (
                <FaCheck className="mr-1" />
              ) : (
                <FaUpload className="mr-1" />
              )}
              {previewUrl === url ? 'Loaded' : 'Load'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-1">{error}</p>
          )}
        </div>
      </div>
      
      {previewUrl && (
        <div className="mt-2 overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-48 object-cover"
            onError={() => {
              setError('Failed to load image. Check the URL and try again.');
              setPreviewUrl('');
            }}
          />
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
