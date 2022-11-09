import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { ImBin2 } from 'react-icons/im';
import Cookies from 'cookies'
import { useCookies } from "react-cookie"
import { AiOutlinePlus } from 'react-icons/ai';
import AddNoteModal from '../components/AddNoteModal';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { toast, ToastContainer } from 'react-toastify';

export default function Home({ NotesData }) {
    //move all token into file .env

    let router = useRouter()
    const [modal, setModal] = useState(false)
    const [cookie, setCookie] = useCookies(['usertkn'])
    const [fetchData, setFetchData] = useState(NotesData?[...NotesData].reverse():[])

    const handleClose = () => {
        setModal(false)
        setNoteModal(false)
    }
    useEffect(() => {
        if (!cookie.usertkn) {
            router.push('/login')
        }
        localStorage.setItem('notes', JSON.stringify(fetchData))
    }, [router.query])

    const handleDelete = async (item) => {
        setFetchData(fetchData.filter((e) => {
            return e !== item
        }))
        try {
            let Data = await fetch(`http://localhost:1337/api/categories/${item.id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${cookie.usertkn}`
                }
            })
            let delData = await Data.json()
            if (delData.data.id == item.id) {
                toast.success('Note Deleted!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }

        } catch (error) {
            toast.error('Internal Server Error!', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const addNotes = async (ctgry, text) => {
        let userId = JSON.parse(localStorage.getItem('user'))
        let id;
        if (fetchData.length === 0) {
            id = 1;
        }
        else {
            id = fetchData[0].id + 1
        }
        const myNewNotes = {
            id: id,
            Category: ctgry,
            CardText: text,
            users_permissions_user: userId.id
        }
        setFetchData([...fetchData, myNewNotes].reverse());
        try {
            let Data = await fetch(`http://localhost:1337/api/categories`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer 83244d6bce024a1ad57ba0513f67e34b1345afce123d623acd66af8fa9d19d2ec47abde76f6377562850974d6a4bdf748c9032c5fe12be229a87a26c5435d36fddf6a03d90012f6ec550a9838246926154e9cbb1173d10bb632338d722fcc5c2d6d00f4d02fd12465c37973e932c28d46b43eef4553d54909ec12e3c91b6398b`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: myNewNotes })
            })
            let parsedData = await Data.json()
            if (parsedData.data.id === userId) {
                toast.success('Note Added!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error('Internal Server Error', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setNoteModal(false)
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        if (enotes.eCardText.length > 0 || enotes.eCategory.length > 0) {
            updateNotes(enotes.id, enotes.eCategory, enotes.eCardText)
        }
    }
    const updateNotes = async (id, category, text) => {
        const myNotes = fetchData
        for (let index = 0; index < myNotes.length; index++) {
            const element = myNotes[index];
            if (element.id === id) {
                myNotes[index].Category = category
                myNotes[index].CardText = text
                break;
            }
        }
        setFetchData(myNotes)
        try {
            let Data = await fetch(`http://localhost:1337/api/categories/${id}`, {
                method: 'PUT',
                headers: {
                    Authorization: `Bearer 83244d6bce024a1ad57ba0513f67e34b1345afce123d623acd66af8fa9d19d2ec47abde76f6377562850974d6a4bdf748c9032c5fe12be229a87a26c5435d36fddf6a03d90012f6ec550a9838246926154e9cbb1173d10bb632338d722fcc5c2d6d00f4d02fd12465c37973e932c28d46b43eef4553d54909ec12e3c91b6398b`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ data: { Category: category, CardText: text } })
            })
            let parsedData = await Data.json()
            if (parsedData.data.id === id) {
                toast.success('Note Updated!', {
                    position: "top-right",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            }
        } catch (error) {
            toast.error('Internal Server Error', {
                position: "top-right",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        setModal(false)
    }
    const [noteModal, setNoteModal] = useState(false)
    const [enotes, setEnotes] = useState({ id: 0, eCategory: "", eCardText: "" })
    const handleChange = (e) => {
        setEnotes({ ...enotes, [e.target.name]: e.target.value })
    }
    const handleOutClose = (e) => {
        if (e.target.id === 'container') {
            handleClose()
        }
    }
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(fetchData))
    }, [fetchData])

    return (
        <>
            <Head><title>Welcome to Flash Notes || Easy to use</title></Head>
            <div className='mx-auto'>
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
                <div className="p-5 pb-0 text-center mt-3 mb-5">
                    <AiOutlinePlus className='text-5xl border-gray-50 border rounded-full cursor-pointer mx-2 absolute left-5' onClick={() => { setNoteModal(true) }} />
                    {fetchData.length !== 0 ? <h2 className="text-4xl md:text-5xl font-semibold">
                        Recent Notes
                    </h2> : <h2 className="text-2xl mt-5 md:text-3xl font-semibold">
                        No Notes are available
                    </h2>}
                </div>
                <div className="flex flex-wrap justify-center mx-6 ">
                    <div>
                        <AddNoteModal showModal={noteModal} handleClose={handleClose} addNote={addNotes} />
                        {modal && <div className='fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center backdrop-blur-sm z-10' id="container" onClick={handleOutClose}>
                            <div className="p-4 lg:w-1/3">
                                <div className="h-full bg-white bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                                    <span className='absolute right-3 top-6 cursor-pointer text-2xl' onClick={handleClose}><AiOutlineCloseCircle className='text-red-500' /></span>
                                    <h2 className='text-black text-xl font-medium'>UpdateNote</h2>
                                    <form onSubmit={handleSubmit}>
                                        <div className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                                            <div style={{ verticalAlign: "inherit" }}>
                                                <input onChange={handleChange} value={enotes.eCategory} name="eCategory" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-11 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card' />
                                            </div>
                                            <textarea onChange={handleChange} value={enotes.eCardText} name="eCardText" className="w-full bg-gray-200 bg-opacity-80 my-1 rounded-lg border border-gray-300 focus:border-red-400 focus:bg-white focus:ring-2 focus:ring-red-200 h-32 text-base outline-none text-black py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out" placeholder='Your Card'></textarea>
                                        </div>
                                        <button type="submit" className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Update Note</button>
                                    </form>
                                </div>
                            </div>
                        </div>}
                    </div>
                    {fetchData && fetchData.map((item) => {
                        return (
                            <div key={item.id} className="p-1 lg:w-1/3">
                                <div className="h-full bg-gray-100 bg-opacity-75 px-8 py-20 rounded-lg overflow-hidden text-center relative">
                                    <h2 className="tracking-widest text-xl font-medium text-black mb-1">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>{item.Category}</font>
                                        </font>
                                    </h2>
                                    <p className="leading-relaxed mb-3 text-base text-gray-900 font-medium">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>{item.CardText}</font>
                                        </font>
                                    </p>
                                    <a className="text-red-500 inline-flex items-center ">
                                        <HiPencilAlt className='text-2xl cursor-pointer mx-2' onClick={() => { setEnotes({ id: item.id, eCategory: item.Category, eCardText: item.CardText }), setModal(true) }} /><ImBin2 className='text-lg cursor-pointer mx-2' onClick={() => { handleDelete(item) }} />
                                    </a>
                                </div>
                            </div>
                        )
                    })}
                </div >
            </div>
        </>
    )
}

export async function getServerSideProps({ context, req, res }) {
    const cookies = new Cookies(req, res)
    let token = cookies.get('usertkn')
    let NotesData=null;
    try {
        let Data = await fetch('http://localhost:1337/api/users/me?populate=*', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        let fetchData = await Data.json()
        NotesData = fetchData.categories
        
    } catch (error) {
        console.log("internal server error")
    }
    return {
        props: { NotesData },
    }
}

