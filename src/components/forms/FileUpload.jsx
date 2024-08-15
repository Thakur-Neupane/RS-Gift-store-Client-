import React, { useState, useEffect } from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaTrashAlt, FaCheck } from "react-icons/fa";
import { Spinner } from "react-bootstrap";

const MAX_IMAGES = 6;
const IMAGE_WIDTH = 720;
const IMAGE_HEIGHT = 720;
const IMAGE_QUALITY = 80;
const MAX_SIZE_MB = 10;
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024;

const FileUpload = ({ setImages, images, setThumbnail }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const token = useSelector((state) => state.userInfo.token);

  useEffect(() => {
    if (
      selectedThumbnail &&
      !images.find((img) => img.public_id === selectedThumbnail.public_id)
    ) {
      setThumbnail("");
      setSelectedThumbnail(null);
    }
  }, [images, selectedThumbnail, setThumbnail]);

  const resizeImage = (file) => {
    return new Promise((resolve, reject) => {
      Resizer.imageFileResizer(
        file,
        IMAGE_WIDTH,
        IMAGE_HEIGHT,
        "JPEG",
        IMAGE_QUALITY,
        0,
        (uri) => {
          resolve(uri);
        },
        "base64"
      );
    });
  };

  const fileUploadAndResize = async (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    let allUploadFiles = [...images];
    let totalSize = allUploadFiles.reduce((acc, file) => acc + file.size, 0);

    if (allUploadFiles.length + files.length > MAX_IMAGES) {
      setError(`You can only upload up to ${MAX_IMAGES} images.`);
      return;
    }

    for (const file of files) {
      if (file.size > MAX_SIZE_BYTES) {
        setError(`File size should not exceed ${MAX_SIZE_MB} MB.`);
        return;
      }
      totalSize += file.size;
      if (totalSize > MAX_SIZE_BYTES) {
        setError(`Total file size should not exceed ${MAX_SIZE_MB} MB.`);
        return;
      }

      try {
        setLoading(true);

        // Resize the image
        const uri = await resizeImage(file);

        // Upload the resized image
        const { data } = await axios.post(
          `${
            import.meta.env.VITE_APP_SERVR_ROOT
          }/api/v1/cloudinary/uploadimages`,
          { images: [uri] },
          { headers: { authtoken: token } }
        );

        const newImages = data.map((img) => ({
          ...img,
          size: file.size,
        }));

        allUploadFiles = [...allUploadFiles, ...newImages];
        setImages(allUploadFiles);

        if (allUploadFiles.length === 1) {
          setThumbnail(newImages[0].url);
          setSelectedThumbnail(newImages[0]);
        }

        setError("");
      } catch (uploadError) {
        setError("Error uploading image. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  const handleImageRemove = async (public_id, e) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      setLoading(true);

      // Correctly format the request payload
      const payload = { public_id }; // Change this line
      console.log("Request payload:", payload);

      // Send request to remove the image
      const response = await axios.post(
        `${import.meta.env.VITE_APP_SERVR_ROOT}/api/v1/cloudinary/removeimages`,
        payload
        // No headers are needed now
      );

      console.log("Remove response:", response.data);

      // Update the images state
      const updatedImages = images.filter(
        (item) => item.public_id !== public_id
      );
      console.log("Updated images after removal:", updatedImages);
      setImages(updatedImages);

      // Update thumbnail if necessary
      if (
        selectedThumbnail?.public_id === public_id &&
        updatedImages.length > 0
      ) {
        const newThumbnail = updatedImages[0];
        setThumbnail(newThumbnail.url);
        setSelectedThumbnail(newThumbnail);
      } else if (selectedThumbnail?.public_id === public_id) {
        setThumbnail("");
        setSelectedThumbnail(null);
      }
    } catch (err) {
      // Improved error logging
      if (err.response) {
        console.error(
          "Image remove error:",
          err.response.data, // Server response error details
          err.response.status, // Status code
          err.response.headers // Response headers
        );
      } else {
        console.error(
          "Image remove error:",
          err.message // Network or other error
        );
      }
      setError("Error removing image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleThumbnailSelect = (image, e) => {
    e.preventDefault();
    e.stopPropagation();

    if (selectedThumbnail?.public_id === image.public_id) return;

    setThumbnail(image.url);
    setSelectedThumbnail(image);
  };

  return (
    <div className="row">
      <div className="col-12 mb-3">
        {images.length > 0 && (
          <div className="image-gallery">
            {images.map((image) => (
              <div key={image.public_id} className="image-item">
                <img
                  src={image.url}
                  alt="Uploaded"
                  style={{
                    width: "150px",
                    height: "100px",
                    objectFit: "cover",
                    borderRadius: "8px",
                    border: "2px solid #ccc",
                  }}
                />
                <div className="image-actions">
                  <button
                    type="button"
                    className={`btn ${
                      selectedThumbnail?.public_id === image.public_id
                        ? "btn-success"
                        : "btn-outline-primary"
                    }`}
                    onClick={(e) => handleThumbnailSelect(image, e)}
                  >
                    <FaCheck />
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={(e) => handleImageRemove(image.public_id, e)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="col-12">
        <label className="btn btn-primary btn-raised">
          {loading ? (
            <Spinner
              animation="border"
              role="status"
              style={{ width: "24px", height: "24px" }}
            >
              <span className="visually-hidden">Uploading...</span>
            </Spinner>
          ) : (
            "Choose Files"
          )}
          <input
            type="file"
            multiple
            hidden
            accept="image/*"
            onChange={fileUploadAndResize}
          />
        </label>
        {error && <p className="text-danger mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default FileUpload;
