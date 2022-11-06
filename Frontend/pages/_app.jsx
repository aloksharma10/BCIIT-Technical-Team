import '../styles/globals.css'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import LoadingBar from 'react-top-loading-bar'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ThemeProvider } from 'next-themes'
import User from '../components/User'


function MyApp({ Component, pageProps }) {
  const [progress, setProgress] = useState(0)
  const [login, setLogin] = useState(false)
  const [key, setKey] = useState()
  const router = useRouter()
  const [user, setUser] = useState({})

  useEffect(() => {
    router.events.on('routeChangeComplete', () => {
      setProgress(100)
    })
    router.events.on('routeChangeStart', () => {
      setProgress(40)
    })

    if (localStorage.getItem('user')) {
      let userTkn = localStorage.getItem('token')
      setUser(userTkn)
      setLogin(true)
      setKey(Math.random())
    }
  }, [router.query])

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
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
    setLogin(false)
  }
  let initTodo;
  if (localStorage.getItem("todos") === null) {
    initTodo = [];
  }
  else {
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }


  const onDelete = (todo) => {
    setTodos(todos.filter((e) => {
      return e !== todo;
    }));
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const addTodo = (Category,usersId, CardText) => {
    const myTodo = {
      Category: Category,
      CardText: CardText,
      users_permissions_user: usersId
    }
    setTodos([...todos, myTodo]);
  }

  const [todos, setTodos] = useState(initTodo);
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

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
      <User />
      <Component {...pageProps} login={login} user={user} card={todos} addTodo={addTodo} onDelete={onDelete} />
      <Footer />
    </ThemeProvider>
  </>
}

export default MyApp

