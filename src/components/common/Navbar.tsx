import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Context';
import { CgProfile } from "react-icons/cg";

const Navbar = () => {
  const {isLoggedin, logout}  = useContext(AuthContext);
  const [isHovering, setIsHovering] = useState(false);
  return (
    <div className='py-2 w-full bg-slate-600 '>
      <nav className='max-w-screen-lg lg:mx-auto flex justify-between items-center relative'>
        <Link to='/' className='text-2xl font-extrabold text-white'>Your<span className='text-yellow-400'>HR</span></Link>
        
        <ul className='flex gap-2 items-center text-white'>
          {!isLoggedin ? <div className='flex gap-2 items-center '>
          <li>
            <Link to='/login'>Login</Link>
          </li>
          <li>
            <Link to='/register'>Sign UP</Link>
          </li>
          </div> : (
            <div 
            className=""
            onMouseLeave={(e) => {
              e.stopPropagation();
              setIsHovering(false);
            }}>
              <span onMouseOver={() => setIsHovering(true)}  className='flex flex-col items-center justify-center cursor-pointer'><CgProfile size={30} /> You
              
              </span>

              { <ul className={`absolute opacity-0 ${isHovering ? 'opacity-100' : 'opacity-0'} bg-white transition-all -right-[70px] top-full text-slate-500 font-semibold 
          pl-2 pr-8 py-2 shadow-lg text-sm flex-col flex gap-1 
          `}  onMouseLeave={() => setIsHovering(false)}>
                <li>
                  <Link to='/profile' className="hover:text-blue-500 ">Profile</Link>
                </li>
                <li>
                  <Link to='/applications' className="hover:text-blue-500 " >Applications</Link>
                </li>
                <li>
                  <Link to='/' className="hover:text-blue-500 " onClick={() => logout()}>Logout</Link>
                </li>
            </ul>
        }
            </div>
          )}
          
        </ul>

      </nav>
    </div>
  )
}

export default Navbar
