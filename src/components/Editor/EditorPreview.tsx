import React from 'react';
import 'react-quill-new/dist/quill.snow.css';
import './editor.css';

interface EditorPreviewProps {
  content: string;
  className?: string;
}

/**
 * EditorPreview component displays the HTML content from the editor
 * in a read-only format with proper styling
 */
const EditorPreview: React.FC<EditorPreviewProps> = ({
  content,
  className = '',
}) => {
  return (
    <div className={`editor-preview ${className}`}>
      <div
        className="ql-editor"
        dangerouslySetInnerHTML={{ __html: content }}
        style={{ padding: '16px' }}
      />
    </div>
  );
};

export default EditorPreview;
