// CreatePostModal.js
import React from "react";
import {
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import useForm from "../../../hooks/useForm";
import axios from "axios";
import { toast } from "react-toastify";

const CreatePostModal = ({ onModalClose }) => {
  const { formData, handleChange } = useForm({
    description: "",
    photo: null,
  });

  const handlePostCreation = async () => {
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("description", formData.description);
      formDataToSend.append("user", localStorage.getItem("user"));
      formDataToSend.append("image", formData.photo);

      const response = await axios.post(
        "https://social-media-app-5eap.onrender.com/api/v1/post/createPost",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response.data);

      if (response.status === 200) {
        toast.success("Post created successfully");
        onModalClose();
      } else {
        console.error(
          "Error creating post. Unexpected status:",
          response.status
        );
        toast.error("Error creating post");
      }
    } catch (error) {
      toast.error("Error creating post");
      console.error("Error creating post:", error);
    }
  };

  return (
    <ModalContent>
      <ModalHeader className="flex flex-col gap-1 text-white">
        Create Post
      </ModalHeader>
      <ModalBody className="bg-[#000000]">
        <Input
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          name="description"
          required
        />
        <Input
          type="file"
          placeholder="Upload photo"
          required
          onChange={(e) =>
            handleChange({
              target: { name: "photo", value: e.target.files[0] },
            })
          }
          name="photo"
        />
      </ModalBody>
      <ModalFooter>
        <Button color="danger" variant="light" onPress={onModalClose}>
          Close
        </Button>
        <Button color="primary" onPress={handlePostCreation}>
          Action
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default CreatePostModal;
