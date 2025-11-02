import { useTheme } from "../Context/ThemeContext"
import { AiOutlineSun, AiOutlineMoon} from 'react-icons/ai';


const ThemeButton = () => {
    const { theme, setTheme } = useTheme();
  return (
    <button className="cursor-pointer ml-2 mr-2 border rounded-full p-1.5 dark:border-amber-500 dark:hover:bg-amber-500/20 border-gray-400 hover:bg-gray-200/50 transition-all duration-700">
        {theme === "dark" ? (
            <p onClick={() => setTheme("light")}><AiOutlineSun size={21} color="FACC15"/></p>
        ) : (
            <p onClick={() => setTheme("dark")}><AiOutlineMoon size={21} color="white"/></p>
        )}
    </button>
  )
}

export default ThemeButton