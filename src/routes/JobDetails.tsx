import React, { useContext } from 'react'
import { JobListing } from '../types/type'
import { LoaderFunction, LoaderFunctionArgs, useLoaderData } from 'react-router-dom';
import JobListingCard from '../components/home/JobListingCard';
import { formatDistanceToNow } from 'date-fns';
import { Link } from 'react-router-dom';
import { AuthContext } from '../Context';
import Apply from './Apply';



const salaryToCurrency = {
    LOW: '3,50,000 - 5,00,000',
    MID: '5,00,000 - 8,00,000',
    HIGH: '8,00,000 - 12,00,000',
    PRIME: '12,00,000+'
}

const JobDetails = () => {

    const { job } = useLoaderData() as LoaderData;
    if (!job) {
        return <div>Job not found</div>
    }

    const {
        company,
        title,
        location,
        description,
        salaryRange,
        skills,
        experience,
        createdAt
    } = job;


    const [isModalOpen, setIsModalOpen] = React.useState(false);


    return (
     <div>
           <div className='flex items-center justify-center md:p-8 p-4'>
            <div className='shadow-md border-gray-50 rounded-xl

    w-full
    max-w-screen-lg lg:mx-auto
    flex flex-col gap-1
    '>
                <div className='bg-gray-200 rounded-t-xl p-4'>
                    <h3 className='text-2xl font-bold'>{title}</h3>
                    <div className='flex items-center gap-2 uppercase'>
                        <p className=''>{company}</p>
                        <p className=''>{location}</p>
                    </div>
                </div>
                <div className='px-4 py-4 flex flex-col md:gap-2 gap-1'>
                    <p>{description}</p>
                    <div className="font-bold"> Salary: <span className='font-medium '>{salaryToCurrency[salaryRange]}</span> </div>
                    <p className='flex gap-1 md:gap-y-2 bg-gray-200 py-2 px-1 max-md:overflow-x-auto md:flex-wrap'>
                        {skills.map((skill, i) => <span key={i} className='bg-gray-50 rounded-lg px-2 text-slate-600'>{skill}</span>)}
                    </p>
                    <div className="font-bold"> Experience: <span className="font-medium">{experience}</span> </div>

                    <span className="text-sm text-slate-600">{
                        formatDistanceToNow(new Date(createdAt))
                    }</span>

                    <div className='flex  justify-between items-center'>
                        <span className="bg-gray-200 text-slate-600 p-1 rounded-lg text-sm">Full Time Job</span>
                        <button onClick={() => setIsModalOpen(true)}  className='text-lg text-blue-500 font-bold'>Apply</button>
                    </div>
                </div>
            </div>
        </div>

        <Apply isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}/>
     </div>
    )
}


interface LoaderData {
    job: JobListing | null
}

export const loader = async ({
    params
}: LoaderFunctionArgs): Promise<LoaderData> => {

    try {
        const res = await fetch(`https://kudoverse-backend.onrender.com/api/jobs/${params.id}`);


        if (!res.ok) {
            console.log("error happened")
            throw new Error('Failed to fetch data');
        }
        const data = await res.json();

        return data;
    } catch (error) {
        console.log(error)
        return {
            job: null
        }
    }
}

export default JobDetails
