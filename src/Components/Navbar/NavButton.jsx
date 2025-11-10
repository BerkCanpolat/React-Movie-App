
const NavButton = ({ title, onClick, disabled, className = "" }) => {
  return (
    <button className={`w-24 h-12 border rounded-[10px] cursor-pointer font-medium text-white dark:text-black transition-all duration-700 ${className}`} type='button' onClick={onClick} disabled={disabled}>
        {title}
    </button>
  )
}

export default NavButton