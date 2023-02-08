import styles from './index.module.css'
import Link from 'next/link'

export default function Navbar({ appearance = 'base', ...props }) {
  return (
    <nav className="p-2 bg-white border-gray-200">
      <div className="container flex flex-wrap items-center justify-between mx-auto">
        <Link className="flex items-center" href="/">
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            className="h-6 mr-3 sm:h-9"
            alt="Yardim Agi Ihtiyac Logo"
          />
          <span className="self-center text-xl font-semibold whitespace-nowrap">Ihtiyac</span>
        </Link>
        <div className="flex md:order-2">
          <button
            type="button"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 text-center mr-3 md:mr-0"
          >
            <Link href="/signin">Giris</Link>
          </button>
        </div>
      </div>
    </nav>
  )
}
