import React, { useState, useEffect } from 'react';

const S3Image = ({ s3Key, alt, className, style }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadImage = async () => {
      try {
        setLoading(true);
        // Construct S3 URL directly
        const bucket = process.env.REACT_APP_AWS_S3_BUCKET_NAME || 'wpcrekha';
        const region = process.env.REACT_APP_AWS_REGION || 'ap-south-2';
        const url = `https://${bucket}.s3.${region}.amazonaws.com/${s3Key}`;
        setImageUrl(url);
        setLoading(false);
      } catch (err) {
        console.error('Error loading S3 image:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    if (s3Key) {
      loadImage();
    }
  }, [s3Key]);

  if (loading) {
    return <div className={className} style={style}>Loading...</div>;
  }

  if (error) {
    return <div className={className} style={style}>Error loading image</div>;
  }

  return (
    <img 
      src={imageUrl} 
      alt={alt || 'S3 Image'} 
      className={className}
      style={style}
      onError={(e) => {
        console.error('Image load error:', e);
        e.target.style.display = 'none';
      }}
    />
  );
};

export default S3Image;
