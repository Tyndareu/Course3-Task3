import { createBrowserRouter } from 'react-router-dom'
import Home from '../Sections/Home'
import Games from '../Sections/Games'
import Game from '../Sections/Game'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Home/>
  },
  {
    path: '/Home',
    element: <Home/>
  },
  {
    path: '/Games',
    element: <Games/>
  },
  {
    path: '/Game',
    element: <Game/>
  }
])
