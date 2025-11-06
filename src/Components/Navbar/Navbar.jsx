import { Link, useLocation } from "react-router-dom";
import mainLogo from "../../assets/mainlogo.png";
import { FaMagnifyingGlass, FaBarsStaggered } from "react-icons/fa6";
import { useState } from "react";
import ThemeButton from "./ThemeButton";
import NavButton from "./NavButton";
import { navLinks } from "../../constants/data";

const Navbar = () => {
  const location = useLocation();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  const handleOpen = () => {
    if (openSideBar) {
      setOpenSideBar(false);
    } else {
      setOpenSideBar(true);
    }
  };

  const handleSearchOpen = () => {
    if (openSearch) {
      setOpenSearch(false);
    } else {
      setOpenSearch(true);
    }
  };
  
  return (
    <header className="flex items-center justify-between fixed top-0 left-0 w-full z-50 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 bg-transparent text-black dark:text-white h-30 ">
      <img src={mainLogo} alt="mainLogo" className="w-28 sm:w-32" />

      <nav className={`${openSearch ? "hidden" : "block"}`}>
        <ul
          className={`${
            openSideBar ? "max-sm:w-60" : "max-sm:w-0 overflow-hidden"
          } flex items-center gap-8 sm:hidden max-sm:flex-col lg:flex max-sm:fixed top-0 right-0 bottom-0 max-sm:pt-25 max-sm:min-h-screen max-sm:h-full max-sm:bg-black transition-all duration-700 font-semibold max-sm:items-start max-sm:text-left`}>
          {navLinks.map((item,index) => (
            <li key={index} className="pl-5 transition-all duration-500">
              <Link to={item.url} className={`${item.url === location.pathname ? "text-emerald-600" : ""}`}>{item.title}</Link>
              </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center max-sm:hidden gap-2">
        <input
          type="text"
          placeholder="Search..."
          className={`absolute right-65 top-1/2 -translate-y-1/2 sm:right-79 md:right-83 lg:right-87 xl:right-90 transition-all duration-700 bg-amber-50 rounded-full text-black py-3 px-5 ${
            openSearch
              ? "opacity-100 2xl:w-[1000px] xl:w-[700px] lg:w-[500px] md:w-[250px] sm:w-40"
              : "opacity-0 w-0 px-0"
          }`}/>
        <FaMagnifyingGlass
          color="white"
          size={20}
          onClick={handleSearchOpen}
          className="cursor-pointer"
        />
        <ThemeButton />
        <NavButton title="Sign Up" className="dark:bg-transparent hover:bg-black dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-emerald-600"/>
        <NavButton title="Login" className="dark:bg-emerald-600 dark:border-emerald-600 hover:bg-transparent hover:text-white bg-black dark:text-white border-black"/>
      </div>

      <button className="z-20 sm:hidden" onClick={handleOpen}>
        <FaBarsStaggered size={25} className="cursor-pointer"/>
      </button>
    </header>
  );
};

export default Navbar;
