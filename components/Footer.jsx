import Link from 'next/link';
import React from 'react'


function Footer() {
  return (
    <div className="container px-5 py-8 mx-auto flex items-center sm:flex-row justify-center">
      <Link href={'/'} className="flex title-font font-medium items-center md:justify-start justify-center">
        <spa className="px-0 pt-2 lg:pl-4 flex items-center lg:mx-4 cursor-pointer text-2xl md:pt-0 font-medium mx-3">FlashNotes</spa>
      </Link>
      <p className="text-sm text-grey dark:text-gray-300 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">Copyright © 2022
        <Link href={'/'} className="text-gray-500  ml-1" rel="noopener noreferrer" target="_blank"> Flashcard</Link>
      </p>
    </div>
  )
}

export default Footer