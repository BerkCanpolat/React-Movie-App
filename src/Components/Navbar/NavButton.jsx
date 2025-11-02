
const NavButton = ({ title, className = "" }) => {
  return (
    <button className={`w-24 h-12 border rounded-[10px] cursor-pointer font-medium text-white dark:text-black transition-all duration-700 ${className}`} type='button'>
        {title}
    </button>
  )
}

export default NavButton