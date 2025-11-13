import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './Context/ThemeContext.jsx'
import { MovieProvider } from './Context/MoviesContext.jsx'
import { AuthProvider } from './Context/AuthContext.jsx'
import { ModalProvider } from './Context/ModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ModalProvider>
    <ThemeProvider>
      <AuthProvider>
      <MovieProvider>
        <App />
      </MovieProvider>
      </AuthProvider>
    </ThemeProvider>
    </ModalProvider>
  </StrictMode>,
)
