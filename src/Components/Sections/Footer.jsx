import { FaInstagram, FaFacebookF, FaTwitter, FaGoogle } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className="dark:bg-[#0b0b0b] bg-[#e8e6e3] pl-2 sm:pl-4 md:pl-8 lg:pl-12 xl:pl-16 pr-2 sm:pr-4 md:pr-8 lg:pr-12 xl:pr-16 sm:pt-20 sm:pb-20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-15">
            <div className="my-10 sm:max-w-[460px]">
                <h1 className="dark:text-white text-black text-2xl sm:text-5xl">Our platform is trusted by millions & features best updated movies all around the world.</h1>
            </div>
            <div className="flex flex-col-reverse items-start sm:items-end sm:flex-col sm:justify-between gap-10 sm:min-h-[200px]">
                <div>
                <ul className="dark:text-gray-300 text-gray-900 flex items-center text-sm gap-3.5 sm:text-xl sm:gap-4.5">
                    <li><a href="">Home</a></li>
                    <li>/</li>
                    <li><a href="">Discover</a></li>
                    <li>/</li>
                    <li><a href="">Influence</a></li>
                    <li>/</li>
                    <li><a href="">Release</a></li>
                </ul>
                </div>
                <div className="flex items-center gap-5 sm:gap-7 justify-end">
                    <a href="">
                        <FaInstagram size={38} className="dark:text-white text-black hover:text-pink-600 transition-colors duration-300"/>
                    </a>
                    <a href="">
                        <FaFacebookF size={38} className="dark:text-white text-black hover:text-blue-700 transition-colors duration-300"/>
                    </a>
                    <a href="">
                        <FaTwitter size={38} className="dark:text-white text-black hover:text-sky-600 transition-colors duration-300"/>
                    </a>
                    <a href="">
                        <FaGoogle size={38} className="dark:text-white text-black hover:text-[#EA4335] transition-colors duration-300"/>
                    </a>
                </div>
            </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center justify-between">
            <div className="dark:text-gray-400/85 text-gray-900 flex items-center gap-7.5">
                <a href="">
                    Privacy policy
                </a>
                <a href="">
                    Term of service
                </a>
                <a href="">
                    Language
                </a>
                </div>
                <div className="dark:text-gray-400/85 text-gray-900 flex items-center gap-5 max-sm:my-5.5">
                    <p>&copy; 2025</p>
                    <a href="https://github.com/BerkCanpolat"><p>Developed by Berk Canpolat</p></a>
                    
                </div>
        </div>
    </div>
  )
}

export default Footer