import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import bgImg from './assets/bg.png'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <img className='brightness-50 absolute z-[-1] w-screen h-screen object-cover' src={bgImg} alt="background image" />
    <App />
  </StrictMode>,
)
