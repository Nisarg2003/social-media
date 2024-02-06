import React from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Input,
  Button,
} from "@nextui-org/react";
import useForm from "../../../hooks/useForm";
import axios from "axios";

const EditProfileModal = ({ isOpen, onClose, userId, setUserInfo }) => {
  const { formData, handleChange } = useForm();

  const handleAction = async () => {
    const updatedFields = {};
    if (formData.name) {
      updatedFields.name = formData.name;
    }
    if (formData.bio) {
      updatedFields.bio = formData.bio;
    }
    try {
      const response = await axios.put(
        `https://social-media-app-5eap.onrender.com/api/v1/updateUser/${userId}`,
        {
          payload: updatedFields,
        }
      );
      setUserInfo(response.data);

      onClose();
    } catch (error) {
      console.error("Error making API call:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent className="bg-[#0a0a0a] text-white">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edit Profile
            </ModalHeader>
            <ModalBody>
              <Input
                placeholder="Name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
                required
              />
              <Input
                placeholder="Bio"
                name="bio"
                value={formData.bio || ""}
                onChange={handleChange}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onPress={handleAction}>
                Action
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditProfileModal;
