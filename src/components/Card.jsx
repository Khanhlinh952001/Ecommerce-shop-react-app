import { MdOutlineAlternateEmail } from "react-icons/md";
import { FaRegAddressCard } from "react-icons/fa";
import { IoCardOutline } from "react-icons/io5";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";
function Card() {
    const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    cardHolder: user?.cardHolder || "",
    cardNumber: user?.cardNumber || "",
    expiryDate: user?.expiryDate || "",
    cvc: user?.cvc || "",
    billingAddress: {
      streetAddress: user?.billingAddress?.streetAddress || "",
      city: user?.billingAddress?.city || "",
      state: user?.billingAddress?.state || "",
      zip: user?.billingAddress?.zip || "",
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith("billingAddress.")) {
      const [key, subKey] = name.split(".");
      setFormData({
        ...formData,
        [key]: {
          ...formData[key],
          [subKey]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(formData);
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

    return (  <div className="flex">
    {/* profile */}
    <div className="container w- mt-10">
      <h1 className="text-xl font-bold">Payment</h1>
      <label
        htmlFor="email"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Email
      </label>
      <div className="relative">
        <input
          type="text"
          id="email"
          name="email"
          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="your.email@gmail.com"
          value={formData.email}
          onChange={handleChange}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <MdOutlineAlternateEmail className="text-gray-500" />
        </div>
      </div>
      <label
        htmlFor="cardHolder"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Card Holder
      </label>
      <div className="relative">
        <input
          type="text"
          id="cardHolder"
          name="cardHolder"
          className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Your full name here"
          value={formData.cardHolder}
          onChange={handleChange}
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
          <FaRegAddressCard className="text-gray-500" />
        </div>
      </div>
      <label
        htmlFor="cardNumber"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Card Details
      </label>
      <div className="flex">
        <div className="relative w-7/12 flex-shrink-0">
          <input
            type="text"
            id="cardNumber"
            name="cardNumber"
            className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="xxxx-xxxx-xxxx-xxxx"
            value={formData.cardNumber}
            onChange={handleChange}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <IoCardOutline className="text-gray-500" />
          </div>
        </div>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="MM/YY"
          value={formData.expiryDate}
          onChange={handleChange}
        />
        <input
          type="text"
          id="cvc"
          name="cvc"
          className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="CVC"
          value={formData.cvc}
          onChange={handleChange}
        />
      </div>
      <label
        htmlFor="billingAddress.streetAddress"
        className="mt-4 mb-2 block text-sm font-medium"
      >
        Billing Address
      </label>
      <div className="flex flex-col sm:flex-row">
        <div className="relative flex-shrink-0 sm:w-7/12">
          <input
            type="text"
            id="billingAddress.streetAddress"
            name="billingAddress.streetAddress"
            className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
            placeholder="Street Address"
            value={formData.billingAddress.streetAddress}
            onChange={handleChange}
          />
          <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
            <img
              className="h-4 w-4 object-contain"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTuNKQTiFQNnREfLoqvbzBufxUIwzHhHoAZSA&s"
              alt=""
            />
          </div>
        </div>
        <input
          type="text"
          id="billingAddress.city"
          name="billingAddress.city"
          className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="City"
          value={formData.billingAddress.city}
          onChange={handleChange}
        />
        <input
          type="text"
          id="billingAddress.state"
          name="billingAddress.state"
          className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="State"
          value={formData.billingAddress.state}
          onChange={handleChange}
        />
        <input
          type="text"
          id="billingAddress.zip"
          name="billingAddress.zip"
          className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
          placeholder="ZIP Code"
          value={formData.billingAddress.zip}
          onChange={handleChange}
        />
      </div>
      <div>
        <button
          onClick={handleUpdate}
          className="bg-blue-500 px-3 py-2 rounded-xl text-white font-semibold mt-4"
        >
          Update
        </button>
      </div>
    </div>
  </div> );
}

export default Card;
