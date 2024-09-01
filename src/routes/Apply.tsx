import React, { useContext, useEffect, useState } from 'react'
import { useForm, UseFormGetValues } from 'react-hook-form'
import { useNavigate, useNavigation, useParams } from 'react-router-dom'
import { AuthContext } from '../Context'

const Apply = ({
    coverLetter,
    isOpen,
    onClose,
    isEdit = false
}: {
    coverLetter?: string,
    isOpen: boolean,
    onClose: () => void,
    isEdit?: boolean
}) => {
    console.log(coverLetter, "apply")
    const [isModalOpen, setIsModalOpen] = useState(isOpen);
    const { user, isLoggedin } = useContext(AuthContext);
    useEffect(() => {
        console.log('isModalOpen', isOpen);
        setIsModalOpen(isOpen);
    }, [isOpen])

    useEffect(() => {
        if(coverLetter){
            setValue('coverLetter', coverLetter)
        }
    }, [coverLetter])




    const { register, handleSubmit, formState: {
        errors
    }, setValue } = useForm({
        defaultValues: {
            email: user?.email || '',
            name: user?.name || '',
            coverLetter: coverLetter ? coverLetter : ''
        }
    })

    const {id} = useParams();

    const onSubmit = async (data : {
        email: string,
        name: string,
        coverLetter: string
    }) => {
        let url = isEdit ? `https://kudoverse-backend.onrender.com/api/jobs/edit-application/${id}`  : `https://kudoverse-backend.onrender.com/api/jobs/apply/${id}`;
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            alert('You have already applied for this job');
            return;
        }
        const resData = await res.json();
        console.log(resData);
        alert('Application Successful');
        setIsModalOpen(false);
        onClose();

    }

    const navigate = useNavigate();

    
    
    if(!isModalOpen){
        return null;
    }
    if(!isLoggedin){
       
        setIsModalOpen(false)
        onClose()
        navigate(`/login?callback=/job/${id}`);
    }
    return (
        <div className='absolute  inset-0 h-screen w-screen bg-black/30  ' onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(false);
            onClose();
        }}>
            <div className='max-w-screen-md md:mx-auto min-h-screen w-full flex justify-center items-center px-4  '>

<form className='w-full sm:w-[540px] bg-red-50 rounded-xl shadow' onSubmit={handleSubmit(onSubmit)} onClick={(e) => {
    e.stopPropagation();
}} >
    <div className='flex flex-col gap-4 rounded-md shadow-md border-gray-50 px-4 py-4'>
        <h1 className='text-3xl font-bold'>Apply</h1>
        <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Email</label>

            <input type='email' id='email' {...register("email", {
                required: 'This field is required',
                pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Invalid email address'
                }
            })} placeholder='Enter your email' className='border p-2 rounded-md' />
            {
                errors.email && <p className='text-red-500'>{errors.email.message}</p>
            }

        </div>
        <div className='flex flex-col gap-2'>
            <label htmlFor='email'>Name</label>

            <input type='text' id='name' {...register("name", {
                required: 'This field is required',
     
            })} placeholder='Enter your Name' className='border p-2 rounded-md' />
            {
                errors.name && <p className='text-red-500'>{errors.name.message}</p>
            }

        </div>

        <div className='flex flex-col gap-2'>
            <label htmlFor='coverLetter'>Cover Letter</label>
            <textarea  id='coverLetter'
                {...register('coverLetter', {
                    required: 'This field is required',
                })}
                placeholder='Enter your coverLetter' className='border p-2 rounded-md' />

            {errors.coverLetter && <p className='text-red-500'>{errors.coverLetter.message}</p>}
        </div>
        <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>Apply</button>
    </div>
</form>
</div>
        </div>
    )
}

export default Apply
