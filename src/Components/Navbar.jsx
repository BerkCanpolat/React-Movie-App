import { Link } from "react-router-dom"


const Navbar = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/discover">Discover</Link>
      <Link to="/movie-release">Movie Release</Link>
      <Link to="/forum">Forum</Link>
      <Link to="/about">About</Link>
    </div>
  )
}

export default Navbar