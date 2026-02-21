import { useState } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import UploadBox from '../components/upload/UploadBox';
import CameraCapture from '../components/upload/CameraCapture';
import AnalysisPanel from '../components/analysis/AnalysisPanel';
import Loader from '../components/common/Loader';
import { useImageAnalysis } from '../hooks/useImageAnalysis';

export default function Analyze() {
  const { analyze, result, loading, error, resetResult } = useImageAnalysis();
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = (file) => {
    setPreview(URL.createObjectURL(file));
    analyze(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer?.files?.[0];
    if (file?.type.startsWith('image/')) handleFileSelect(file);
  };

  const reset = () => {
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    resetResult();
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950">
      <Navbar />
      <main className="flex-1 w-full px-4 py-12 sm:py-16 flex flex-col items-center">
        <div className="w-full max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Analyze an Image
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            Upload or capture a photo to get an instant Real or Fake verdict.
          </p>

          <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm p-6 sm:p-8 mb-8">
            <UploadBox
              onFileSelect={handleFileSelect}
              isDragging={isDragging}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              loading={loading}
            />
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">Or use your camera</p>
              <div className="flex justify-center">
                <CameraCapture onCapture={handleFileSelect} />
              </div>
            </div>
          </div>

          {(preview || error || result) && (
            <div className="space-y-6">
              {preview && (
                <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-200 dark:border-gray-800">
                  <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full max-h-80 object-contain"
                    />
                    {loading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-xl">
                        <Loader size="lg" />
                      </div>
                    )}
                  </div>
                  <button
                    onClick={reset}
                    className="mt-4 text-sm text-emerald-600 dark:text-emerald-400 hover:underline"
                  >
                    Clear & analyze another
                  </button>
                </div>
              )}
              {error && (
                <p className="text-red-600 dark:text-red-400 text-sm text-center">{error}</p>
              )}
              <AnalysisPanel result={result} />
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
