import React, { useState } from 'react';
import './UserDetailsPage.css';

const UserDetailsPage = () => {
  const [selectedImage1, setSelectedImage1] = useState(null);
  const [selectedImage2, setSelectedImage2] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const userDetails = {
    userId: 1,
    name: 'John Doe',
    location: 'New York',
  };

  const handleImageClick = (image) => {
    setModalImage(image);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImage('');
  };

  const handleSubmit = () => {
    // Save data to localStorage
    const formData = {
      ...userDetails,
      image1: selectedImage1,
      image2: selectedImage2,
    };
    localStorage.setItem('userDetails', JSON.stringify(formData)); // Save to localStorage

    setIsSubmitted(true); // Mark as submitted
  };

  return (
    <div className="user-details-page">
      <div className="user-details-card">
        <h2>User Details</h2>
        <div className="user-info">
          <p><strong>User ID:</strong> 1</p>
          <p><strong>Name:</strong> John Doe</p>
          <p><strong>Location:</strong> New York</p>
        </div>

        <div className="image-upload-section">
          <input type="file" className="file-input" onChange={(e) => setSelectedImage1(URL.createObjectURL(e.target.files[0]))} />
          <input type="file" className="file-input" onChange={(e) => setSelectedImage2(URL.createObjectURL(e.target.files[0]))} />
        </div>

        <div className="image-previews">
          {selectedImage1 && (
            <div className="image-preview-container">
              <img
                src={selectedImage1}
                alt="Uploaded 1"
                className="image-small"
                onClick={() => handleImageClick(selectedImage1)}
              />
            </div>
          )}

          {selectedImage2 && (
            <div className="image-preview-container">
              <img
                src={selectedImage2}
                alt="Uploaded 2"
                className="image-small"
                onClick={() => handleImageClick(selectedImage2)}
              />
            </div>
          )}
        </div>

        <button className="proceed-button" onClick={handleSubmit}>Submit</button>
        
        {/* Show success message after submission */}
        {isSubmitted && (
          <div className="success-message">
            <p>Thanks! Your details have been submitted successfully.</p>
          </div>
        )}
      </div>

      {/* Modal for Enlarged Image */}
      {showModal && (
        <div className="modal" onClick={handleCloseModal}>
          <div className="modal-content">
            <img src={modalImage} alt="Enlarged" className="image-enlarged" />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDetailsPage;
