// Home.js
import React from "react";
import Layout from "../../layout/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cards from "../../components/home/Cards";

const Home = () => {
  return (
    <Layout>
      <ToastContainer />
      <Cards></Cards>
      {/* <PostCard></PostCard> */}
    </Layout>
  );
};

export default Home;
