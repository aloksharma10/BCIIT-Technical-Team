import '../styles/globals.css'
import Navbar from '../components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ThemeProvider } from 'next-themes'
import { useCookies } from "react-cookie"


function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [login, setLogin] = useState(false)
  const [key, setKey] = useState()
  const router = useRouter()
  const [cookie, setCookie, removeCookie] = useCookies(['usertkn'])
  const [user, setUser] = useState({})

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })

    if (localStorage.getItem('user')) {
      setLogin(true)
      setUser(cookie.user)
      setKey(Math.random())
    }
  }, [router.query])

  const handleLogout = () => {
    localStorage.removeItem('user')
    removeCookie("userdata");
    removeCookie('usertkn');
    toast.success("You are successfully logout", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    router.push('/login')
    setLogin(false)
  }


  return <>
    <ThemeProvider attribute='class'>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
        waitingTime={400}
        height={3}
      />
      <Navbar login={login} key={key} logout={handleLogout} />
      <Component {...pageProps} login={login} user={user} />
    </ThemeProvider>
  </>
}

export default MyApp

