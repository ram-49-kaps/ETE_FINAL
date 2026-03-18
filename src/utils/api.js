import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
});

/**
 * Send an image to the backend for ASL gesture prediction.
 * @param {File|Blob} file - The image file or blob to predict.
 * @returns {Promise<{ label: string, confidence: number }>}
 */
export const predictImage = async (file) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post('/predict', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export default apiClient;
