import Head from 'next/head'
import Link from 'next/link';

export default function Home(props) {
  return (
    <>
    <Head><title>Welcome to Flash Notes || Easy to use</title></Head>
    <section className="body-font py-1">
                <div className="container px-5 mx-auto">
                    <div className="flex-wrap py-10">
                        <div className="text-center">
                            <span className="font-semibold text-lg block mb-1 text-slate-700 dark:text-gray-400  ">
                                Recent Category
                            </span>
                            <h2 className="md:text-5xl text-4xl font-bold mb-5">From The FlashCard</h2>
                        </div>
                    </div>
                    <div className="flex bg-slate-200 dark:bg-slate-900 items-center dark:shadow-lg dark:shadow-slate-600 rounded-lg p-5 lg:w-3/5 mx-auto pb-8 mb-10 sm:flex-row overflow-hidden">
                        <div className="flex-grow sm:text-left text-center mt-4 sm:mt-0">
                                <h2 className="text-xl title-font font-medium mb-2">The 400 Blows</h2>
                            <div className="flex-grow text-center mt-6 sm:mt-0 md:ml-5">
                                <div className="md:pl-20 flex justify-center overflow-x-auto space-x-1 w-80 md:w-5/6 scrollbar-thumb-[#b8b5b5] scrollbar-track-slate-100 scrollbar-thin">
                                    <section className="flex-shrink-0 rounded-full">
                                        <p className="w-80 leading-relaxed bg-slate-300 dark:bg-slate-700 rounded-md text-base dark:text-slate-200 mx-1 px-3 py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur officia quo eos labore id eaque possimus inventore perferendis, omnis sed, neque libero perspiciatis, aliquid dolorum.</p>
                                    </section>
                                    <section className="flex-shrink-0 rounded-full">
                                        <p className="w-80 leading-relaxed bg-slate-300 dark:bg-slate-700 rounded-md text-base dark:text-slate-200 mx-1 px-3 py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur officia quo eos labore id eaque possimus inventore perferendis, omnis sed, neque libero perspiciatis, aliquid dolorum.</p>
                                    </section>
                                    <section className="flex-shrink-0 rounded-full">
                                        <p className="w-80 leading-relaxed bg-slate-300 dark:bg-slate-700 rounded-md text-base dark:text-slate-200 mx-1 px-3 py-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequuntur officia quo eos labore id eaque possimus inventore perferendis, omnis sed, neque libero perspiciatis, aliquid dolorum.</p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
    </>
  )
}

// export async function getServerSideProps(context) {
//   let url='https://aqueous-crag-08640.herokuapp.com/api/projects?populate=*'
//   // let url='http://localhost:1337/api/projects?populate=*'
//   let Data= await fetch(url)
//   let fetchData= await Data.json()

//   return {
//     props: {fetchData},
//   }
// }