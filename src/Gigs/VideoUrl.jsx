// src/components/VideoUploader.js
import React, { useState } from 'react';

const VideoUploader = () => {
  const [videoUrl, setVideoUrl] = useState('');

  const handleInputChange = (e) => {
    setVideoUrl(e.target.value);
  };

  const handleUpload = () => {
    // Perform any upload logic here (e.g., send the video URL to a server)
    console.log('Video URL uploaded:', videoUrl);
    // Reset the input field after upload
    setVideoUrl('');
  };

  return (
    <div>
      <h2>Video Uploader</h2>
      <input
        type="text"
        placeholder="Enter Video URL"
        value={videoUrl}
        onChange={handleInputChange}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default VideoUploader;
