import React, { useContext, useEffect, useState } from "react";
import { SidebarContext } from "../contexts/SidebarContext";
import { CartContext } from "../contexts/CartContext";
import { Link } from "react-router-dom";
import Logo from "../img/logo.svg";
import { BsBag, BsTruck, BsPerson } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import useOrders from "../hooks/order/useOrders";
import { useAuth } from "../contexts/AuthContext";
import { IoIosLogOut } from "react-icons/io";
const Header = () => {
  // header state
  const [isActive, setIsActive] = useState(false);
  const { itemAmount } = useContext(CartContext);
  const { user,logout } = useAuth();
  const { orders } = useOrders(user ? user.id : null);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 60 ? setIsActive(true) : setIsActive(false);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={`${isActive ? "bg-white py-4 shadow-md" : "bg-none py-6"
        } fixed w-full z-10 lg:px-8 transition-all`}
    >
      <div className="container mx-auto flex items-center justify-between h-full">
        <Link to={"/"}>
          <div className="w-[40px] flex">
            <img src={Logo} alt="Logo" />
            <h1 className="mt-2 text-xl font-medium ml-2">Korea_Shopping</h1>
          </div>
        </Link>

        {/* cart */}
        <div className="flex">
          <div className="">
            {/* <div class="relative flex border rounded-xl">

              <input
                type="text"
                class=" w-full sm:w-30 rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 peer-focus:text-primary data-[twe-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-white dark:placeholder:text-neutral-300 dark:autofill:shadow-autofill dark:peer-focus:text-primary [&:not([data-twe-input-placeholder-active])]:placeholder:opacity-0"
                // placeholder="Search"
                id="search-input"
               />
              <label
                for="search-input"
                class="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary peer-data-[twe-input-state-active]:-translate-y-[0.9rem] peer-data-[twe-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-400 dark:peer-focus:text-primary"
              >Search
              </label>
              <button
                class="relative z-[2] -ms-0.5 flex items-center rounded-e bg-gray-500 p-1 px-5 text-xs font-medium uppercase leading-normal text-white shadow-primary-3 transition duration-150 ease-in-out hover:bg-primary-accent-300 hover:shadow-primary-2 focus:bg-primary-accent-300 focus:shadow-primary-2 focus:outline-none focus:ring-0 active:bg-primary-600 active:shadow-primary-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="button"
                id="search-button"
                data-twe-ripple-init
                data-twe-ripple-color="light">
                <IoIosSearch className="text-2xl" />
              </button>
            </div> */}

          </div>

          <Link to={'/profile'}><div className="cursor-pointer flex relative mx-2">
            <BsPerson className="text-2xl" />
          </div>
          </Link>
          <div onClick={logout}>
            <IoIosLogOut className="text-2xl" />
          </div>
          <Link to={'/orderHistory'}><div className="cursor-pointer flex relative mx-2">
            <BsTruck className="text-2xl " />
            {orders.length > 0 && (
              <div className="bg-blue-500 absolute -right-3 -bottom-2 text-[12px] w-4 h-4 text-white rounded-full flex justify-center items-center top-0">
                {orders.length}
              </div>
            )}
          </div>
          </Link>

          <Link to={'/cartItems'}> <div
            // onClick={() => setIsOpen(!isOpen)}
            className={`cursor-pointer flex relative mx-2 ${itemAmount === 0 ? "text-gray-500" : "text-black"
              }`}
          >
            <BsBag className="text-2xl" />
            {itemAmount > 0 && (
              <div className="bg-red-500 absolute -right-2 -bottom-2 text-[12px] w-[18px] h-[18px] text-white rounded-full flex justify-center items-center top-0">
                {itemAmount}
              </div>
            )}
          </div>
          </Link>

        </div>
      </div>
    </header>
  );
};

export default Header;
