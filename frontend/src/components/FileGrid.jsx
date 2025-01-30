const FileGrid = ({ files }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {files?.data?.map((file) => (
        <div key={file.id} className="border rounded p-4">
          {file.fileType.startsWith('image/') ? (
            <img
              src={file.fileUrl}
              alt={file.id}
              className="w-full h-48 object-cover"
            />
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
  );
};

export default FileGrid;