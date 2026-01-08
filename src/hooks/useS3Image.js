import { useState, useEffect } from 'react';

/**
 * Custom hook to fetch presigned URLs from S3 for secure image access
 * @param {string} s3Key - The S3 object key (path in bucket)
 * @param {number} expiresIn - URL expiration time in seconds (default: 3600)
 * @returns {Object} { url, loading, error }
 */
const useS3Image = (s3Key, expiresIn = 3600) => {
  const [url, setUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!s3Key) {
      setLoading(false);
      return;
    }

    let isMounted = true;

    const fetchPresignedUrl = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
        const response = await fetch(
          `${apiUrl}/api/s3/presigned-url/${encodeURIComponent(s3Key)}?expiresIn=${expiresIn}`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch presigned URL: ${response.status}`);
        }

        const data = await response.json();

        if (isMounted && data.success) {
          setUrl(data.url);
        } else if (isMounted) {
          throw new Error(data.message || 'Failed to get presigned URL');
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message);
          console.error('Error fetching S3 presigned URL:', err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchPresignedUrl();

    return () => {
      isMounted = false;
    };
  }, [s3Key, expiresIn]);

  return { url, loading, error };
};

export default useS3Image;
