import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function Redirect() {
    const router = useRouter();

    useEffect(() => {
        async function fetchData() {
            let res = await fetch(`https://aqueous-crag-08640.herokuapp.com/api/auth/google/callback?access_token=${router.query.access_token ? router.query.access_token : "0"}`)
            let rData = await res.json()
            if (rData.jwt) {
                localStorage.setItem('token', rData.jwt);
                localStorage.setItem('user', rData.user.username);
                setTimeout(() => (router.push('/'), 1500));
            }
            else {
                console.log("internal server error")
            }
        }
        fetchData()
    }, [router]);
    return (
        <section className="text-gray-600 dark:text-gray-200 body-font min-h-screen">
            <div className="container px-5 py-24 mx-auto">
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
                <div className="xl:w-1/2 lg:w-3/4 w-full mx-auto text-center">
                    <div className="leading-relaxed text-lg mb-2">
                        <h2 className="text-3xl font-semibold mb-5 text-gray-800 dark:text-gray-100 md:text-4xl">
                            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r dark:from-slate-200 dark:to-red-500 from-black to-red-500">CodeXalok</span>
                        </h2>
                        <font  style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>Thank you for joining with us!</font>
                            <div style={{ verticalAlign: "inherit" }}>We are fetching your detail please wait...<img src='/assests/spinner.gif' className='w-10 mx-auto mt-3' alt=''/></div>
                        </font>
                    </div>
                    <span className="inline-block h-1 w-10 rounded bg-red-500 my-2"></span>
                    <h2 className="text-gray-900 dark:text-white font-medium title-font tracking-wider text-lg">
                        <font style={{ verticalAlign: "inherit" }}>
                            <font style={{ verticalAlign: "inherit" }}>CodeXalok</font>
                        </font>
                    </h2>
                </div>
            </div>
        </section>)
}

export default Redirect

