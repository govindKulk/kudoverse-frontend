import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/Root.tsx'
import Home, {loader as JobsLoader} from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: rootLoader,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: JobsLoader
      },
      {
        path: '/job/:id',
        element: <div>single job page</div>
      },
      {
        path: '/admin',
        element: <div>admin page</div>
      },
      {
        path: '/login',
        element: <Login/>
      }
      ,
      {
        path: '/register',
        element: <Register/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
