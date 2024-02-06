// Layout.js
import React from "react";
import Navbar from "../components/navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <div className="flex">
        <Navbar />
        <div className="main-content md:ml-[256px] w-[100%] h-full bg-black">
          {children}
        </div>
      </div>
    </>
  );
};

export default Layout;
