import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Button,
  useDisclosure,
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import axios from "axios";
import { useParams } from "react-router-dom";
import EditProfileModal from "./component/EditProfileModel";

const ProfileInfo = ({ postCount }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { id } = useParams();
  const [userInfo, setUserInfo] = useState();
  const [profilePic, setProfilePic] = useState();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [viewImageModalOpen, setViewImageModalOpen] = useState(false);

  // Ref for the hidden file input
  const fileInputRef = useRef(null);

  const userId = id === user._id ? user._id : id;
  const getUserDetails = useCallback(async () => {
    try {
      const res = await axios.get(
        `https://social-media-app-5eap.onrender.com/api/v1/user/${userId}`
      );
      setUserInfo(res.data);
      setProfilePic(res.data.profile_pic);
    } catch (err) {
      console.log(err);
    }
  }, [userId]);
  useEffect(() => {
    
   
    getUserDetails();
  }, [getUserDetails]);

  const renderImage = () => {
    if (!profilePic || !profilePic.data) {
      return null;
    }

    const flattenedData = [].concat(profilePic.data.data);
    const imageBlob = new Blob([new Uint8Array(flattenedData)], {
      type: profilePic.contentType,
    });
    const imageUrl = URL.createObjectURL(imageBlob);
    return imageUrl;
  };

  const handleUpdateImage = async (file) => {
    if (!file) return;

    const formData = new FormData();
    formData.append("profile_pic", file);
    console.log("formData", formData);
    try {
      const response = await axios.post(
        `https://social-media-app-5eap.onrender.com/api/v1/update-profile-pic/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      getUserDetails();
      console.log("Image updated successfully");
      setProfilePic(response.data.profile_pic);
    } catch (error) {
      console.error("Error updating image:", error);
    }
  };

  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    handleUpdateImage(file);
  };
  
  const handleEditImage = () => {
    fileInputRef.current.click();
  };


  const handleViewImage = () => {
    setViewImageModalOpen(true);
  };

  const handleCloseViewImageModal = () => {
    setViewImageModalOpen(false);
  };

  const handleDeleteImage = async () => {
    // Implement your logic for deleting image
  };

  return (
    <>
      <div className="text-white flex flex-col justify-center lg:justify-start items-center lg:ml-52 mt-16 lg:gap-20 gap-5 md:flex-row">
        <div className="">
          <Dropdown className="bg-[#0a0a0a] text-white">
            <DropdownTrigger>
              <Avatar
                radius="full"
                className="md:w-40 md:h-40 w-32 h-32"
                color="success"
                src={renderImage()}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Image Options">
              <DropdownItem onClick={handleEditImage}>Edit Image</DropdownItem>
              <DropdownItem onClick={handleViewImage}>View Image</DropdownItem>
              <DropdownItem
                className="text-danger"
                color="danger"
                onClick={handleDeleteImage}
              >
                Delete Image
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex flex-col items-center md:items-start lg:gap-5 gap-3">
          <div className="flex items-center gap-3">
            <h1>{userInfo?.name}</h1>
            {user._id === id ? (
              <Button className="border-1" onPress={onOpen}>
                Edit Profile
              </Button>
            ) : null}
          </div>
          <div>
            <p>{postCount} Posts</p>
          </div>
          <div>
            <p>{!userInfo?.bio ? "description" : userInfo.bio}</p>
          </div>
        </div>
      </div>

      {/* View Image Modal */}
      {viewImageModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="mx-auto my-8 lg:max-w-md md:max-w-sm max-w-xs overflow-hidden rounded-lg relative">
            <div className="absolute top-2 right-2">
              <Button
                onPress={handleCloseViewImageModal}
                className="text-black"
              >
                Close
              </Button>
            </div>
            <img src={renderImage()} alt="Profile" className="w-full h-auto" />
          </div>
        </div>
      )}

      <EditProfileModal
        isOpen={isOpen}
        onClose={onOpenChange}
        userId={id}
        setUserInfo={setUserInfo}
      />

      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileSelection}
      />
    </>
  );
};

export default ProfileInfo;
