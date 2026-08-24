import React, { useContext } from 'react'
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { listingDataContext } from '../context/ListingContext';
import videobg from "../assets/videobg.mp4"; // ✅ Import video

function ListingPage1() {
    let navigate = useNavigate()
    let { title, setTitle, description, setDescription, frontEndImage1, setfrontEndImage1, 
          frontEndImage2, setfrontEndImage2, frontEndImage3, setfrontEndImage3,
          backendImage1, setbackendImage1, backendImage2, setbackendImage2, backendImage3, setbackendImage3,
          rent, setRent, city, setCity, landmark, setLandmark, category, setCategory } = useContext(listingDataContext)

    const handleImage1 = (e) => {
        let file = e.target.files[0]
        setbackendImage1(file)
        setfrontEndImage1(URL.createObjectURL(file))
    }
    const handleImage2 = (e) => {
        let file = e.target.files[0]
        setbackendImage2(file)
        setfrontEndImage2(URL.createObjectURL(file))
    }
    const handleImage3 = (e) => {
        let file = e.target.files[0]
        setbackendImage3(file)
        setfrontEndImage3(URL.createObjectURL(file))
    }

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

            {/* ✨ MAIN FORM CONTAINER */}
            <div className="relative z-20 min-h-screen pt-32 pb-16 px-4 lg:px-12 xl:px-24 flex items-start justify-center">
                
                {/* 🔙 BACK BUTTON */}
                <div className="w-14 h-14 backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 hover:from-red-600 hover:to-red-700 border border-white/30 rounded-2xl shadow-2xl hover:shadow-3xl flex items-center justify-center cursor-pointer transition-all duration-300 hover:scale-110 absolute top-8 left-6 lg:left-12 z-30 group"
                    onClick={() => navigate("/")}
                >
                    <FaArrowLeft className="w-6 h-6 text-white/95 group-hover:text-white" />
                </div>

                {/* 🏠 STEP INDICATOR */}
                <div className="backdrop-blur-xl bg-gradient-to-r from-red-500/95 to-red-600/95 text-white px-8 py-4 rounded-3xl shadow-2xl border border-white/40 font-bold text-xl absolute top-8 right-6 lg:right-12 z-30 hover:shadow-3xl transition-all duration-300">
                    Step 1: Setup Your Home
                </div>

                {/* 📝 GLASS FORM */}
                <form 
                    className="max-w-2xl w-full    rounded-3xl over:shadow-3xl p-10 lg:p-12 transition-all duration-500"
                    onSubmit={(e) => {
                        e.preventDefault()
                        navigate("/listingpage2")
                    }}
                >
                    <div className="space-y-10">
                        
                        {/* 🏷️ TITLE */}
                        <div className="space-y-4">
                            <label className="text-2xl font-bold text-white/95 drop-shadow-xl block">Property Title</label>
                            <input 
                                type="text" 
                                className="w-full h-16 px-6 text-xl backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-3xl text-white/90 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:shadow-emerald-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 py-4" 
                                placeholder="Luxury 2BHK Villa or Best Title"
                                required 
                                onChange={(e) => setTitle(e.target.value)} 
                                value={title}
                            />
                        </div>

                        {/* 📄 DESCRIPTION */}
                        <div className="space-y-4">
                            <label className="text-2xl font-bold text-white/95 drop-shadow-xl block">Description</label>
                            <textarea 
                                className="w-full h-36 px-6 py-5 text-xl backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-3xl text-white/90 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:shadow-emerald-500/30 resize-vertical shadow-xl hover:shadow-2xl transition-all duration-300" 
                                placeholder="Describe your amazing property..."
                                required 
                                onChange={(e) => setDescription(e.target.value)} 
                                value={description}
                            />
                        </div>

                        {/* 🖼️ IMAGE UPLOAD SECTION */}
                        <div className="space-y-6">
                            <label className="text-2xl font-bold text-white/95 drop-shadow-xl block">Property Images</label>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                                {/* IMAGE 1 */}
                                <div className="space-y-3">
                                    <label className="text-lg font-semibold text-white/90 drop-shadow-lg block">Image 1 <span className="text-emerald-400">*</span></label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="w-full h-14 px-4 text-lg backdrop-blur-lg bg-white/15 hover:bg-white/25 border-2 border-dashed border-white/40 rounded-2xl text-white/80 cursor-pointer hover:border-emerald-400/50 hover:shadow-emerald-500/30 transition-all duration-300 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/90 file:text-white file:backdrop-blur-sm file:hover:bg-emerald-600 hover:shadow-xl shadow-lg block cursor-pointer" 
                                        required 
                                        onChange={handleImage1}
                                    />
                                </div>

                                {/* IMAGE 2 */}
                                <div className="space-y-3">
                                    <label className="text-lg font-semibold text-white/90 drop-shadow-lg block">Image 2</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="w-full h-14 px-4 text-lg backdrop-blur-lg bg-white/15 hover:bg-white/25 border-2 border-dashed border-white/40 rounded-2xl text-white/80 cursor-pointer hover:border-emerald-400/50 hover:shadow-emerald-500/30 transition-all duration-300 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/90 file:text-white file:backdrop-blur-sm file:hover:bg-emerald-600 hover:shadow-xl shadow-lg block cursor-pointer" 
                                        onChange={handleImage2}
                                    />
                                </div>

                                {/* IMAGE 3 */}
                                <div className="space-y-3">
                                    <label className="text-lg font-semibold text-white/90 drop-shadow-lg block">Image 3</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        className="w-full h-14 px-4 text-lg backdrop-blur-lg bg-white/15 hover:bg-white/25 border-2 border-dashed border-white/40 rounded-2xl text-white/80 cursor-pointer hover:border-emerald-400/50 hover:shadow-emerald-500/30 transition-all duration-300 file:mr-4 file:py-3 file:px-4 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-emerald-500/90 file:text-white file:backdrop-blur-sm file:hover:bg-emerald-600 hover:shadow-xl shadow-lg block cursor-pointer" 
                                        onChange={handleImage3}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 💰 PRICE & LOCATION */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="space-y-4">
                                <label className="text-2xl font-bold text-white/95 drop-shadow-xl block">Rent (₹/day)</label>
                                <input 
                                    type="number" 
                                    className="w-full h-16 px-6 text-xl backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-3xl text-white/90 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:shadow-emerald-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 py-4" 
                                    placeholder="5000"
                                    required 
                                    onChange={(e) => setRent(e.target.value)} 
                                    value={rent}
                                />
                            </div>
                            <div className="space-y-4">
                                <label className="text-2xl font-bold text-white/95 drop-shadow-xl block">City</label>
                                <input 
                                    type="text" 
                                    className="w-full h-16 px-6 text-xl backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-3xl text-white/90 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:shadow-emerald-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 py-4" 
                                    placeholder="Mumbai, India"
                                    required 
                                    onChange={(e) => setCity(e.target.value)} 
                                    value={city}
                                />
                            </div>
                        </div>

                        {/* 📍 LANDMARK */}
                        <div className="space-y-4">
                            <label className="text-2xl font-bold text-white/95 drop-shadow-xl block">Landmark</label>
                            <input 
                                type="text" 
                                className="w-full h-16 px-6 text-xl backdrop-blur-xl bg-white/20 hover:bg-white/30 border border-white/30 rounded-3xl text-white/90 placeholder-white/60 focus:outline-none focus:border-emerald-400/50 focus:shadow-emerald-500/30 shadow-xl hover:shadow-2xl transition-all duration-300 py-4" 
                                placeholder="Near Juhu Beach"
                                required 
                                onChange={(e) => setLandmark(e.target.value)} 
                                value={landmark}
                            />
                        </div>

                        {/* 🚀 NEXT BUTTON */}
                        <button 
                            type="submit"
                            className="w-full h-20 backdrop-blur-2xl bg-gradient-to-r from-emerald-500/95 to-emerald-600/95 hover:from-emerald-600 hover:to-emerald-700 text-white font-bold text-2xl rounded-3xl shadow-2xl hover:shadow-3xl hover:scale-[1.02] transition-all duration-400 border border-white/40 active:scale-[0.98] mt-4"
                        >
                            Next Step →
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default ListingPage1
