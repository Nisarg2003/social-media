// ProfileDropdown.js
import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import profile from "../../../images/profile.png";

const ProfileDropdown = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleProfileButton = () => {
    navigate(`/profile/${user._id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <p className="rounded-lg w-[80%] gap-5 flex justify-center lg:justify-start items-center py-2 mt-1 px-4 md:py-3 md:px-6 text-xl cursor-pointer transition-all duration-300 ease-in-out text-white hover:bg-[#262626] hover:text-gray-200 active:bg-gray-800">
          <img className="w-6" src={profile} alt="" />
          <span className="hidden md:block">Profile</span>
        </p>
      </DropdownTrigger>
      <DropdownMenu color="black" aria-label="Profile Actions" variant="flat">
        <DropdownItem className="h-14 gap-2" textValue={`Signed in as ${user.email}`}>
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{user.email}</p>
        </DropdownItem>
        <DropdownItem key="profile" textValue="My Profile" onClick={handleProfileButton}>
          My Profile
        </DropdownItem>
        <DropdownItem key="logout" color="danger" textValue="Log Out" onClick={handleLogout}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProfileDropdown;
