'use client';
import React, { useState } from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function LoginPage() {
  const API = process.env.NEXT_PUBLIC_API_URL;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const router = useRouter();

 const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();

  try {
    const response = await fetch(`${API}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("Login response data:", data);

    if (response.ok && data.access_token) {
      // store token
      sessionStorage.setItem("access_token", data.access_token);

      // extract role from user object
      const role = data.user?.role; 
      console.log("User role:", role);

      if (role) {
        sessionStorage.setItem("role", role);

        if (role == "user") {
          router.push("/collabhome");
        } else if (role == "employee") {
          router.push("/bpidashboard");
        } else {
          console.warn("Unknown role:", role);
          router.push("/collabhome"); // fallback
        }
      } else {
        console.error("No role found in response");
        router.push("/collabhome"); // fallback
      }
    } else {
      console.error("Login failed:", data.message || "Unknown error");
    }
  } catch (error) {
    console.error("Error logging in:", error);
  }
};



  return (
    <div className="min-h-screen bg-white flex flex-col items-center px-4 py-6 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <img
          src="/logo/main_logo.png"
          alt="SynseAI"
          className="h-auto w-32 sm:w-40 md:w-48 mx-auto pt-6"
        />
      </div>

      {/* Main content */}
      <div className="w-full max-w-6xl flex flex-col lg:flex-row justify-between items-center gap-6 lg:gap-8">

        {/* Banner - Shows above form on mobile, right side on desktop */}
        <div className="w-full lg:w-1/2 order-1 lg:order-2">
          <img
            src="/images/loginbanner.png"
            alt="Login Illustration"
            className="w-full h-auto object-contain max-w-md mx-auto lg:max-w-none"
          />
        </div>

        {/* Login Form - Shows below banner on mobile, left side on desktop */}
        <div className="w-full lg:w-1/2 max-w-md lg:max-w-lg order-2 lg:order-1 px-6 sm:px-10 lg:px-8 py-2 ">
          <div className="space-y-6">

            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#B11016] mb-2">
                EMAIL
              </label>
              <div className="relative w-full group">
                <input
                  type="text"
                  value={email}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="appearance-none w-full px-0 py-3 border-0 
                    placeholder-gray-400 text-gray-900 bg-transparent 
                    focus:outline-none text-sm sm:text-base"
                />

                {/* Base underline */}
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-300" />

                {/* Red animated underline */}
                <div className="absolute left-0 bottom-0 h-[2px] bg-[#B11016] 
                  transition-transform duration-300 ease-in-out 
                  origin-center scale-x-0 w-full 
                  group-focus-within:scale-x-100" />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-[#B11016] mb-2">
                PASSWORD
              </label>
              <div className="relative w-full group">
                <input
                  type="password"
                  value={password}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="appearance-none w-full px-0 py-3 border-0 
                    placeholder-gray-400 text-gray-900 bg-transparent 
                    focus:outline-none text-sm sm:text-base"
                />

                {/* Base underline */}
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-gray-300" />

                {/* Red animated underline */}
                <div className="absolute left-0 bottom-0 h-[2px] bg-[#B11016] 
                  transition-transform duration-300 ease-in-out 
                  origin-center scale-x-0 w-full 
                  group-focus-within:scale-x-100" />
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-left mt-0">
              <a className="text-sm sm:text-md text-[#B11016] hover:text-red-500 font-medium cursor-pointer transition-colors duration-200">
                Forgot password?
              </a>
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit}
              className="mt-8 sm:mt-15 w-full flex justify-center py-3 sm:py-3 px-3 border border-transparent 
                rounded-md text-sm font-bold text-white bg-[#B11016] hover:text-[#B11016] hover:bg-white hover:border-[#B11016] transition-all duration-300 ease-in-out transform hover:scale-105 text-base sm:text-lg"
            >
              LOGIN
            </button>

            {/* Register Link */}
            <div className="text-center pt-0">
              <span className="text-sm sm:text-md text-gray-600">
                Don't have an account?{' '}
                <span className="font-medium text-[#B11016] hover:text-red-500 underline cursor-pointer transition-colors duration-200">
                  <Link href="/signup">Register now</Link>
                </span>
              </span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}