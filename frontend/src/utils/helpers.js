/**
 * Format file size for display
 * @param {number} bytes
 * @returns {string}
 */
export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Check if file is a valid image type
 * @param {File} file
 * @returns {boolean}
 */
export function isValidImageType(file) {
  const valid = ['image/jpeg', 'image/png', 'image/webp'];
  return file && valid.includes(file.type);
}
