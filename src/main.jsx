import React from 'react'
import ReactDOM from 'react-dom/client'
import { router } from './Router/Router'
import { RouterProvider } from 'react-router-dom'
import './main.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <RouterProvider router={router} />

)

/* React.StrictMode */
