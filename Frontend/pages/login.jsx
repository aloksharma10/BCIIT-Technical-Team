import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router';
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { useCookies } from "react-cookie"

function Login({ login }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cookie, setCookie] = useCookies(['usertkn'])
  
  const router = useRouter()
  useEffect(() => {
    if (login) {
      toast.success('You are already logged in!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setTimeout(() => {
        router.push('/')
      }, 1000);
    }
  }, [login])

  const handleChange = (e) => {
    if (e.target.name == "email") { setEmail(e.target.value) }
    if (e.target.name == "password") { setPassword(e.target.value) }
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    let data = {
      identifier: email, password
    }
    let res = await fetch("http://localhost:1337/api/auth/local", {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    let resData = await res.json()
    if (resData.data == null && resData.jwt == null) {
      toast.error('Invalid Credential!', {
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
    else if (resData.jwt) {
      toast.success('You are logged in!', {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      localStorage.setItem('user',JSON.stringify(resData.user))
      setCookie("userdata", resData.user);
      setCookie("usertkn", resData.jwt, {
        path: "/",
        maxAge: 3600, 
        sameSite: true,
      })
      setTimeout(() => {
        router.push("/")
      }, [1000]);
      setEmail('')
      setPassword('')
    }
  }

  return (
    <>
      <Head><title>Login | FlashCard</title></Head>
      {!login && <section className=" min-h-screen ">
        <div className="flex flex-col items-center justify-center px-4 py-8 mx-auto md:py-5">
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
          <div className="px-0 lg:pl-4 flex items-center lg:mx-4 cursor-pointer text-3xl font-bold my-5">
            <Link href="/">Welcome to FlashCard</Link>
          </div>
          <Link href={'http://localhost:1337/api/connect/google'} >
            <div className='flex cursor-pointer bg-red-100 dark:bg-slate-900 font-medium rounded-lg text-lg justify-center px-5 py-2 text-center"' role="button" >
              <FcGoogle className='text-3xl mx-3' /><span className="">Sign in with Google</span>
            </div>
          </Link>
          <div className="my-3 flex items-center justify-between">
            <span className="border-b md:w-48 w-32"></span>
            <span className="text-sm text-center text-gray-500 uppercase dark:text-gray-400">or login with email</span>
            <span className="border-b md:w-48 w-32"></span>
          </div>
          <div className="w-full bg-red-200 dark:bg-slate-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight  md:text-2xl ">
                Sign in to your account
              </h1>
              <form onSubmit={handleSubmit} method="post">
                <div className='mb-4'>
                  <label htmlFor="email" className="block text-sm font-medium  ">Your email</label>
                  <input onChange={handleChange} type="email" name="email" value={email} id="email" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                </div>
                <div className='mb-4'>
                  <label htmlFor="password" className="block text-sm font-medium  ">Password</label>
                  <input onChange={handleChange} type="password" name="password" value={password} id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" required="" />
                </div>
                <div className="md:flex items-center mt-3 justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                    </div>
                    <div className="text-sm">
                      <p className="text-sm font-light ">
                        Don’t have an account yet? <Link href="/signup" ><span className="text-red-500 font-medium">Sign up</span></Link>
                      </p>
                    </div>
                  </div>
                  <a href="#" className="text-sm font-medium text-red-600 hover:underline ">Forgot password?</a>
                </div>
                <button type="submit" className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign in</button>
              </form>
            </div>
          </div>
        </div>
      </section>}
    </>
  )
}

export default Login