import axios from 'axios';
import React, { useEffect, useState } from 'react';

const ImageUploader = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/api/upload') // Replace with your backend URL
      .then((res) => {
        setImages(res.data);
      })
      .catch((error) => {
        console.log('Error fetching images:', error);
      });
  }, []);

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('No file selected');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);
    const response = await axios.post('http://localhost:3000/api/upload', formData)
  };

  return (
    <div className="p-4 bg-gray-200">
      <h2 className="text-xl font-bold mb-4">Image Uploader</h2>
      <input
        type="file"
        onChange={handleFileChange}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Upload
      </button>
      <div className='grid grid-cols-3'>
        {images.map((image) => (
          <img width={200} src={`http://localhost:3000/uploads/${image.mainImage}`} alt={image.mainImage} key={image._id} />
        ))}
      </div>
    </div>
  );
};

export default ImageUploader;
