// Home.js
import React from "react";
import Layout from "../../layout/Layout";
import { ToastContainer } from "react-toastify";
import SearchUser from "../../components/search/SearchUser";
import "react-toastify/dist/ReactToastify.css";

const Search = () => {
  return (
    <Layout>
      {" "}
      <ToastContainer />
      <SearchUser/>
    </Layout>
  );
};

export default Search;
