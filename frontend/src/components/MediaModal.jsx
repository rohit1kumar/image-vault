import { useEffect, useRef } from 'react';

const MediaModal = ({ isOpen, onClose, media }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (isOpen && videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [isOpen]);

  if (!isOpen || !media) return null;

  const isVideo = media.type === 'video';

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div className="relative max-w-7xl w-full max-h-[90vh] flex items-center justify-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {isVideo ? (
          <video
            ref={videoRef}
            src={media.url}
            className="max-w-full max-h-[90vh]"
            controls
            autoPlay
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={media.url}
            alt="Preview"
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        )}
      </div>
    </div>
  );
};

export default MediaModal;