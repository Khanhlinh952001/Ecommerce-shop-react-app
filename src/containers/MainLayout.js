// MainLayout.js
import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
const MainLayout = ({ children }) => {
  return (
    <div className="main-layout">
      <Header />
      <div className="main-content">
        {children}
      </div>
      <Sidebar/>
      <Footer />
    </div>
  );
};

export default MainLayout;
