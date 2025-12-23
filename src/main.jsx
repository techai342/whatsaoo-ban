import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'  // ✅ Explicit .jsx extension add karen
import './index.css'

const container = document.getElementById('root')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
