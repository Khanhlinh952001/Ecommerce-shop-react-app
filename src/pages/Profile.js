import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

import Tabs from "../components/Tabs";
const Profile = () => {
  const { user, updateUser } = useAuth();


  return (
    <div className="pt-20 container m-auto">
      {/* header */}
      {/* <section className="relative pt-36 pb-24">
        <img
          src="https://png.pngtree.com/thumb_back/fh260/background/20230408/pngtree-rainbow-curves-abstract-colorful-background-image_2164067.jpg"
          alt="cover-image"
          className="w-full absolute top-0 left-0 z-0 h-60"
        />
        <div className="w-full max-w-5xl mx-auto px-6 md:px-8">
          <div className="flex items-center max-w-5xl relative z-10 mb-2.5">
            <img
              src="https://pagedone.io/asset/uploads/1705471668.png"
              alt="user-avatar-image"
              className="border-4 border-solid border-white rounded-full"
            />
            <div className="ml-3">
              <h3 className="font-manrope font-bold text-3xl text-gray-900">
                {user.fullName}
              </h3>
              <p className="font-normal text-base text-gray-500 mb-8">
                {user.email}
              </p>
            </div>
          </div>
        </div>
      </section> */}
      <h1 className="w-full text-center text-2xl font-bold">Trang cá nhân </h1>
      <div className="text-center mt-10">
        <strong>Welcome, {user.fullName}!</strong>
        <p><strong>Email :</strong> {user.email}</p>
        <p><strong>Phone Number:</strong> {user.phoneNumber}</p>
      </div>
      {/* tab */}
      <Tabs/>

      {/* Add more profile information here */}
     

    </div>
  );
};

export default Profile;
