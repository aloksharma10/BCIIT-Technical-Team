import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AddNoteModal({ showModal, handleClose }) {
    const [ctgy, setCtgy] = useState('')
    const [text, setText] = useState('')
    const handleOnChange = (e)=>{
        if (e.target.name==='category') {
            setCtgy(e.target.value)
            
        }
        if (e.target.name==='text') {
            setText(e.target.value)
        }
    }
    const handleOutClose = (e) => {
        if (e.target.id === 'container') {
            handleClose()
        }
    }
    
    if (!showModal) {
        return null
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-10' id="container" onClick={handleOutClose}>
            <div className="p-4 lg:w-1/3">
                <div className="h-full bg-white bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                    <span className='absolute right-3 top-6 cursor-pointer text-2xl' onClick={handleClose}><AiOutlineCloseCircle /></span>
                    <p className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>{'CATEGORY'}</font>
                        </font>
                        <textarea onChange={handleOnChange} value={text} id="message" name="text" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card'></textarea>
                    </p>
                   
                </div>
            </div>
        </div>
    )
}

export default AddNoteModal