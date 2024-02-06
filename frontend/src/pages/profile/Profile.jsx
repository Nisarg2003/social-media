import React, { useState } from "react";
import Layout from "../../layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileInfo from "../../components/profile/ProfileInfo";
import ImageGrid from "../../components/profile/PhotoGrid";

const Home = () => {
  const [postCount, setPostCount] = useState();

  const handlePostCountChange = (count) => {
    setPostCount(count);
  };

  return (
    <Layout>
      <ToastContainer />
      <ProfileInfo postCount={postCount} />
      <ImageGrid onCountChange={handlePostCountChange} />
    </Layout>
  );
};

export default Home;
