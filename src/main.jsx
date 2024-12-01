import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Games from './pages/Games.jsx'
import Game from './pages/Game.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    children:[
      {
        path:"games",
        element:<Games/>
      },
      {
        path:"games/game",
        element:<Game/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
