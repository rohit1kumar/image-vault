import { useState } from 'react';
import MediaModal from './MediaModal';

const FileGrid = ({ files }) => {
  const [selectedMedia, setSelectedMedia] = useState(null);

  const handleMediaClick = (file) => {
    setSelectedMedia({
      url: file.fileUrl,
      type: file.fileType
    });
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {files?.data?.map((file) => (
          <div
            key={file.id}
            className="border rounded p-4 cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleMediaClick(file)}
          >
            {file.fileType === 'image' ? (
              <img
                src={file.fileUrl}
                alt={file.id}
                className="w-full h-48 object-cover"
              />
            ) : file.fileType === 'video' ? (
              <div className="relative h-48">
                <video
                  src={file.fileUrl}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            ) : (
              <div className="h-48 flex items-center justify-center bg-gray-100">
                {file.fileType}
              </div>
            )}
            <p className="mt-2 text-sm text-gray-600">
              {new Date(file.uploadedAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>

      <MediaModal
        isOpen={!!selectedMedia}
        onClose={() => setSelectedMedia(null)}
        media={selectedMedia}
      />
    </>
  );
};

export default FileGrid;