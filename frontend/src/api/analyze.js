/**
 * API client for deepfake detection backend.
 * Uses real ML model (ResNet/EfficientNet + face detection or Hugging Face transformers).
 */

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export async function analyzeImage(file) {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${API_BASE}/api/analyze`, {
    method: 'POST',
    body: formData,
    headers: {},
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    const detail = err.detail;
    const msg = Array.isArray(detail) ? detail[0]?.msg || detail[0] : (detail || err.message || response.statusText);
    throw new Error(String(msg));
  }

  const data = await response.json();
  return data;
}
