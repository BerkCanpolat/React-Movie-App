import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

const Layout = () => {
  return (
    <>
    <Navbar/>
    <main className="dark:bg-black bg-white">
        <Outlet/>
    </main>
    </>
  )
}

export default Layout