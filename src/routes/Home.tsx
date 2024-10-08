import { LoaderFunction, useLoaderData, useRouteError, useRouteLoaderData } from "react-router-dom";
import { JobListing } from "../types/type";
import JobListingCard from "../components/home/JobListingCard";
import { useContext } from "react";
import { AuthContext } from "../Context";

interface LoaderData  {
  jobs: Array<JobListing | any>;

}

const Home =  () => {
  const {jobs} = useLoaderData() as LoaderData;  

  console.log(jobs)

  return (
    <div className="
    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4
    py-4 px-4 
    max-w-screen-lg lg:mx-auto
    
    ">
   {
    jobs?.map((job, i) => (<JobListingCard key={i} jobListingData={job} />))
   }
    </div>
  )
}

export const loader = async (): Promise<LoaderData> => {

  try{
    const res = await fetch('https://kudoverse-backend.onrender.com/api/jobs');

  
  if(!res.ok){
    console.log("error happened")
    throw new Error('Failed to fetch data');
  }
  const data = await res.json();

  return data;
  }catch(error){
    console.log(error)
    return {
      jobs: []
    }
  }
}

export default Home
