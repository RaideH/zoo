import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import { AuthProvider } from './context/AuthContext'
import { PetProvider } from './context/PetContext'
import { initEmail } from './utils/email'
import './index.css' 
import App from './App.jsx' 

initEmail();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <AuthProvider>
        <PetProvider>
          <App />
        </PetProvider>
      </AuthProvider>
    </ThemeProvider>
  </StrictMode>,
)
