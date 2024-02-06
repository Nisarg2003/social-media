// ProfileImageDropdown.js
import React from 'react';
import { Avatar, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/react';

const ProfileImageDropdown = ({ profilePic, renderImage, handleEditImage, handleViewImage, handleDeleteImage }) => {
 return (
    <Dropdown className='bg-[#0a0a0a] text-white'>
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
        <DropdownItem className="text-danger" color="danger" onClick={handleDeleteImage}>Delete Image</DropdownItem>
      </DropdownMenu>
    </Dropdown>
 );
};

export default ProfileImageDropdown;
