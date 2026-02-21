export default function UploadBox({ onFileSelect, isDragging, onDragOver, onDragLeave, onDrop, loading }) {
  const handleChange = (e) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  return (
    <div
      className={`
        border-2 border-dashed rounded-xl p-12 text-center transition-colors
        ${isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}
        ${loading ? 'pointer-events-none opacity-60' : 'cursor-pointer'}
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => !loading && document.getElementById('file-input')?.click()}
    >
      <input
        id="file-input"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleChange}
        disabled={loading}
      />
      <div className="space-y-2">
        <p className="text-lg font-medium text-gray-700 dark:text-gray-300">
          {loading ? 'Analyzing...' : 'Drop an image here or click to upload'}
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Supports JPEG, PNG, WebP
        </p>
      </div>
    </div>
  );
}
