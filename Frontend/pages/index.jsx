import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
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

    const addNotes = async (ctgry, text) => {
        let userId = JSON.parse(localStorage.getItem('user'))
        console.log(userId.id)
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
        console.log(myNewNotes)
        setFetchData([...fetchData, myNewNotes].reverse());
        setNoteModal(false)
        let Data = await fetch(`http://localhost:1337/api/categories`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer 83244d6bce024a1ad57ba0513f67e34b1345afce123d623acd66af8fa9d19d2ec47abde76f6377562850974d6a4bdf748c9032c5fe12be229a87a26c5435d36fddf6a03d90012f6ec550a9838246926154e9cbb1173d10bb632338d722fcc5c2d6d00f4d02fd12465c37973e932c28d46b43eef4553d54909ec12e3c91b6398b`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ data: myNewNotes })
        })
        let parsedData = await Data.json()
        console.log(parsedData)

    }
    const updateNotes = async (id, category, text) => {
        let userId = JSON.parse(localStorage.getItem('user'))
        const myNewNotes = {
            id: id,
            Category: category,
            CardText: text,
            users_permissions_user: userId.id
        }
        console.log(myNewNotes)
        setFetchData([...fetchData, myNewNotes].reverse());
        setModal(false)
        // let Data = await fetch(`http://localhost:1337/api/categories`, {
        //     method: 'POST',
        //     headers: {
        //         Authorization: `Bearer ${cookie.usertkn}`,
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ data: myNewNotes })
        // })
        // let parsedData = await Data.json()
        // console.log(parsedData)

    }
    const [enotes, setEnotes] = useState({ id: 0, category: "", cardText: "" })
    const handleClick = (item) => {
        console.log(item)
    }
    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(fetchData))
        console.log(fetchData)
    }, [fetchData])

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
                        <AddNoteModal showModal={noteModal} handleClose={handleClose} addNote={addNotes} />
                    </div>
                    {fetchData && fetchData.map((item) => {
                        return (
                            <div key={item.id} className="p-4 lg:w-1/3">
                                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>{item.Category}</font>
                                        </font>
                                    </h2>
                                    <p className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>{item.CardText}</font>
                                        </font>
                                    </p>
                                    <a className="text-red-500 inline-flex items-center ">
                                        <Mymodal showModal={modal} handleClose={handleClose} enote={enotes} updateNotes={updateNotes} />
                                        <HiPencilAlt className='text-2xl cursor-pointer mx-2' onClick={() => { setModal(true),setEnotes(item)}} /><ImBin2 className='text-lg cursor-pointer mx-2' onClick={() => { handleDelete(item) }} />
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

