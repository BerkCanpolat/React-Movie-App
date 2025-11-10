import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Layout from "./Layout/Layout"
import Home from "./Pages/Home"
import Discover from "./Pages/Discover"
import MovieRelease from "./Pages/MovieRelease"
import Forum from "./Pages/Forum"
import About from "./Pages/About"
import { AuthProvider } from "./Context/AuthContext"
import ApprovedPage from "./Pages/Approved"

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
      {path:"/approved", element: <ApprovedPage />}
    ],
  },
]);


function App() {

  return (
    <AuthProvider>
      <RouterProvider router={routes}/>
    </AuthProvider> 
    
  )
}

export default App
