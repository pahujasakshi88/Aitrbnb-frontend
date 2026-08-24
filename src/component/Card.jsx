import React, { useContext } from 'react'
import { userDataContext } from '../context/UserContext'
import { listingDataContext } from '../context/ListingContext'
import { useNavigate } from 'react-router-dom'
import { FaStar } from "react-icons/fa";

function Card({ title, landmark, image1, image2, image3, rent, city, id, ratings, isBooked, host }) {
  let { userData } = useContext(userDataContext)
  let { handleViewCard } = useContext(listingDataContext)
  let navigate = useNavigate()

  const handleClick = () => {
    if (userData) {
      handleViewCard(id)
    } else {
      navigate("/login")
    }
  }

  // ✅ FIX: Extract host name safely
  const hostName = host?.name || host || 'Unknown Host';

  return (
    <div 
      className="w-[280px] max-w-[85vw] h-[380px]   rounded-2xl p-2 shadow-2xl cursor-pointer transition-all duration-500 hover:scale-105 hover:-translate-y-1 mx-auto group relative overflow-hidden"
      onClick={handleClick}
    >
      {/* 🖼️ CLEAR SHARP IMAGE */}
      <div className="w-full h-[68%] rounded-xl overflow-hidden relative bg-gradient-to-t from-black/20 to-transparent">
        <img 
          src={image1} 
          alt={title}
          className="w-full h-full object-cover brightness-110 contrast-110 hover:brightness-115 transition-all duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* 🏷️ PRICE BADGE */}
        <div className="absolute top-3 right-3 backdrop-blur-md bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-2xl border border-white/30">
          ${rent}
          <span className="text-xs font-normal ml-1">/night</span>
        </div>

        {/* 🚫 BOOKED STATUS */}
        {isBooked && (
          <div className="absolute top-3 left-3 backdrop-blur-md bg-red-500/90 text-white px-3 py-2 rounded-xl text-sm font-bold shadow-2xl border border-white/20">
            BOOKED
          </div>
        )}
      </div>

      {/* 📝 CONTENT */}
      <div className="w-full h-[32%] px-4 py-3 flex flex-col justify-between text-white">
        {/* 📍 LOCATION + ⭐ RATING */}
        <div className="flex items-center justify-between text-sm">
          <span className="backdrop-blur-sm bg-white/10 px-2 py-1 rounded-lg border border-white/20 font-medium truncate max-w-[70%]">
            {landmark}, {city}
          </span>
          <div className="flex items-center gap-1 backdrop-blur-sm bg-white/10 px-2 py-1 rounded-lg border border-white/20">
            <FaStar className="text-yellow-400 text-xs" />
            <span className="font-semibold text-xs">{ratings}</span>
          </div>
        </div>

        {/* 🏠 TITLE */}
        <h3 className="text-lg font-bold bg-gradient-to-r from-white to-gray-200/70 bg-clip-text text-transparent drop-shadow-lg line-clamp-2 leading-tight">
          {title}
        </h3>

        {/* 💎 HOST - FIXED! */}
        {host && (
          <div className="flex items-center gap-2 text-xs text-white/80 backdrop-blur-sm bg-white/5 px-2 py-1 rounded-full border border-white/10">
            <span>👤</span>
            <span className="font-medium truncate">{hostName}</span> {/* ✅ SAFE! */}
          </div>
        )}
      </div>

      {/* ✨ HOVER GLOW */}
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-400/20 via-transparent to-blue-400/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10"></div>
    </div>
  )
}

export default Card
