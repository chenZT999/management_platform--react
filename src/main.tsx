import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import store from './store/index.tsx'
import {Provider} from 'react-redux'
import Login from '@/views/login/login.tsx'
import Main from '@/views/mainLoyout/Main.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
  {
    path: '/login',
    element: <Login />
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
