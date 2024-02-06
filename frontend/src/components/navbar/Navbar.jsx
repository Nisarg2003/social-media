import {  Modal, useDisclosure } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import instagram from "../../images/Instagram.png";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import CreatePostModal from "./components/CreatePostModal";
import ProfileDropdown from "./components/ProfileDrawer";

const NavItem = ({ icon, text, onPress, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (route) {
      navigate(route);
    }
    if (onPress) {
      onPress();
    }
  };

  return (
    <p
      className="rounded-lg w-[80%] gap-5 flex justify-center lg:justify-start items-center py-2 px-4 md:py-3 md:px-6 text-xl cursor-pointer transition-all duration-300 ease-in-out text-white hover:bg-[#262626] hover:text-gray-200 active:bg-gray-800"
      onClick={handleClick}
    >
      <span>{icon}</span>
      <span className="hidden md:block">{text}</span>
    </p>
  );
};

const Navbar = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <div className="bg-[#000000] md:h-screen h-12 md:w-64 w-[100%] bottom-0 z-10 fixed md:border-r-1 border-t-1 border-[#262626]">
        <div className="items-center justify-center md:pt-10 md:flex hidden ">
          <img src={instagram} className="w-32" alt="" />
        </div>
        {/* <div className="hidden md:flex flex-col justify-center items-center mt-9 gap-4">
          <Avatar
            radius="full"
            className="md:w-20 md:h-20 w-32 h-32"
            src={imageSrc}
          />
          <p className="font-bold text-2xl text-white">{user.name}</p>
        </div> */}
        <div className="flex md:flex-col items-center justify-between mr-3 md:mr-0  gap-2 md:mt-10">
          <NavItem icon={<HomeOutlinedIcon />} text="Feed" route="/" />
          <NavItem
            icon={<SearchOutlinedIcon />}
            text="Search"
            route="/search"
          />
          <NavItem
            icon={<AddBoxOutlinedIcon />}
            text="Create"
            onPress={onOpen}
          />
          <ProfileDropdown />
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="bg-[#000000]"
      >
        <CreatePostModal onModalClose={() => onOpenChange(false)} />
      </Modal>
    </>
  );
};

export default Navbar;
