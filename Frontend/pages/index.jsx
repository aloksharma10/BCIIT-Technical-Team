import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { ImBin2 } from 'react-icons/im';
import Mymodal from '../components/Mymodal'
import Cookies from 'cookies'
import { useCookies } from "react-cookie"
import { AiOutlinePlus } from 'react-icons/ai';
import AddNoteModal from '../components/AddNoteModal';



export default function Home({ NotesData }) {

    let router = useRouter()
    const [modal, setModal] = useState(false)
    const [cookie, setCookie] = useCookies(['usertkn'])
    const [fetchData, setFetchData] = useState([...NotesData].reverse())

    console.log(fetchData)

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
        let Data = await fetch(`http://localhost:1337/api/categories/${item.id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${cookie.usertkn}`
            }
        })
        let delData = await Data.json()
        console.log(delData)
        if (delData.data.id == item.id) {
            console.log("hogya")
        }
    }

    const addNotes = (ctgry, text) => {
        console.log("adding")
        let userId = localStorage.getItem('user')
        console.log(userId.id)
        // const myNewNotes = {
        //     Category: ctgry,
        //     CardText: text,
        //     users_permissions_user: userId
        // }
        // setTodos([...NotesData, myNewNotes]);
    }
    const [noteModal, setNoteModal] = useState(false)
    return (
        <>
            <Head><title>Welcome to Flash Notes || Easy to use</title></Head>
            <div className='mx-auto'>
                <div className="p-5 pb-0 text-center">
                    {fetchData.length !== 0 ? <h2 className="text-4xl md:text-5xl font-semibold">
                        Recent Notes
                    </h2> : <h2 className="text-2xl mt-5 md:text-3xl font-semibold">
                        No Notes are available
                    </h2>}
                </div>
                <div className="flex flex-wrap justify-center mx-6 ">
                    <div>
                        <AiOutlinePlus className='text-2xl cursor-pointer mx-2' onClick={() => { setNoteModal(true) }} />
                    </div>
                    {fetchData && fetchData.map((item) => {
                        return (
                            <div key={item.id} className="p-4 lg:w-1/3">
                                <AddNoteModal showModal={noteModal} handleClose={handleClose} addNote={addNotes} />
                                <Mymodal showModal={modal} handleClose={handleClose} />
                                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>CATEGORY</font>
                                        </font>
                                    </h2>
                                    <p className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>{item.CardText}</font>
                                        </font>
                                    </p>
                                    <a className="text-red-500 inline-flex items-center ">
                                        <HiPencilAlt className='text-2xl cursor-pointer mx-2' onClick={() => { setModal(true) }} /><ImBin2 className='text-lg cursor-pointer mx-2' onClick={() => { handleDelete(item) }} />
                                    </a>
                                    <div className="text-center mt-2 leading-none flex justify-center absolute bottom-0 left-0 w-full py-4">
                                        <p className="text-gray-800 mr-3 inline-flex items-center leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                                            Last Updated:
                                        </p>
                                        <p className="text-gray-800 inline-flex items-center leading-none text-sm">
                                            Created At:
                                        </p>
                                    </div>
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
    let Data = await fetch('http://localhost:1337/api/users/me?populate=*', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    let fetchData = await Data.json()
    let NotesData = fetchData.categories
    console.log(NotesData)
    return {
        props: { NotesData },
    }
}

