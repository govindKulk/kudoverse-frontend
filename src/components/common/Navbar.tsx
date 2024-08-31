import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <div className='py-2 w-full bg-slate-600'>
      <nav className='max-w-screen-lg lg:mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-extrabold text-white'>Your<span className='text-yellow-400'>HR</span></Link>
        
        <ul className='flex gap-2 items-center text-white'>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Sign UP</Link>
          </li>
        </ul>

      </nav>
    </div>
  )
}

export default Navbar
