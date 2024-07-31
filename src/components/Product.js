import React, { useContext, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { BsPlus, BsEyeFill } from "react-icons/bs";
import { CartContext } from "../contexts/CartContext";

const Product = ({ product }) => {
  const { addToCart } = useContext(CartContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const flyingImgRef = useRef(null);

  const handleAddToCart = (e) => {
    const rect = e.target.getBoundingClientRect();
    setPosition({ top: rect.top, left: rect.left });
    setIsAnimating(true);

    setTimeout(() => {
      addToCart(product, id);
      setIsAnimating(false);
    }, 1000);

    setTimeout(() => {
      if (flyingImgRef.current) {
        flyingImgRef.current.classList.add("animate-fly-to-cart");
      }
    }, 500);
  };

  const { id, img, category, name, price, sales } = product;
  return (
    <div>
      <div className="border border-[#e4e4e4]  h-[300px] mb-4 relative overflow-hidden group transition">
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-[200px]  mx-auto flex justify-center items-center">
            <img
              className="max-h-[200px] group-hover:scale-110 transition duration-300"
              src={img[0].url}
              alt={img[0].url}
            />
          </div>
        </div>
        <div className="absolute top-6 -right-11 group-hover:right-5 p-2 flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button onClick={handleAddToCart}>
            <div className="flex justify-center items-center text-white w-12 h-12 bg-teal-500">
              <BsPlus className="text-3xl" />
            </div>
          </button>
          <Link
            to={`/product/${id}`}
            className="w-12 h-12 bg-white flex justify-center items-center text-primary drop-shadow-xl"
          >
            <BsEyeFill />
          </Link>
        </div>
      </div>
      <div>
        <div className="text-sm capitalize text-gray-500 mb-1">{category}</div>
        <Link to={`/product/${id}`}>
          <h2 className="font-semibold mb-1">{name}</h2>
        </Link>
        <div className="flex">
          <p className="font-medium text-md text-red-500">$ {sales}</p>
          <p className="text-sm ml-2 mt-1 line-through">{price}</p>
        </div>
      </div>
      {isAnimating && (
        <img
          ref={flyingImgRef}
          src={img[0].url}
          alt="flying"
          className="fixed w-12 h-12 z-50 transition-transform duration-1000 ease-in-out"
          style={{ top: `${position.top}px`, left: `${position.left}px` }}
        />
      )}
    </div>
  );
};

export default Product;
