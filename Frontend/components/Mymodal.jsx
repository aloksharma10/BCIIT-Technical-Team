import React, { useEffect, useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

function Mymodal({ showModal, handleClose, enote, updateNotes }) {
    const [text, setText] = useState(enote.CardText)
    const [category, setCategory] = useState(enote.Category)
    if (!showModal) {
        return null
    }
    const handleChange = (e) => {
        if (e.target.name === 'text') {
            setText(e.target.value)
        }
        if (e.target.name === 'category') {
            setCategory(e.target.value)
        }
        console.log(enote.id)
    }


    const handleOutClose = (e) => {
        if (e.target.id === 'container') {
            // updateNotes()
            handleClose()
        }
        // updateNotes()
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-10' id="container" onClick={handleOutClose}>
            <div className="p-4 lg:w-1/3">
                <div className="h-full bg-white bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                    <span className='absolute right-3 top-6 cursor-pointer text-2xl' onClick={handleClose}><AiOutlineCloseCircle /></span>
                    <form>
                        <div className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                            <div style={{ verticalAlign: "inherit" }}>
                                <input onChange={handleChange} value={category} name="category" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-11 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card' />
                            </div>
                            <textarea onChange={handleChange} value={text} name="text" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card'></textarea>
                        </div>
                        <button type="submit" className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Note</button>
                    </form>
                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                        <span className="text-gray-800 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                            Last Updated:
                        </span>
                        <span className="text-gray-800 inline-flex items-center leading-none text-sm">
                            Created At:
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Mymodal