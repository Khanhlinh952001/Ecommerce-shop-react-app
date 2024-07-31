import React, { useState } from "react";
import Card from "./Card";
import { FaCcMastercard } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import OrderHistory from "../pages/OrderHistory";
function Tabs() {
  const [activeTab, setActiveTab] = useState("tab1");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  
  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap mb-4 border-b">
        <button
          onClick={() => handleTabClick("tab1")}
          className={`py-2 px-4 font-medium border-b-2 ${
            activeTab === "tab1"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500"
          } hover:text-blue-500 hover:border-blue-500 flex`}
        >
           <FaCcMastercard className="lg:md:text-xl sm:text-sm  mr-1"/> Thông tin thẻ 
        </button>
        <button
          onClick={() => handleTabClick("tab2")}
          className={`py-2 px-4  font-medium border-b-2 ${
            activeTab === "tab2"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500"
          } hover:text-blue-500 hover:border-blue-500 flex`}
        >
       <FaHistory className="lg:md:text-xl sm:text-sm  mr-1"/>  Lịch sữ mua hàng
        </button>
        {/* <button
          onClick={() => handleTabClick("tab3")}
          className={`py-2 px-4 text-lg font-medium border-b-2 ${
            activeTab === "tab3"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-500"
          } hover:text-blue-500 hover:border-blue-500`}
        >
          Tab 3
        </button> */}
      </div>
      <div>
        {activeTab === "tab1" && (
          <div className="p-4">
           <Card/>
          </div>
        )}
        {activeTab === "tab2" && (
          <div className="p-4">
            <OrderHistory/>
          </div>
        )}
        {/* {activeTab === "tab3" && (
          <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Content for Tab 3</h2>
            <p>This is the content for tab 3.</p>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Tabs;
