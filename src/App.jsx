import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Discover from "./Pages/Discover"
import MovieRelease from "./Pages/MovieRelease"
import Forum from "./Pages/Forum"
import About from "./Pages/About"
import ApprovedPage from "./Pages/Approved"
import Details from "./Pages/Details"
import TrailerPage from "./Pages/Trailer"

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
      {path:"/approved", element: <ApprovedPage />},
      {path:"/movie/:id", element: <Details />},
      {path:"/trailer/:id", element: <TrailerPage />},
    ],
  },
]);


function App() {

  return (
      <RouterProvider router={routes}/>
    
  )
}

export default App
