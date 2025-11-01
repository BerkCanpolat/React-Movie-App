import { Outlet } from "react-router-dom"
import Navbar from "../Components/Navbar"

const Layout = () => {
  return (
    <>
    <Navbar/>
    <main>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout