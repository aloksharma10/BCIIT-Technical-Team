import React from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';


function Mymodal({ showModal, handleClose }) {
    if (!showModal) {
        return null
    }
    const handleOutClose = (e) => {
        if (e.target.id === 'container') {
            handleClose()
        }
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-10' id="container" onClick={handleOutClose}>
            <div class="p-4 lg:w-1/3">
                <div class="h-full bg-white bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                    <span className='absolute right-3 top-6 cursor-pointer text-2xl' onClick={handleClose}><AiOutlineCloseCircle /></span>
                    <h2 class="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>CATEGORY</font>
                        </font>
                    </h2>
                    <p class="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>Pho booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</font>
                        </font>
                        <textarea id="message" name="message" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card'></textarea>

                    </p>
                    <div class="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                        <span class="text-gray-800 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            Last Updated:
                        </span>
                        <span class="text-gray-800 inline-flex items-center leading-none text-sm">
                            Created At:
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mymodal