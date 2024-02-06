import './App.css'
import Login from "./pages/auth/Login";
import SignUp from "./pages/auth/SignUp";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/ProtectedRoute";
import Home from "./pages/home/Home";
import Search from "./pages/search/Search";
import Profile from "./pages/profile/Profile";

import { NextUIProvider } from "@nextui-org/react";

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route element={<PrivateRoutes />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/profile/:id" element={<Profile />}></Route>
          <Route path="/Search/" element={<Search />}></Route>
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
