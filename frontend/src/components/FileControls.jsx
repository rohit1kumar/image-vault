import { useState } from 'react';

const FileControls = ({ fileType, setFileType, handleFileUpload }) => {
  const [message, setMessage] = useState({ text: '', type: '' });

  const onFileUpload = async (event) => {
    try {
      setMessage({ text: 'Uploading...', type: 'info' });
      await handleFileUpload(event);
      setMessage({ text: 'File uploaded successfully!', type: 'success' });
    } catch (error) {
      setMessage({
        text: error.message || 'Failed to upload file. Please try again.',
        type: 'error'
      });
    } finally {
      setTimeout(() => {
        setMessage({ text: '', type: '' });
        event.target.value = '';
      }, 3000);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex gap-4">
        <input
          type="file"
          onChange={onFileUpload}
          className="border rounded p-2"
        />
        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="border rounded p-2"
        >
          <option value="">All Files</option>
          <option value="image">Images</option>
          <option value="video">Videos</option>
        </select>
      </div>

      {message.text && (
        <div className={`mt-2 p-2 rounded ${message.type === 'error' ? 'bg-red-100 text-red-700' :
          message.type === 'success' ? 'bg-green-100 text-green-700' :
            'bg-blue-100 text-blue-700'
          }`}>
          {message.text}
        </div>
      )}
    </div>
  );
};

export default FileControls;