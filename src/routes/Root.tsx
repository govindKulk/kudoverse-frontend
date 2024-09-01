import { Outlet, useLoaderData } from 'react-router-dom'
import Navbar from '../components/common/Navbar'
import { AuthContext } from '../Context'
import { useContext, useEffect } from 'react'
import Apply from './Apply'

const Root = () => {

  const { isLoggedin } = useLoaderData() as { isLoggedin: boolean };
  const { logout } = useContext(AuthContext);

  if (isLoggedin) {
    const token = localStorage.getItem('token');
    if (!token) {
      return;
    }
   
  } 

  useEffect(() => {

    if(!isLoggedin){
      logout();
    }
  }, [isLoggedin])

  return (
    <div className=''>
      <Navbar  />
      <Outlet />

    </div>
  )
}


export const loader = async () => {

  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user) {
    console.log("Not loggedin")
    return {
      isLoggedin: false,
    };
  }

  const token = localStorage.getItem('token');
  if (!token) {
    console.log("Not loggedin")
    return {
      isLoggedin: false,
    };
  }

  try {
    const res = await fetch(`https://kudoverse-backend.onrender.com/api/user/me/${user.id}?timestamp=${new Date()}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        
      },
      cache: 'no-cache'

    });

    if (!res.ok) {
      alert('Failed to fetch user data');
      return {
        isLoggedin: false,
      };
    }

    const data = await res.json();
    console.log(data);
    return {
      isLoggedin: true,
    };
  } catch (error) {
    console.log(error);
    return {
      isLoggedin: false,
    };
  }


}


export default Root
