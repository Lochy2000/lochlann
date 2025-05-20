import React, { useState, useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './editor.css';
import ImageInsertHelper from './ImageInsertHelper';

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ 
  value, 
  onChange, 
  placeholder = 'Write your content here...' 
}) => {
  // Needed to prevent SSR hydration issues
  const [mounted, setMounted] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  // Basic toolbar configuration
  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'indent': '-1'}, { 'indent': '+1' }],
        [{ 'color': [] }, { 'background': [] }],
        ['link', 'image', 'code-block'],
        ['clean']
      ]
    }
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike',
    'list', 'bullet', 'indent',
    'link', 'image', 'color', 'background',
    'code-block'
  ];

  // Handler for inserting images via our helper
  const handleInsertImage = (url: string) => {
    if (!quillRef.current) return;
    
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection(true);
    
    // Insert image at cursor position
    quill.insertEmbed(range.index, 'image', url, 'user');
    
    // Move cursor after the image
    quill.setSelection(range.index + 1);
  };

  if (!mounted) {
    // Render a placeholder until client-side rendering is ready
    return <div className="h-64 border rounded bg-slate-50 dark:bg-slate-800 p-4"></div>;
  }

  return (
    <div className="rich-text-editor-container relative">
      <div className="rich-text-editor">
        <ReactQuill
          ref={quillRef}
          theme="snow"
          value={value}
          onChange={onChange}
          modules={modules}
          formats={formats}
          placeholder={placeholder}
          className="h-96"
        />
        <div className="mt-2 text-sm">
          {/* Our new image insert helper */}
          <ImageInsertHelper onInsertImage={handleInsertImage} />
        </div>
      </div>
    </div>
  );
};

export default RichTextEditor;