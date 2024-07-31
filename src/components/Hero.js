import React from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="h-[800px] bg-no-repeat bg-cover bg-center py-20" style={{ backgroundImage: "url('https://www.salesforce.com/in/blog/wp-content/uploads/sites/9/2023/11/SF_Blog_Image_Ecommerce_Changing_Everything.png')" }}>
      <div className="container mx-auto flex justify-around h-full">
        {/* Text Content */}
        {/* <div className="flex flex-col justify-center  bg-opacity-60 p-6 rounded-md">
          <div className="font-semibold flex items-center uppercase">
            <div className="w-10 h-[2px] mr-3 bg-cyan-700"></div>
            Hot Trend
          </div>
          <h1 className="uppercase text-[55px] md:text-[70px] leading-[1.1] font-semibold mb-4">
            Fresh Fashion Finds<br />
            <span className="font-light">new collection</span>
          </h1>
          <Link to="/" className="self-start uppercase font-semibold border-b-2 border-primary">
            Discover More
          </Link>
        </div> */}
      </div>
    </section>
  );
};

export default Hero;
