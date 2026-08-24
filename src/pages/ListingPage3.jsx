import React, { useContext } from 'react';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../context/ListingContext';
import videobg from "../assets/videobg.mp4"; // ✅ Import video

function ListingPage3() {
    let navigate = useNavigate()
    let { title, description, frontEndImage1, frontEndImage2, frontEndImage3,
          rent, city, landmark, category, handleAddListing, adding } = useContext(listingDataContext)

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* 🎥 FULL SCREEN VIDEO */}
            <video
                className="fixed inset-0 w-full h-full object-cover z-0"
                src={videobg}
                autoPlay
                loop
                muted
                playsInline
            />
            
            {/* 🖤 GRADIENT OVERLAY */}
            <div className="fixed inset-0 bg-gradient-to-br from-black/75 via-black/60 to-black/85 z-10"></div>

            {/* ✨ MAIN CONTENT */}
            <div className="relative z-20 min-h-screen pt-32 pb-16 px-4 lg:px-12 xl:px-24 flex flex-col items-center justify-center space-y-12">
                
                {/* 🔙 BACK BUTTON */}
                <div className="w-14 h-14 backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 hover:from-red-600 hover:to-red-700 border border-white/30 rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 absolute top-8 left-6 lg:left-12 z-30 group"
                    onClick={() => navigate("/listingpage2")}
                >
                    <FaArrowLeft className="w-6 h-6 text-white/95 group-hover:text-white" />
                </div>

                {/* 🏠 STEP INDICATOR */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 text-white px-8 py-4 rounded-3xl shadow-2xl border border-white/40 font-bold text-xl absolute top-8 right-6 lg:right-12 z-30 hover:shadow-3xl transition-all duration-300">
                    Step 3: Review & Publish
                </div>

                {/* 📝 GLASS PREVIEW CONTAINER */}
                <div className="max-w-5xl w-full b    rounded-3xl   p-10 lg:p-12 transition-all duration-500 overflow-hidden">
                    
                    {/* 🏢 LOCATION HEADER */}
                    <div className="text-center mb-12">
                        <h1 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-4xl mb-4 leading-tight">
                            {landmark && city ? `${landmark}, ${city}` : "Your Property"}
                        </h1>
                        <div className="flex items-center justify-center gap-2 text-xl text-white/80 drop-shadow-xl mb-4">
                            <span className="text-emerald-400">📍</span>
                            <span>{landmark || "Premium Location"}</span>
                        </div>
                    </div>

                    {/* 🖼️ IMAGE GALLERY */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                        {/* MAIN IMAGE */}
                        <div className="relative group">
                            <div className="backdrop-blur-xl bg-white/10 border-2 border-white/20 rounded-3xl overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500">
                                <img 
                                    src={frontEndImage1} 
                                    alt={title}
                                    className="w-full h-96 lg:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700 brightness-110"
                                    onError={(e) => {
                                        e.target.src = "/assets/placeholder-home.jpg";
                                    }}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            </div>
                            <div className="absolute -top-4 -right-4 w-20 h-20 backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 border-4 border-white/50 rounded-3xl flex items-center justify-center shadow-2xl text-white font-bold text-lg z-10">
                                Featured
                            </div>
                        </div>

                        {/* THUMBNAILS */}
                        <div className="space-y-4">
                            <div className="relative group cursor-pointer">
                                <div className="backdrop-blur-lg bg-white/10 border-2 border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-400 h-44">
                                    <img 
                                        src={frontEndImage2} 
                                        alt="Secondary"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-110"
                                        onError={(e) => {
                                            e.target.src = "/assets/placeholder-home.jpg";
                                        }}
                                    />
                                </div>
                                <div className="absolute -bottom-3 left-4 px-3 py-1 backdrop-blur-md bg-white/20 text-white text-xs font-bold rounded-xl border border-white/30">
                                    Kitchen
                                </div>
                            </div>
                            <div className="relative group cursor-pointer">
                                <div className="backdrop-blur-lg bg-white/10 border-2 border-white/20 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-400 h-44">
                                    <img 
                                        src={frontEndImage3} 
                                        alt="Secondary"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 brightness-110"
                                        onError={(e) => {
                                            e.target.src = "/assets/placeholder-home.jpg";
                                        }}
                                    />
                                </div>
                                <div className="absolute -bottom-3 right-4 px-3 py-1 backdrop-blur-md bg-white/20 text-white text-xs font-bold rounded-xl border border-white/30">
                                    Bedroom
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 📋 PROPERTY DETAILS */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                        {/* TITLE & CATEGORY */}
                        <div className="lg:col-span-2 space-y-3">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="px-4 py-2 backdrop-blur-xl bg-gradient-to-r from-emerald-500/90 to-blue-500/90 text-white font-bold rounded-2xl shadow-2xl border border-white/30">
                                    {category ? category.toUpperCase() : "PREMIUM"}
                                </div>
                                <div className="px-4 py-2 backdrop-blur-sm bg-white/20 text-white font-bold rounded-xl shadow-xl border border-white/20">
                                    {title || "Luxury Property"}
                                </div>
                            </div>
                            <p className="text-xl lg:text-2xl text-white/90 backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-2xl leading-relaxed drop-shadow-xl">
                                {description || "Experience luxury living at its finest..."}
                            </p>
                        </div>

                        {/* 💰 PRICE */}
                   {/* 💰 PRICE - FIXED NO OVERFLOW */}
<div className="backdrop-blur-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border border-emerald-400/40 rounded-3xl p-6 lg:p-8 shadow-2xl hover:shadow-emerald-500/40 transition-all duration-400 text-center h-32 lg:h-40 flex flex-col justify-center">
    <div className="text-3xl lg:text-4xl xl:text-5xl font-black text-emerald-400 drop-shadow-4xl mb-1 lg:mb-2 leading-tight">
        ₹{rent || "0"}
    </div>
    <div className="text-lg lg:text-xl text-emerald-100 font-bold drop-shadow-xl">PER DAY</div>
    <div className="text-xs lg:text-sm text-emerald-200/80 mt-1">Premium Pricing</div>
</div>

                    </div>

                    {/* 🚀 PUBLISH BUTTON */}
                    <div className="flex justify-center pt-8 border-t border-white/20">
                        <button 
                            className={`px-16 py-6 text-xl font-black rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-400 border-2 border-white/30 ${
                                adding
                                    ? 'backdrop-blur-xl bg-white/20 text-white/50 cursor-not-allowed'
                                    : 'backdrop-blur-2xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-95'
                            }`}
                            onClick={handleAddListing}
                            disabled={adding}
                        >
                            {adding ? (
                                <>
                                    <span className="animate-spin mr-2">⏳</span>
                                    Publishing...
                                </>
                            ) : (
                                "🚀 Publish Listing"
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage3
