import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { HiPencilAlt } from 'react-icons/hi';
import { AiOutlinePlus } from 'react-icons/ai';
import { ImBin2 } from 'react-icons/im';
import Mymodal from '../components/Mymodal'
import Cookies from 'cookies'


export default function Home({ addTodo, todos, fetchData }) {
    const router = useRouter()
    const [modal, setModal] = useState(false)
    console.log(fetchData)

    const handleClose = () => {
        setModal(false)
    }
    // &sort=id:desc
    return (
        <>
            <Head><title>Welcome to Flash Notes || Easy to use</title></Head>
            <div className='container mx-auto'>
                <div className="p-5 pb-0 text-center">
                    <span className="font-bold text-red-700 dark:text-red-600 text-xl">Recent Post</span>
                    <h2 className="text-4xl md:text-5xl font-semibold">
                        From The Projects
                    </h2>
                    <p className="md:w-2/4 mb-5 mx-auto text-center text-base text-gray-600 dark:text-gray-400 leading-7 font-semibold">There are many variations of passages of Lorem Ipsum available but the majority have suffered alteration in some form.</p>
                </div>
                <div className="flex flex-wrap justify-center mx-6 ">
                    {fetchData.categories.map((item) => {
                        return (
                            <div key={item.id} className="p-4 lg:w-1/3">
                                <Mymodal showModal={modal} handleClose={handleClose} />
                                <div className="h-full bg-gray-100 bg-opacity-75 px-8 pt-16 pb-16 rounded-lg overflow-hidden text-center relative">
                                    <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>CATEGORY</font>
                                        </font>
                                    </h2>
                                    <p className="leading-relaxed mb-3 text-lg text-gray-900 font-medium">
                                        <font style={{ verticalAlign: "inherit" }}>
                                            <font style={{ verticalAlign: "inherit" }}>Photo booth fam kinfolk cold-pressed sriracha leggings jianbing microdosing tousled waistcoat.</font>
                                        </font>
                                    </p>
                                    <a className="text-red-500 inline-flex items-center ">
                                        <HiPencilAlt className='text-2xl cursor-pointer mx-2' onClick={() => { setModal(true) }} /><ImBin2 className='text-lg cursor-pointer mx-2' />
                                    </a>
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
                        )
                    })}
                </div >
            </div>
        </>
    )
}

export async function getServerSideProps({ context, req, res }) {
    const cookies = new Cookies(req, res)
    let token = cookies.get('user')
    let Data = await fetch('http://localhost:1337/api/users/me?populate=*', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    let fetchData = await Data.json()
    return {
        props: { fetchData },
    }
}

