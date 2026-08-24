import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeft } from "react-icons/fa";
import { userDataContext } from '../context/UserContext';
import Card from '../component/Card';
import videobg from "../assets/videobg.mp4"; // ✅ Import video

function MyListing() {
    let navigate = useNavigate()
    let { userData } = useContext(userDataContext)
    const myListings = userData?.user?.listing || []

    return (
        <div className="min-h-screen w-full relative overflow-hidden">
            {/* 🎥 FULL SCREEN VIDEO BACKGROUND */}
            <video
                className="fixed inset-0 w-full h-full object-cover z-0"
                src={videobg}// Use same video as home
                autoPlay
                loop
                muted
                playsInline
            />
            
            {/* 🖤 DARK GRADIENT OVERLAY */}
            <div className="fixed inset-0 bg-gradient-to-br from-black/70 via-black/50 to-black/80 z-10"></div>

            {/* ✨ MAIN CONTENT */}
            <div className="relative z-20 min-h-screen pt-24 pb-16 px-4 lg:px-12 xl:px-24">
                
                {/* 🔙 BACK BUTTON */}
                <div className="w-14 h-14 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center cursor-pointer transition-all duration-400 hover:scale-110 absolute top-8 left-6 lg:left-12 z-30 group"
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeft className="w-6 h-6 text-white/90 group-hover:text-white transition-colors" />
                </div>

                {/* 🏠 PAGE HEADER */}
                <div className="max-w-4xl mx-auto text-center mb-20 pt-12">
                
                        <h1 className="text-4xl lg:text-6xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-4xl mb-6 leading-tight">
                            My Listings
                        </h1>
                        <p className="text-xl lg:text-2xl text-white/90 backdrop-blur-sm bg-white/5 px-6 py-3 rounded-2xl border border-white/20 inline-block font-light drop-shadow-xl">
                            Manage your {myListings.length} properties
                        </p>
                  
                </div>

                {/* 📊 STATS BAR */}
                <div className="max-w-6xl mx-auto mb-16">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className=" bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-400 hover:scale-[1.02]">
                            <div className="text-4xl mb-3">🏠</div>
                            <h3 className="text-3xl lg:text-4xl font-black text-white drop-shadow-2xl mb-2">
                                {myListings.length}
                            </h3>
                            <p className="text-white/80 text-lg font-semibold">Total Properties</p>
                        </div>
                        
                        <div className=" bg-white/10 hover:bg-white/20 border border-white/20 rounded-3xl p-8 text-center shadow-2xl hover:shadow-3xl transition-all duration-400 hover:scale-[1.02]">
                            <div className="text-4xl mb-3">⭐</div>
                            <h3 className="text-3xl lg:text-4xl font-black text-white drop-shadow-2xl mb-2">
                                4.8
                            </h3>
                            <p className="text-white/80 text-lg font-semibold">Avg Rating</p>
                        </div>
                        
                        <div className=" bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-400/30 rounded-3xl p-8 text-center shadow-2xl hover:shadow-emerald-500/40 transition-all duration-400 hover:scale-[1.02]">
                            <div className="text-4xl mb-3">💰</div>
                            <h3 className="text-3xl lg:text-4xl font-black text-emerald-300 drop-shadow-2xl mb-2">
                                ${myListings.reduce((sum, list) => sum + parseInt(list.rent || 0), 0)}
                            </h3>
                            <p className="text-emerald-100 text-lg font-semibold">Monthly Revenue</p>
                        </div>
                    </div>
                </div>

                {/* 🏠 LISTINGS GRID */}
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-12 gap-4">
                        <h2 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white to-gray-300/50 bg-clip-text text-transparent drop-shadow-3xl">
                            Your Properties
                        </h2>
                        <button className="px-8 py-4 backdrop-blur-xl bg-gradient-to-r from-emerald-500/90 to-emerald-600/90 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-400 hover:scale-[1.05] lg:ml-auto max-w-max whitespace-nowrap" onClick={()=>navigate("/listingpage1")}>
                            + Add New Property
                        </button>
                    </div>

                    {/* 🔥 LISTINGS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
                        {myListings.length > 0 ? (
                            myListings.map(list => (
                                <Card 
                                    key={list._id} 
                                    title={list.title} 
                                    landmark={list.landmark} 
                                    city={list.city} 
                                    image1={list.image1} 
                                    image2={list.image2} 
                                    image3={list.image3} 
                                    rent={list.rent} 
                                    id={list._id} 
                                    ratings={list.ratings || 4.8}
                                    isBooked={list.isBooked}
                                    host={list.host}
                                />
                            ))
                        ) : (
                            <div className="col-span-full flex flex-col items-center justify-center py-32 text-center backdrop-blur-xl bg-white/5 border-4 border-dashed border-white/20 rounded-3xl shadow-2xl">
                                <div className="w-24 h-24 bg-white/10 rounded-3xl flex items-center justify-center mb-8 shadow-xl">
                                    <span className="text-4xl">🏠</span>
                                </div>
                                <h3 className="text-3xl lg:text-4xl font-black text-white/90 mb-4 drop-shadow-2xl">
                                    No Properties Yet
                                </h3>
                                <p className="text-xl text-white/70 mb-8 drop-shadow-lg max-w-md">
                                    Start earning by listing your first property
                                </p>
                                <button className="px-10 py-4 backdrop-blur-xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 text-white font-bold text-lg rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-105 transition-all duration-400 border border-white/30">
                                    List Your First Property
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyListing
