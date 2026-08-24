import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
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
import { listingDataContext } from '../context/ListingContext';
import videobg from "../assets/videobg.mp4"; // ✅ Import video

function ListingPage2() {
    let navigate = useNavigate()
    let { category, setCategory } = useContext(listingDataContext)

    const categories = [
        { name: "villa", label: "Villa", icon: GiFamilyHouse },
        { name: "farmhouse", label: "Farm House", icon: MdBedroomParent },
        { name: "poolhouse", label: "Pool House", icon: MdOutlinePool },
        { name: "rooms", label: "Rooms", icon: GiWoodCabin },
        { name: "flat", label: "Flat", icon: SiHomeassistantcommunitystore },
        { name: "pg", label: "PG", icon: IoBedOutline },
        { name: "cabin", label: "Cabin", icon: FaTreeCity },
        { name: "shops", label: "Shops", icon: BiBuildingHouse }
    ]

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
            <div className="relative z-20 min-h-screen pt-32 pb-16 px-4 lg:px-12 xl:px-24 flex flex-col items-center justify-center">
                
                {/* 🔙 BACK BUTTON */}
                <div className="w-14 h-14 backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 hover:from-red-600 hover:to-red-700 border border-white/30 rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 absolute top-8 left-6 lg:left-12 z-30 group"
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeft className="w-6 h-6 text-white/95 group-hover:text-white" />
                </div>

                {/* 🏠 STEP INDICATOR */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 text-white px-8 py-4 rounded-3xl shadow-2xl border border-white/40 font-bold text-xl absolute top-8 right-6 lg:right-12 z-30 hover:shadow-3xl transition-all duration-300">
                    Step 2: Set Your Home Category
                </div>

                {/* 📝 GLASS CONTAINER */}
                <div className="max-w-4xl w-full   rounded-3xl   p-10 lg:p-12 transition-all duration-500">
                    
                    {/* 🎯 TITLE */}
                    <div className="text-center mb-16">
                        <h1 className="text-2xl lg:text-4xl font-black bg-gradient-to-r from-emerald-400 via-white to-blue-400 bg-clip-text text-transparent drop-shadow-4xl mb-4">
                            Which best describes your place?
                        </h1>
                        <p className="text-xl text-white/80 drop-shadow-xl max-w-2xl mx-auto">
                            Select the category that matches your property perfectly
                        </p>
                    </div>

                    {/* 🏷️ CATEGORIES GRID */}
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                        {categories.map(({ name, label, icon: Icon }) => (
                            <div
                                key={name}
                                className={`group w-32 h-36 lg:w-36 lg:h-40 backdrop-blur-xl bg-white/15 hover:bg-white/25 border-2 border-white/20 hover:border-emerald-400/50 rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer shadow-2xl hover:shadow-3xl hover:scale-105 hover:-translate-y-2 transition-all duration-400 text-center ${
                                    category === name
                                        ? 'bg-gradient-to-br from-emerald-400/30 to-blue-500/30 border-emerald-400/50 ring-2 ring-emerald-400/40 shadow-emerald-500/40 scale-105'
                                        : ''
                                }`}
                                onClick={() => setCategory(name)}
                            >
                                <div className={`w-12 h-12 lg:w-14 lg:h-14 rounded-2xl backdrop-blur-lg flex items-center justify-center mb-4 shadow-xl transition-all duration-300 group-hover:scale-110 ${
                                    category === name
                                        ? 'bg-white/30 border-2 border-white/50 shadow-emerald-500/50'
                                        : 'bg-white/20 hover:bg-white/30 border border-white/30'
                                }`}>
                                    <Icon className={`w-6 h-6 lg:w-7 lg:h-7 text-white/95 drop-shadow-2xl ${category === name ? 'shadow-emerald-400 drop-shadow-3xl' : ''}`} />
                                </div>
                                <h3 className="text-sm lg:text-base font-bold text-white/95 drop-shadow-xl tracking-wide">
                                    {label}
                                </h3>
                            </div>
                        ))}
                    </div>

                    {/* 🚀 NEXT BUTTON */}
                    <div className="flex justify-center mt-16 pt-8 border-t border-white/20">
                        <button 
                            className={`px-12 py-5 text-lg font-bold rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-400 border border-white/30 ${
                                category
                                    ? 'backdrop-blur-2xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white hover:scale-105 active:scale-95'
                                    : 'backdrop-blur-xl bg-white/20 text-white/50 cursor-not-allowed'
                            }`}
                            onClick={() => category && navigate("/listingpage3")}
                            disabled={!category}
                        >
                            Next Step →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ListingPage2
