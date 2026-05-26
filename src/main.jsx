import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const el = document.getElementById('app')
if (!el) throw new Error('Missing #app root element')

createRoot(el).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
