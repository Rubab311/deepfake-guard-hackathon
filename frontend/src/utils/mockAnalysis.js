/**
 * Mock analysis for development. Replace with real API call when backend is ready.
 * Returns clear isReal verdict. Real backend should provide similar structure.
 * @param {File} file - Image file to analyze
 * @returns {Promise<Object>} Analysis result
 */
export async function runMockAnalysis(file) {
  // Simulate network delay
  await new Promise((r) => setTimeout(r, 1500));

  const seed = file.name.length + file.size;
  // Skew toward lower scores (conservative: when uncertain, flag as fake)
  const authenticityScore = 0.35 + (seed % 55) / 100; // 0.35–0.89
  const riskLevel = authenticityScore < 0.4 ? 'high' : authenticityScore < 0.7 ? 'medium' : 'low';

  // Conservative: require 65%+ to say Real (matches backend REAL_THRESHOLD)
  const isReal = authenticityScore >= 0.65;
  const confidence = isReal ? authenticityScore : 1 - authenticityScore;

  return {
    authenticityScore,
    isReal,
    confidence,
    riskLevel,
    verdict: isReal ? 'real' : 'fake',
    factors: authenticityScore > 0.7
      ? [
          { name: 'Face consistency', value: 'Natural', status: 'success', explanation: 'Facial features, symmetry, and proportions appear consistent with a real photograph. No obvious signs of face-swapping or morphing.' },
          { name: 'Skin texture', value: 'Natural', status: 'success', explanation: 'Skin exhibits natural pore structure, wrinkles, and texture variation. No unnaturally smooth or blurred patches typical of AI generation.' },
          { name: 'Lighting alignment', value: 'Consistent', status: 'success', explanation: 'Light sources and shadows align across the image. Highlights and reflections follow a coherent lighting model.' },
          { name: 'Edge artifacts', value: 'None', status: 'success', explanation: 'No visible halos, blurring, or discoloration around facial boundaries or edges. Blending appears natural.' },
        ]
      : authenticityScore > 0.5
      ? [
          { name: 'Face consistency', value: 'Suspicious', status: 'warning', explanation: 'Minor inconsistencies in facial symmetry or feature alignment detected. Could indicate partial manipulation or compression artifacts.' },
          { name: 'Skin texture', value: 'Mixed', status: 'warning', explanation: 'Some regions show unnatural smoothing or lack of fine detail. AI-generated faces often have uniform skin texture without natural variation.' },
          { name: 'Lighting alignment', value: 'Inconsistent', status: 'warning', explanation: 'Shadows or reflections may not fully match the apparent light direction. Common in composited or AI-generated images.' },
          { name: 'Edge artifacts', value: 'Detected', status: 'warning', explanation: 'Slight halos, blurring, or color fringing found around edges. Often produced when faces are pasted or generated.' },
        ]
      : [
          { name: 'Face consistency', value: 'Artificial', status: 'danger', explanation: 'Significant inconsistencies in facial structure, asymmetry, or unnatural proportions. Strong indicators of AI generation or face-swapping.' },
          { name: 'Skin texture', value: 'Synthetic', status: 'danger', explanation: 'Skin appears unnaturally smooth, waxy, or lacks fine detail. AI models often struggle to render realistic pores and skin texture.' },
          { name: 'Lighting alignment', value: 'Inconsistent', status: 'danger', explanation: 'Multiple conflicting light sources or impossible shadows detected. Suggests the image was generated or heavily edited.' },
          { name: 'Edge artifacts', value: 'Detected', status: 'danger', explanation: 'Clear halos, blurring, or jagged edges around the face. Typical of face-swap or inpainting algorithms.' },
        ],
  };
}
