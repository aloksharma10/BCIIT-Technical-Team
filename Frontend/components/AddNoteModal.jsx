import React, { useState } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai';

function AddNoteModal({ showModal, handleClose, addNote }) {
    const [ctgy, setCtgy] = useState('')
    const [text, setText] = useState('')
    const handleOnChange = (e) => {
        if (e.target.name === 'category') {
            setCtgy(e.target.value)

        }
        if (e.target.name === 'text') {
            setText(e.target.value)
        }
    }
    const handleOutClose = (e) => {
        if (e.target.id === 'container') {
            handleClose()
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (ctgy.length > 0 || text.length > 0) {
            addNote(ctgy, text)
            setCtgy('')
            setText('')
        }
    }
    if (!showModal) {
        return null
    }
    return (
        <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-10' id="container" onClick={handleOutClose}>
            <div className="p-4 lg:w-1/3">
                <div className="h-full bg-white bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                    <span className='absolute right-3 top-6 cursor-pointer text-2xl' onClick={handleClose}><AiOutlineCloseCircle  className='text-red-500'/></span>
                    <h2 className='text-black text-xl font-medium'>AddNote</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                        <div style={{ verticalAlign: "inherit" }}>
                                <input onChange={handleOnChange} value={ctgy} name="category" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-11 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Category' />
                            </div>
                            <textarea onChange={handleOnChange} value={text} id="message" name="text" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card'></textarea>
                        </div>
                        <button type="submit" className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Add Note</button>

                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddNoteModal