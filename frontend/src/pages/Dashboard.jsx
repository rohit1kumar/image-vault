import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { getFiles, uploadFile } from '../utils/api';
import Profile from '../components/Profile';
import FileGrid from '../components/FileGrid';
import FileControls from '../components/FileControls';

const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [fileType, setFileType] = useState('');
  const queryClient = useQueryClient();

  const { data: files, isLoading } = useQuery(
    ['files', page, fileType],
    () => getFiles({ page, fileType })
  );

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (e.g., max 5MB)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      throw new Error('File size exceeds 10MB limit');
    }

    // Validate file type only images and videos
    const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif', 'image/webp', 'video/webm', 'video/mp4'];
    if (!allowedTypes.includes(file.type)) {
      throw new Error('Invalid file type. Please upload an image or video.');
    }

    await uploadFile(file);
    // Refetch files after successful upload
    await queryClient.invalidateQueries(['files']);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <Profile />

      <FileControls
        fileType={fileType}
        setFileType={setFileType}
        handleFileUpload={handleFileUpload}
      />

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <FileGrid files={files} />
      )}

      <div className="mt-6 flex justify-between">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={() => setPage(p => p + 1)}
          disabled={!files?.data?.length}
          className="px-4 py-2 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Dashboard;