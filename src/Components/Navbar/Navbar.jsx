import { Link, useLocation } from "react-router-dom";
import mainLogo from "../../assets/mainlogo.png";
import { FaMagnifyingGlass, FaBarsStaggered } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import ThemeButton from "./ThemeButton";
import NavButton from "./NavButton";
import { navLinks } from "../../constants/data";
import Modal from "./Modal";
import { useAuth } from "../../Context/AuthContext";
import { IoNotificationsOutline } from "react-icons/io5";
import { useModal } from "../../Context/ModalContext";
import { getImageUrl, searchMovies } from "../../Services/api";

const Navbar = () => {
  const location = useLocation();
  const [openSideBar, setOpenSideBar] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { sessionId, logout, loading } = useAuth();
  const { modalOpen, modalType, openModal, closeModal } = useModal();
  const [isScrolled, setIsScrolled] = useState(false);
  const handleOpen = () => setOpenSideBar(!openSideBar);
  const handleSearchOpen = () => setOpenSearch(!openSearch);

  const [searchQuery, setSearchQuery] = useState("");

  const [searchResult, setSearchResult] = useState([]);

  const [isSearching, setIsSearching] = useState(false);

  const [showSearchResult, setShowSearchResult] = useState(false);

  const searchContainerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchQuery.trim().length > 2) {
        setIsSearching(true);
        try {
          const result = await searchMovies(searchQuery);
          setSearchResult(result ? result.slice(0, 8) : []);
        } catch (error) {
          console.error("film ararken hata", error);
        } finally {
          setIsSearching(false);
          setShowSearchResult(true);
        }
      } else {
        setSearchResult([]);
        setShowSearchResult(false);
      }
    };
    const debounceTimer = setTimeout(() => {
      handleSearch();
    }, 500);
    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchQuery]);

  const handleSearchFocus = () => {
    if (searchQuery.trim().length > 2 && searchResult.length > 0) {
      setShowSearchResult(true);
    }
  };

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(e.target)
      ) {
        setShowSearchResult(false);
      }
    };
    document.addEventListener("click", handleClickOutSide);
    return () => document.removeEventListener("click", handleClickOutSide);
  }, []);

  return (
    <>
      <header
        className={`flex items-center justify-between fixed top-0 left-0 w-full z-50 px-2 sm:px-4 md:px-8 lg:px-12 xl:px-16 text-black dark:text-white transition-all duration-500 ${
          isScrolled
            ? "backdrop-blur-xl bg-white/30 dark:bg-black/30 shadow-lg h-20"
            : "bg-transparent h-30"
        }`}
      >
        <img src={mainLogo} alt="mainLogo" className="w-28 sm:w-32" />

        <nav className={`${openSearch ? "hidden" : "block"}`}>
          <ul
            className={`${
              openSideBar ? "max-sm:w-60" : "max-sm:w-0 overflow-hidden"
            } flex items-center gap-8 sm:hidden max-sm:flex-col lg:flex max-sm:fixed top-0 right-0 bottom-0 max-sm:pt-25 max-sm:min-h-screen max-sm:h-full max-sm:bg-black transition-all duration-700 font-semibold max-sm:items-start max-sm:text-left`}
          >
            {navLinks.map((item, index) => (
              <li key={index} className="pl-5 transition-all duration-500">
                <Link
                  to={item.url}
                  className={`${
                    item.url === location.pathname ? "text-emerald-600" : ""
                  }`}
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="flex items-center max-sm:hidden gap-2"
          ref={searchContainerRef}
        >
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            type="text"
            placeholder="Search..."
            className={`absolute right-65 top-1/2 -translate-y-1/2 sm:right-79 md:right-83 lg:right-87 xl:right-90 transition-all duration-700 bg-amber-50 rounded-full text-black py-3 px-5 ${
              openSearch
                ? "opacity-100 2xl:w-[1000px] xl:w-[700px] lg:w-[500px] md:w-[250px] sm:w-40"
                : "opacity-0 w-0 px-0"
            }`}
          />
          {showSearchResult && searchResult && searchResult.length > 2 && (
            <div className="absolute top-89 left-190 -translate-1/2 w-240 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
              <ul className="divide-y divide-neutral-700">
                {searchResult.map((item, index) => {
                  return (
                    <Link
                      to={`/movie/${item.id}`}
                      key={index}
                      className="hover:bg-neutral-700"
                      onClick={() => {
                        setShowSearchResult(false);
                        setOpenSearch(false);
                        setSearchQuery("");
                      }}
                    >
                      <button className="flex items-center p-3 w-full text-left">
                        <div className="w-10 h-10 bg-neutral-700 rounded  shrink-0 overflow-hidden">
                          <img
                            src={getImageUrl(item.poster_path, "w92")}
                            alt="img"
                            className="w-full h-full object-cover"
                          />

                          <div className="w-full h-full flex items-center justify-center text-neutral-500 text-xs">
                            No Image
                          </div>
                        </div>

                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-white truncate overflow-hidden w-52">
                            {item.title}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {item.release_date?.substring(0, 4) || "N/A"}
                          </p>
                        </div>
                      </button>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}

          {showSearchResult &&
            searchQuery.trim().length > 2 &&
            (!searchResult || searchResult.length === 0) &&
            !isSearching && (
              <div className="absolute mt-2 w-72 bg-neutral-800 rounded-lg shadow-lg overflow-hidden z-50">
                <div className="p-4 text-center text-neutral-400 text-sm">
                  No movies found matching...
                </div>
              </div>
            )}

          <FaMagnifyingGlass
            color="white"
            size={20}
            onClick={handleSearchOpen}
            className="cursor-pointer"
          />
          <ThemeButton />

          {sessionId ? (
            <IoNotificationsOutline
              size={30}
              className="cursor-pointer text-white"
            />
          ) : (
            <NavButton
              title="Sign Up"
              className="dark:bg-transparent hover:bg-black dark:border-white dark:text-white dark:hover:text-black dark:hover:bg-emerald-600"
              onClick={() => {
                openModal("login");
              }}
            />
          )}

          {sessionId ? (
            <NavButton
              title={`${loading ? "Logging out..." : "Logout"}`}
              className="dark:bg-emerald-600 dark:border-emerald-600 hover:bg-transparent hover:text-white bg-black dark:text-white border-black"
              onClick={logout}
              disabled={loading}
            />
          ) : (
            <NavButton
              title="Login"
              className="dark:bg-emerald-600 dark:border-emerald-600 hover:bg-transparent hover:text-white bg-black dark:text-white border-black"
              onClick={() => {
                openModal("login");
              }}
            />
          )}
        </div>

        <button className="z-20 sm:hidden" onClick={handleOpen}>
          <FaBarsStaggered size={25} className="cursor-pointer" />
        </button>
      </header>
      {modalOpen && (
        <Modal
          onClose={closeModal}
          type={modalType}
          setType={(type) => openModal(type)}
        />
      )}
    </>
  );
};

export default Navbar;
