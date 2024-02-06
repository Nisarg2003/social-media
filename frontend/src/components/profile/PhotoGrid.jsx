import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ModalImage from "react-modal-image";

const ImageGrid = ({ onCountChange }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const userId = id === user._id ? user._id : id;
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `https://social-media-app-5eap.onrender.com/api/v1/post/post-by-userId/${userId}`
        );
        setData(res.data.posts);
        onCountChange(res.data.count);
      } catch (err) {
        console.log(err);
      }
    };

    getUserData();
  }, [user._id, onCountChange, id]);

  const renderImage = (imageData, contentType) => {
    const flattenedData = [].concat(imageData.data);
    const imageBlob = new Blob([new Uint8Array(flattenedData)], {
      type: contentType,
    });
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  };

  return (
    <div className="lg:mx-8 md:mx-6 grid grid-cols-3 lg:grid-cols-4 lg:gap-4 md:gap-2 mt-10 mb-32">
      {data.map((post, index) => (
        <ModalImage
          key={index}
          className="h-full object-cover"
          hideDownload={true}
          showRotate={true}
          small={renderImage(post.image.data, post.image.contentType)}
          large={renderImage(post.image.data, post.image.contentType)}
        />
      ))}
    </div>
  );
};

export default ImageGrid;
