import Head from 'next/head'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FcGoogle } from 'react-icons/fc';
import { useRouter } from 'next/router';

function Signup({ login }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [cpassword, setCpassword] = useState('')
  const router = useRouter()
  let a = email.split('@')

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
    if (e.target.name == "name") { setName(e.target.value) }
    if (e.target.name == "email") { setEmail(e.target.value) }
    if (e.target.name == "password") { setPassword(e.target.value) }
    if (e.target.name == "cpassword") { setCpassword(e.target.value) }

  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (password != cpassword) {
      toast.error('Password and Confirm Password must be same!', {
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
    else if (password.length < 6) {
      toast.error('Password must be 6 characters', {
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
    else {
      let data = {
        Name: name, username: a[0], email, password
      }
      try {
        let res = await fetch("http://localhost:1337/api/auth/local/register", {
          method: "POST",
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(data)
        })
        let resData = await res.json()
        if (resData.jwt) {
          toast.success('Your account has been created successfully.', {
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
        else {
          toast.error("Email is already taken!", {
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
        setName('')
        setEmail('')
        setPassword('')
        setCpassword('')
        
      } catch (error) {
        toast.error("Internal Server Error!", {
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

  }
  return (
    <>
      <Head><title>Signup | FlashCard</title></Head>
      <div>
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
      </div>
      {!login && <section className="bg-gray-50 dark:bg-slate-800 min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:py-5">
          <div className="px-0 lg:pl-4 flex items-center lg:mx-4 cursor-pointer text-3xl font-bold my-5">
            <Link href="/">Welcome to FlashCard</Link>
          </div>
          <Link href={'https://aqueous-crag-08640.herokuapp.com/api/connect/google'}>
            <div className='flex bg-red-100 dark:bg-slate-900 font-medium rounded-lg text-lg justify-center px-5 py-2 text-center"' role="button" >
              <FcGoogle className='text-3xl mx-3' /><span className="">Sign up with Google</span>
            </div>
          </Link>
          <div className="my-3 flex items-center justify-between">
            <span className="border-b md:w-48 w-32"></span>
            <span className="text-sm text-center text-gray-500 uppercase dark:text-gray-400">or login with email</span>
            <span className="border-b md:w-48 w-32"></span>
          </div>
          <div className="w-full bg-red-200 dark:bg-slate-900 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0  ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl ">
                Sign Up | FlashCard
              </h1>
              <form onSubmit={handleSubmit} action="/" method="post">
                <div className='mb-2'>
                  <label htmlFor="name" className="block text-sm font-medium ">Name</label>
                  <input onChange={handleChange} value={name} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="Your Name" required="" />
                </div>
                <div className='mb-2'>
                  <label htmlFor="email" className="block text-sm font-medium ">Email</label>
                  <input onChange={handleChange} value={email} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                </div>
                <div className='mb-2'>
                  <label htmlFor="password" className="block text-sm font-medium ">Password</label>
                  <input onChange={handleChange} value={password} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" required="" />
                </div>
                <div className='mb-2'>
                  <label htmlFor="cpassword" className="block text-sm font-medium ">Confirm Password</label>
                  <input onChange={handleChange} value={cpassword} type="password" name="cpassword" id="cpassword" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-red-600 focus:border-red-600 block w-full p-2.5" required="" />
                </div>
                <button type="submit" className="w-full mt-3 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Up</button>
              </form>
            </div>
          </div>
        </div>
      </section>}
    </>

  )
}


export default Signup