import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/pages/Home.jsx"
import Login from "../src/pages/Login.jsx"
import SignUp from "../src/pages/SignUp.jsx"
import ListingPage1 from "./pages/ListingPage1.jsx";
import ListingPage2 from "./pages/ListingPage2.jsx";
import ListingPage3 from "./pages/ListingPage3.jsx";
import { useContext } from "react";
import { userDataContext } from "./context/UserContext.jsx";
import MyListing from "./pages/MyListing.jsx";
import ViewCard from "./pages/ViewCard.jsx";
import Mybooking from "./pages/Mybooking.jsx";

const AppContent = () => {
  const { userData } = useContext(userDataContext);  // ✅ NOW WORKS!
  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/listingpage1" element={userData ? <ListingPage1 /> : <Navigate to="/" />} />
      <Route path="/listingpage2" element={userData ? <ListingPage2 /> : <Navigate to="/" />} />
      <Route path="/listingpage3" element={userData ? <ListingPage3 /> : <Navigate to="/" />} />
      <Route path="/mylisting" element={userData ? <MyListing /> : <Navigate to="/" />} />
      <Route path="/viewcard" element={userData ? <ViewCard /> : <Navigate to="/" />} />
      <Route path="/mybooking" element={userData ? <Mybooking /> : <Navigate to="/" />} />
    </Routes>
  );
};

const App = () => {
  return <AppContent />;  // ✅ No Router, no useContext!
};

export default App;
