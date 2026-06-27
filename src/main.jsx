import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import ShopNest from './ShopNest.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ShopNest />
  </StrictMode>,
)
