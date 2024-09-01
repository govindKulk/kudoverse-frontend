import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, LoaderFunction, RouterProvider } from 'react-router-dom'
import Root, {loader as rootLoader} from './routes/Root.tsx'
import Home, {loader as JobsLoader} from './routes/Home.tsx'
import Login from './routes/Login.tsx'
import Register from './routes/Register.tsx'
import { AuthProvider } from './Context.tsx'
import JobDetails, {loader as JobDetailsLoader} from './routes/JobDetails.tsx'
import Applications, {loader as applicationLoader} from './routes/Applications.tsx'


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
        element: <JobDetails/>,
        loader: JobDetailsLoader
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
      ,
      {
        path: '/applications',
        element: <Applications/>,
        loader: applicationLoader
      },
      {
        path: '/applications/:id',
        element: <Applications/>,
        loader: applicationLoader
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
    <RouterProvider router={router} />

    </AuthProvider>
  </StrictMode>,
)
