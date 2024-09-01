import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../Context';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { Application } from '../types/type';
import ApplicationTable from '../components/applications/ApplicationsTable';

const Applications = () => {

    const {isLoggedin} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if(!isLoggedin){
            navigate('/login');
        }
    }, [isLoggedin])

    if(!isLoggedin){
        return  <div className='h-screen w-full text-2xl items-center justify-center'>
            Login First
        </div>
    }

    const data = useLoaderData() as LoaderData | null;
    if(!data) {
        return <div className='h-screen w-full text-2xl items-center justify-center'>
            You have not applied for a job yet!
        </div>
    }


  return (
    <div>
        <ApplicationTable applications={data.applications} />
    </div>
  )
}

export default Applications

interface LoaderData {
    applications: Array<Application>
}
export const loader = async (): Promise<LoaderData | null> => {

    const token = localStorage.getItem('token');
    if(!token){
        return null;
    }    
    try{
      const res = await fetch('https://kudoverse-backend.onrender.com/api/user/applications', {
        headers: {
            'Content-Type': 'application/json',
            "Authorization":  `Bearer ${token}`
        },
        cache: 'no-cache'
      }, 
      
    );
  
    
    if(!res.ok){
      console.log("error happened")
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
  
    return data;
    }catch(error){
      console.log(error)
      return null;
    }
  }
  