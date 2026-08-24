import React, { useContext, useState } from "react";
import { IoEye } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { authDataContext } from "../context/AuthContext";
import axios from "axios";
import { userDataContext } from "../context/UserContext";

const Login = () => {
  let [show, setShow] = useState(false)
  let navigate = useNavigate()
  let { userData, setUserData } = useContext(userDataContext)
  let { serverUrl, loading, setLoading } = useContext(authDataContext)
  let [email, setEmail] = useState("")
  let [password, setPassword] = useState("")

  const handleLoginUp = async (e) => {
    setLoading(true)
    e.preventDefault()
    try {
      let result = await axios.post(serverUrl + "/api/auth/login", {
        email, password
      }, { withCredentials: true })
      setUserData(result.data)
      navigate("/")
      console.log(result);
      setLoading(false)
    } catch (err) {
      console.log("error", err);
      setLoading(false)
    }
  }

  return (
    <div className="w-[100vw] h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-emerald-900 via-blue-900 to-black">
      
      {/* 🎥 FULLSCREEN VIDEO BACKGROUND */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0"
        src="/videobg.mp4"
        autoPlay
        loop
        muted
        playsInline
      />
      
      {/* 🖤 GRADIENT OVERLAY */}
      <div className="fixed inset-0 bg-gradient-to-br from-black/80 via-emerald-900/60 to-blue-900/80 z-10"></div>

      {/* 🔙 BACK BUTTON - GLASS */}
      <div className="w-14 h-14 backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 hover:from-red-600 hover:to-red-700 border border-white/30 rounded-3xl shadow-2xl hover:shadow-3xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 absolute top-10 left-6 z-30 group"
        onClick={() => navigate("/")}
      >
        <FaArrowLeft className="w-6 h-6 text-white group-hover:text-white/95" />
      </div>

      {/* ✨ GLASS LOGIN FORM */}
      <form 
        onSubmit={handleLoginUp} 
        className="max-w-md w-[90%] backdrop-blur-3xl bg-white/10 hover:bg-white/15 border border-white/25 rounded-4xl shadow-2xl hover:shadow-3xl p-10 md:p-12 transition-all duration-500 relative z-20"
      >
        {/* 🎯 LOGO HEADER */}
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-4xl mb-4 leading-tight">
            Welcome Back
          </h1>
          <p className="text-xl text-white/90 backdrop-blur-md bg-white/10 px-6 py-3 rounded-3xl border border-white/20 font-light drop-shadow-xl">
            Sign in to your account
          </p>
        </div>

        {/* 📧 EMAIL FIELD */}
        <div className="w-full flex flex-col gap-3 mb-8">
          <label htmlFor="email" className="text-lg font-semibold text-white/95 drop-shadow-xl tracking-wide">
            Email Address
          </label>
          <div className="relative">
            <input 
              type="email"
              id="email"
              className="w-full h-14 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl text-lg text-white/95 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-400 shadow-xl hover:shadow-2xl"
              placeholder="Enter your email"
              required 
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
            />
          </div>
        </div>

        {/* 🔐 PASSWORD FIELD */}
        <div className="w-full flex flex-col gap-3 mb-10">
          <label htmlFor="password" className="text-lg font-semibold text-white/95 drop-shadow-xl tracking-wide">
            Password
          </label>
          <div className="relative">
            <input 
              type={show ? "text" : "password"} 
              id="password"
              className="w-full h-14 px-6 bg-white/20 hover:bg-white/30 backdrop-blur-xl border border-white/30 rounded-3xl text-lg text-white/95 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:ring-2 focus:ring-emerald-400/30 transition-all duration-400 shadow-xl hover:shadow-2xl pr-14"
              placeholder="Enter your password"
              required 
              onChange={(e) => setPassword(e.target.value)} 
              value={password}
            />
            {!show && (
              <IoEye 
                className="w-6 h-6 cursor-pointer text-white/80 absolute right-5 top-1/2 -translate-y-1/2 hover:text-white transition-colors"
                onClick={() => setShow(prev => !prev)}
              />
            )}
            {show && (
              <FaRegEyeSlash 
                className="w-6 h-6 cursor-pointer text-white/80 absolute right-5 top-1/2 -translate-y-1/2 hover:text-white transition-colors"
                onClick={() => setShow(prev => !prev)}
              />
            )}
          </div>
        </div>

        {/* 🚀 LOGIN BUTTON */}
        <button 
          type="submit"
          disabled={loading}
          className={`w-full h-14 text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-400 border-2 border-white/30 flex items-center justify-center ${
            loading
              ? 'backdrop-blur-xl bg-white/20 text-white/60 cursor-not-allowed'
              : 'backdrop-blur-2xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {loading ? (
            <>
              <span className="animate-spin mr-3 w-6 h-6 border-2 border-white/30 border-t-white rounded-full"></span>
              Signing In...
            </>
          ) : (
            "Sign In"
          )}
        </button>

        {/* ➡️ SIGNUP LINK */}
        <div className="mt-8 pt-8 border-t border-white/20 text-center">
          <p className="text-lg text-white/80">
            Don't have an account?{' '}
            <span 
              className="text-emerald-400 hover:text-emerald-300 font-semibold cursor-pointer transition-colors drop-shadow-xl hover:underline"
              onClick={() => navigate("/signup")}
            >
              Create Account
            </span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
