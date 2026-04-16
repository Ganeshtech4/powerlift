/**
 * Utility functions for uploading files to AWS S3
 */

const API_URL = process.env.REACT_APP_API_URL || '/api/v1';

/**
 * Upload a single file to S3
 * @param {File} file - The file to upload
 * @param {string} folder - S3 folder path (e.g., "inspire", "results/district")
 * @returns {Promise<Object>} Upload result with URL and key
 */
export const uploadToS3 = async (file, folder = 'uploads') => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', folder);

    const response = await fetch(`${API_URL}/s3/upload`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Upload failed');
    }

    return result;
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
};

/**
 * Upload multiple files to S3
 * @param {FileList|Array} files - Files to upload
 * @param {string} folder - S3 folder path
 * @returns {Promise<Object>} Upload results
 */
export const uploadMultipleToS3 = async (files, folder = 'uploads') => {
  try {
    const formData = new FormData();

    Array.from(files).forEach(file => {
      formData.append('files', file);
    });

    formData.append('folder', folder);

    const response = await fetch(`${API_URL}/s3/upload-multiple`, {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Upload failed');
    }

    return result;
  } catch (error) {
    console.error('S3 multiple upload error:', error);
    throw error;
  }
};

/**
 * Delete a file from S3
 * @param {string} key - S3 object key
 * @returns {Promise<Object>} Delete result
 */
export const deleteFromS3 = async (key) => {
  try {
    const response = await fetch(`${API_URL}/s3/delete/${encodeURIComponent(key)}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Delete failed');
    }

    return result;
  } catch (error) {
    console.error('S3 delete error:', error);
    throw error;
  }
};

/**
 * List files in S3 bucket
 * @param {string} prefix - Folder prefix to filter
 * @returns {Promise<Object>} List of files
 */
export const listS3Files = async (prefix = '') => {
  try {
    const url = prefix
      ? `${API_URL}/s3/list?prefix=${encodeURIComponent(prefix)}`
      : `${API_URL}/s3/list`;

    const response = await fetch(url);
    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to list files');
    }

    return result;
  } catch (error) {
    console.error('S3 list error:', error);
    throw error;
  }
};

/**
 * Check if a file exists in S3
 * @param {string} key - S3 object key
 * @returns {Promise<boolean>} True if file exists
 */
export const fileExistsInS3 = async (key) => {
  try {
    const response = await fetch(`${API_URL}/s3/exists/${encodeURIComponent(key)}`);
    const result = await response.json();

    return result.success && result.exists;
  } catch (error) {
    console.error('S3 file exists check error:', error);
    return false;
  }
};

/**
 * Get presigned URL for a file
 * @param {string} key - S3 object key
 * @param {number} expiresIn - Expiration time in seconds
 * @returns {Promise<string>} Presigned URL
 */
export const getPresignedUrl = async (key, expiresIn = 3600) => {
  try {
    const response = await fetch(
      `${API_URL}/s3/presigned-url/${encodeURIComponent(key)}?expiresIn=${expiresIn}`
    );

    const result = await response.json();

    if (!response.ok || !result.success) {
      throw new Error(result.message || 'Failed to get presigned URL');
    }

    return result.url;
  } catch (error) {
    console.error('S3 presigned URL error:', error);
    throw error;
  }
};
