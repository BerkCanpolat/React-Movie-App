import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar/Navbar.jsx"

const Layout = () => {
  return (
    <>
    <Navbar/>
    <main className="dark:bg-[#0b0b0b] bg-[#e8e6e3]">
        <Outlet/>
    </main>
    </>
  )
}

export default Layout