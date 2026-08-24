import React, { useContext, useState } from 'react'
import logo from "../assets/logo.png"
import { IoSearch } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";
import { CgProfile } from "react-icons/cg";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";
import { useNavigate } from 'react-router-dom';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { userDataContext } from '../context/UserContext';
import { listingDataContext } from '../context/ListingContext';

const Nav = () => {
  const [showPopup, setShowPopup] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // ✅ NEW SEARCH STATE
  const { serverUrl } = useContext(authDataContext)
  const { userData, setUserData } = useContext(userDataContext)
  const [cate, setCate] = useState()
  const { listingData, setnewListData, newListData } = useContext(listingDataContext)

  let navigate = useNavigate()

  // ✅ NEW SEARCH HANDLER
  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (query.trim() === '') {
      setnewListData(listingData)
    } else {
      const filtered = listingData.filter(listing =>
        listing.title?.toLowerCase().includes(query.toLowerCase()) ||
        listing.city?.toLowerCase().includes(query.toLowerCase()) ||
        listing.landmark?.toLowerCase().includes(query.toLowerCase())
      )
      setnewListData(filtered)
    }
  }

  const handleLogout = async () => {
    try {
      await axios.post(serverUrl + "/api/auth/logout", {}, { withCredentials: true })
      setUserData(null)
      setShowPopup(false)
    } catch (err) {
      console.log(err);
    }
  }

  const handleCategory = (category) => {
    setCate(category)
    if (category == "trending") {
      setnewListData(listingData)
    } else {
      setnewListData(listingData.filter((list) => list.category == category))
    }
  }

  const categories = [
    { name: "trending", icon: MdWhatshot, label: "Trending" },
    { name: "villa", icon: GiFamilyHouse, label: "Villa" },
    { name: "farmhouse", icon: MdBedroomParent, label: "Farm House" },
    { name: "poolhouse", icon: MdOutlinePool, label: "Pool House" },
    { name: "rooms", icon: GiWoodCabin, label: "Rooms" },
    { name: "flat", icon: SiHomeassistantcommunitystore, label: "Flat" },
    { name: "pg", icon: IoBedOutline, label: "PG" },
    { name: "cabin", icon: FaTreeCity, label: "Cabins" },
    { name: "shops", icon: BiBuildingHouse, label: "Shops" },
  ]

  return (
    <>
      {/* 🌟 ULTRA-GLASS TOP NAVBAR */}
      <div className="fixed top-0 left-0 right-0 z-[100]  ">
        <div className="w-full h-[80px] flex items-center justify-between px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
          
          {/* ✨ LOGO */}
          <div className="flex-shrink-0 backdrop-blur-sm bg-white/10 border border-white/20 rounded-2xl p-2 shadow-2xl">
            <img src={logo} alt="Logo" className="w-[130px] h-[40px] object-contain drop-shadow-2xl" />
          </div>

          {/* 🔍 FIXED SEARCH BAR - WORKING */}
          <div className="w-full max-w-md lg:w-[40%] relative hidden lg:block">
            <div className="relative   rounded-3xl p-1 shadow-2xl">
              <input 
                type="text" 
                value={searchQuery}  // ✅ CONTROLLED
                onChange={handleSearch}  // ✅ WORKING
                className="w-full px-6 py-4 bg-transparent border-0 rounded-2xl text-lg text-white  focus:outline-none focus:placeholder-white/90 transition-all duration-500 pl-0"
                placeholder="Search destinations..."
              />
              <button 
                onClick={() => { if(searchQuery) setSearchQuery(''); setnewListData(listingData); }}  // ✅ CLEAR
                className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-2xl shadow-2xl transition-all duration-300 hover:scale-110"
              >
                <IoSearch className="w-5 h-5 text-white/90" />
              </button>
            </div>
          </div>

          {/* 👤 PROFILE */}
          <div className="flex items-center gap-3">
            <div className="px-6 py-3 backdrop-blur-sm bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl text-white/90 font-semibold hover:shadow-2xl hover:scale-[1.02] cursor-pointer transition-all duration-300 hidden xl:block"
              onClick={() => navigate("/listingpage1")}
            >
              List your home
            </div>
            
            <button 
              className="w-14 h-14 backdrop-blur-xl bg-white/10 hover:bg-white/20 border-2 border-white/20 rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-110 flex items-center justify-center transition-all duration-400 group"
              onClick={() => setShowPopup(prev => !prev)}
            >
              {userData === null ? (
                <CgProfile className="w-6 h-6 text-white/80 group-hover:text-white transition-colors" />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-emerald-400/90 to-blue-500/90 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white font-bold shadow-2xl border border-white/30 group-hover:scale-110 transition-all duration-300">
                  {userData?.user?.name?.slice(0, 1).toUpperCase()}
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE SEARCH - WORKING */}
      <div className="fixed top-[80px] left-0 right-0 z-[90] lg:hidden backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-2xl">
        <div className="w-full max-w-lg mx-auto px-6 py-4">
         <div className="relative backdrop-blur-lg bg-white/5 border border-white/20 rounded-3xl p-1 shadow-2xl">
            <input 
              type="text" 
              value={searchQuery}  // ✅ CONTROLLED
              onChange={handleSearch}  // ✅ WORKING
              className="w-full px-6 py-4 bg-transparent border-0 rounded-2xl text-lg text-white placeholder-white/70 backdrop-blur-sm focus:outline-none"
              placeholder="Search destinations..."
            />
            <button 
              onClick={() => { if(searchQuery) setSearchQuery(''); setnewListData(listingData); }}  // ✅ CLEAR
              className="absolute right-3 top-1/2 -translate-y-1/2 p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/20 rounded-2xl shadow-xl transition-all duration-300"
            >
              <IoSearch className="w-5 h-5 text-white/90" />
            </button>
          </div>
        </div>
      </div>

      {/* 🏷️ FIXED CATEGORIES - FULL TEXT VISIBLE */}
      <div className="top-[160px] lg:top-[80px] left-0 right-0 z-[80] overflow-hidden">
        <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3 py-6 min-h-[110px] overflow-x-auto scrollbar-hide">
            {categories.map(({ name, icon: Icon, label }) => (
              <div
                key={name}
                className={`flex flex-col items-center gap-2 p-4 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-[1.02] flex-shrink-0 w-[82px] h-[95px] ${
                  cate === name 
                    ? 'bg-gradient-to-br from-emerald-400/20 to-blue-500/20 shadow-emerald-500/25 border-white/30 ring-2 ring-emerald-400/30 text-white' 
                    : 'text-white/85 hover:text-white'
                }`}
                onClick={() => handleCategory(name)}
              >
                <div className={`w-11 h-11 rounded-2xl backdrop-blur-lg flex items-center justify-center transition-all duration-200 hover:scale-105 flex-shrink-0 ${
                  cate === name 
                    ? 'bg-white/25 border-2 border-white/40 shadow-xl shadow-emerald-500/40' 
                    : 'bg-white/10 hover:bg-white/20 border border-white/25'
                }`}>
                  <Icon className={`w-6 h-6 ${cate === name ? 'drop-shadow-xl shadow-emerald-400' : 'drop-shadow-md'}`} />
                </div>
                <span className="text-xs font-semibold tracking-tight text-center text-white/95 drop-shadow-md leading-[1.2] px-0.5 flex-shrink-0 mt-1">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 🍔 MOBILE MENU - UNCHANGED */}
      {showPopup && (
        <div className="fixed inset-0 z-[999] flex items-end justify-end p-6">
          <div className="fixed inset-0 bg-black/70 z-[998]"></div>
          
          <div className="w-full max-w-md h-[80vh] bg-white/10 backdrop-blur-xl rounded-3xl border border-white/30 shadow-2xl overflow-hidden ml-4 relative z-[999]">
            
            <div className="p-4 border-b border-white/20 bg-white/20 backdrop-blur-lg sticky top-0">
              <div className="flex items-center justify-between">
                <h2 className="text-3xl font-black bg-gradient-to-r from-white via-white/80 to-white/50 bg-clip-text text-transparent drop-shadow-2xl">
                  Menu
                </h2>
                <button 
                  onClick={() => setShowPopup(false)}
                  className="p-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
                >
                  <GiHamburgerMenu className="w-7 h-7 text-white/95" />
                </button>
              </div>
              
              {userData && (
                <div className="mt-8 p-3 bg-white/20 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-md">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400/95 to-blue-500/95 rounded-2xl flex items-center justify-center shadow-2xl border border-white/40">
                      <span className="text-white font-black text-xl drop-shadow-lg">
                        {userData?.user?.name?.slice(0, 1).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-white min-w-0">
                      <p className="text-xl font-bold drop-shadow-xl truncate">{userData?.user?.name}</p>
                      <p className="text-lg opacity-90 drop-shadow-lg truncate">{userData?.user?.email}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-8 space-y-3 overflow-y-auto h-[calc(100%-220px)]">
              {!userData && (
                <button 
                  className="w-full p-6 bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 border border-white/40"
                  onClick={() => {
                    navigate("/login");
                    setShowPopup(false);
                  }}
                >
                  Sign In
                </button>
              )}
              
              {userData && (
                <>
                  <button 
                    className="w-full p-6 bg-gradient-to-r from-red-500/95 to-red-600/95 hover:from-red-600 hover:to-red-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 border border-white/40"
                    onClick={handleLogout}
                  >
                    Sign Out
                  </button>
                  
                  <button 
                    className="w-full p-6 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
                    onClick={() => {
                      navigate("/mylisting");
                      setShowPopup(false);
                    }}
                  >
                    My Listings
                  </button>
                  
                  <button 
                    className="w-full p-6 bg-white/20 hover:bg-white/30 border border-white/30 text-white font-semibold rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-200"
                    onClick={() => {
                      navigate("/mybooking");
                      setShowPopup(false);
                    }}
                  >
                    My Bookings
                  </button>
                  
                  <button 
                    className="w-full p-6 bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-200 border border-white/40"
                    onClick={() => {
                      navigate("/listingpage1");
                      setShowPopup(false);
                    }}
                  >
                    List your home
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </>
  )
}

export default Nav
