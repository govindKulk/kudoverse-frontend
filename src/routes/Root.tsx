import { Outlet } from 'react-router-dom'
import Navbar from '../components/common/Navbar'

const Root = () => {
  return (
    <div className=''>
      <Navbar/>
      <Outlet/>
    </div>
  )
}


export const loader = async () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if(!user){
    console.log("Not loggedin")
    return null;
  }

  const token = localStorage.getItem('token');
  if(!token){
    console.log("Not loggedin")
    return null;
  }

  const res = await fetch(`http://localhost:8000/api/user/me/${user.id}`, {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    
  });

  if(!res.ok){
    alert('Failed to fetch user data');
    return null;
  }

  const data = await res.json();
  console.log(data);
  return data;
}


export default Root
