import React from 'react'
import { JobListing } from '../../types/type'
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';


const salaryToCurrency = {
  LOW: '3,50,000 - 5,00,000',
  MID: '5,00,000 - 8,00,000',
  HIGH: '8,00,000 - 12,00,000',
  PRIME: '12,00,000+'
}

const JobListingCard = ({
  jobListingData
}: {
  jobListingData: JobListing
}) => {

  const {
    company,
    title,
    location,
    description,
    salaryRange,
    skills,
    experience,
    createdAt
  } = jobListingData;

  return (
    <div className='shadow-md border-gray-50 rounded-xl
    px-4 py-4
    w-full
    flex flex-col gap-1
    '>
      <h3 className='text-2xl font-bold'>{title}</h3>
      <div className='flex items-center gap-2 uppercase'>
        <p className=''>{company}</p>
        <p className=''>{location}</p>
      </div>
      {/* <p>{description}</p> */}
      <div className="font-bold"> Salary: <span className='font-medium '>{salaryToCurrency[salaryRange]}</span> </div>
      <p className='flex gap-1 bg-gray-200 py-2 px-1 max-md:overflow-x-auto'>
        {skills.map((skill, i) => <span key={i} className='bg-gray-50 rounded-lg px-2 text-slate-600'>{skill}</span>)}
      </p>
      <div className="font-bold"> Experience: <span className="font-medium">{experience}</span> </div>
      
      <span className="text-sm text-slate-600">{
        formatDistanceToNow(new Date(createdAt))
        }</span>

      <div className='flex  justify-between items-center'>
        <span className="bg-gray-200 text-slate-600 p-1 rounded-lg text-sm">Full Time Job</span>
        <Link to={`/job/${jobListingData.title}`} className='text-lg text-blue-400 font-bold'>View Details</Link>
      </div>
    </div>
  )
}

export default JobListingCard
