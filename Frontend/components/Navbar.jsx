import { useTheme } from 'next-themes';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { AiFillCaretUp, AiFillCaretDown } from 'react-icons/ai';
import { BsMoonStarsFill, BsFillSunFill } from 'react-icons/bs';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Navbar({ login, logout }) {
  const [nav, setNav] = useState("hidden")
  const [mounted, setMounted] = useState(false);
  const router = useRouter()
  useEffect(() => {
    setNav("hidden")
  }, [router.query])

  const toggleNav = () => {
    if (nav == "hidden") {
      setNav("block")
    }
    else {
      setNav("hidden")
    }
  }

  useEffect(() => {
    setMounted(true);
  }, [])

  const { systemTheme, theme, setTheme } = useTheme()
  const toggleMode = () => {
    if (!mounted) return null;
    const currentTheme = theme == 'system' ? systemTheme : theme
    if (currentTheme == "dark") {
      return (
        <BsFillSunFill className='text-red-500 text-2xl cursor-pointer' onClick={() => setTheme("light")} />
      )
    }
    else {
      return (
        <BsMoonStarsFill className='text-red-500 text-2xl cursor-pointer' onClick={() => setTheme("dark")} />
      )
    }
  }
  return (
    <>
      <div>
        <ToastContainer
          position="top-right"
          autoClose={1000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <nav className="w-full  z-20 bg-white dark:bg-slate-900 sticky top-0 shadow-md">
        <div className="w-full px-3 flex flex-wrap items-center lg:justify-between mt-0 py-4">
          <div className="px-0 pt-2 lg:pl-4 flex items-center lg:mx-4 cursor-pointer text-2xl md:pt-0 font-medium mx-3 ">
            <Link href="/">FlashNotes</Link>
          </div>
          <div className='flex md:hidden justify-end absolute right-4 md:right-13 items-center'>
            <div className='mx-3'>
              {toggleMode()}
            </div>
            <button onClick={() => toggleNav()} className="text-white  bg-red-600 hover:bg-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1 ">Menu
              {nav == "hidden" ? <AiFillCaretDown /> : <AiFillCaretUp />}
            </button>
          </div>
          <div className="w-full flex-grow-5 md:flex md:flex-1 md:content-center md:justify-end md:w-auto h-0 md:h-auto overflow-hidden mt-2 md:mt-0 z-20 transition-all">
            <ul className="flex items-center md:flex-row">
              <li className="mx-2 my-2  hover:border-b-2 hover:border-red-600">
                <Link href="/">Home</Link>
              </li>
              <li className="mx-2 my-2  hover:border-b-2 hover:border-red-600">
                <Link href="/about">About</Link>
              </li>
              <li className='mx-1'>
                {toggleMode()}
              </li>
            </ul>
            <div className="text-center my-2 pr-4 pl-2">
              {!login ? <div>
                <Link href={"/login"}>
                  <button className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center mx-1">Login</button>
                </Link>
                <Link href={"/signup"}>
                  <button className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center mx-1">Signup</button>
                </Link>
              </div>
                :
                <div>
                  <Link href={'/'}>
                    <button className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1">Account</button>
                  </Link>
                  <button onClick={logout} className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1">Logout</button>
                </div>
              }
            </div>
          </div>
        </div>
        <div className={`bg-red-100 dark:bg-slate-800 text-center py-3 shadow-lg absolute w-full ${nav} md:hidden`}>
          <ul>
            <div className="text-center my-2 pl-2">
              {!login ? <div>
                <Link href={"/login"}>
                  <button className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center mx-1">Login</button>
                </Link>
                <Link href={"/signup"}>
                  <button className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center  items-center mx-1">Signup</button>
                </Link>
              </div>
                :
                <div>
                  <Link href={'/'}>
                    <button className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1">Account</button>
                  </Link>
                  <button onClick={logout} className="text-white bg-red-600 hover:bg-red-400 duration-300 focus:ring-2 focus:ring-red-600 font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center mx-1">Logout</button>
                </div>
              }
            </div>
            <li className="pt-4 text-red-600 font-bold ">
              <Link href="/">Home</Link>
            </li>
            <li className="pt-4 text-red-600 font-bold"><Link href="/about">About</Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}

export default Navbar