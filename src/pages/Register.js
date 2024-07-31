import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Navigate } from 'react-router-dom';

function Register() {
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [email, setEmail] = useState("");
    const [area, setArea] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [postCode, setPostCode] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});
    const { register } = useAuth();
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors = {};
        if (!fullName) newErrors.fullName = "Full Name is required";
        if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
        if (!email) newErrors.email = "Email Address is required";
        if (!area) newErrors.area = "Area is required";
        if (!city) newErrors.city = "City is required";
        if (!state) newErrors.state = "State is required";
        if (!password) newErrors.password = "Password is required";
        if (!confirmPassword) newErrors.confirmPassword = "confirmPassword is required";
        return newErrors;
    };

    const handleRegister = (e) => {
        if (password !== confirmPassword) {
            alert("password !== confirmPassword");
        }
        e.preventDefault();
        const formErrors = validateForm();

        if (Object.keys(formErrors).length === 0) {
            register(email, password, fullName, phoneNumber, area, city, state, postCode);
            navigate('/profile');
        } else {
            setErrors(formErrors);
        }
    };

    return (
        <div className="font-[sans-serif] text-[#333]">
            <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
                <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl w-full">
                    <div className="max-md:text-center">
                        <h2 className="lg:text-5xl text-4xl font-extrabold lg:leading-[55px]">
                            🌟 Đăng ký ngay để nhận được những ưu đãi độc quyền và cập nhật về các sản phẩm mới nhất! 🌟
                        </h2>
                        <p className="text-sm mt-6">
                            🚀 Đừng bỏ lỡ cơ hội! Hãy đăng ký ngay bằng cách nhấn vào nút "Đăng ký" ở góc trên cùng của trang web hoặc ứng dụng của chúng tôi. 🚀
                        </p>
                        <p className="text-sm mt-10">
                            Đã có tài khoản? <Link to={'/login'} className="text-blue-600 font-semibold hover:underline ml-1">Đăng Nhập</Link>
                        </p>
                    </div>
                    <div className="flex items-center justify-center p-12">
                        <div className="mx-auto w-full max-w-[550px] bg-white">
                            <h1 className="text-center font-bold text-3xl mb-4">Create Account</h1>
                            <form onSubmit={handleRegister}>
                                <div className="mb-5">
                                    <label htmlFor="name" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        placeholder="Full Name"
                                        value={fullName}
                                        onChange={(e) => setFullName(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {errors.fullName && <p className="text-red-500 text-sm">{errors.fullName}</p>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="phone" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Phone Number
                                    </label>
                                    <input
                                        type="text"
                                        name="phone"
                                        id="phone"
                                        placeholder="Enter your phone number"
                                        value={phoneNumber}
                                        onChange={(e) => setPhoneNumber(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {errors.phoneNumber && <p className="text-red-500 text-sm">{errors.phoneNumber}</p>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
                                </div>
                                <div className="mb-5">
                                    <label htmlFor="email" className="mb-3 block text-base font-medium text-[#07074D]">
                                        Confirm Password
                                    </label>
                                    <input
                                        type="confirmPassword"
                                        name="confirmPassword"
                                        id="confirmPassword"
                                        placeholder="Enter your confirmPassword"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                    />
                                    {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
                                </div>
                                <div className="mb-5 pt-3">
                                    <label className="mb-5 block text-base font-semibold text-[#07074D] sm:text-xl">
                                        Address Details
                                    </label>
                                    <div className="-mx-3 flex flex-wrap">
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <input
                                                    type="text"
                                                    name="city"
                                                    id="city"
                                                    placeholder="Enter city"
                                                    value={city}
                                                    onChange={(e) => setCity(e.target.value)}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {errors.city && <p className="text-red-500 text-sm">{errors.city}</p>}
                                            </div>
                                        </div>
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <input
                                                    type="text"
                                                    name="area"
                                                    id="area"
                                                    placeholder="Enter area"
                                                    value={area}
                                                    onChange={(e) => setArea(e.target.value)}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {errors.area && <p className="text-red-500 text-sm">{errors.area}</p>}
                                            </div>
                                        </div>

                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <input
                                                    type="text"
                                                    name="state"
                                                    id="state"
                                                    placeholder="Enter state"
                                                    value={state}
                                                    onChange={(e) => setState(e.target.value)}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {errors.state && <p className="text-red-500 text-sm">{errors.state}</p>}
                                            </div>
                                        </div>
                                        <div className="w-full px-3 sm:w-1/2">
                                            <div className="mb-5">
                                                <input
                                                    type="text"
                                                    name="post-code"
                                                    id="post-code"
                                                    placeholder="Post Code"
                                                    value={postCode}
                                                    onChange={(e) => setPostCode(e.target.value)}
                                                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                                                />
                                                {errors.postCode && <p className="text-red-500 text-sm">{errors.postCode}</p>}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
                                    >
                                        Đăng Ký
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
