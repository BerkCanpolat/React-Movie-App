import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Discover from "./Pages/Discover"
import MovieRelease from "./Pages/MovieRelease"
import Forum from "./Pages/Forum"
import About from "./Pages/About"

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {path: "/", element: <Home/>},
      {path: "/discover", element: <Discover/>},
      {path: "/movie-release", element: <MovieRelease/>},
      {path: "/forum", element: <Forum/>},
      {path: "/about", element: <About/>},
    ],
  },
]);


function App() {

  return <RouterProvider router={routes}/>
}

export default App
