import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useNavigation } from 'react-router-dom'

const Login = () => {

    const {register, handleSubmit, formState: {
        errors
    }} = useForm({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit = async (data: {
        email: string,
        password: string
    }) => {

        const res = await fetch('http://localhost:8000/api/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if(!res.ok){
            alert('Failed to login');
            return;
        }
        const resData = await res.json();
        localStorage.setItem('token', resData.token);
        localStorage.setItem('user', JSON.stringify(resData.user));
        navigate('/');
        
    }

    const navigate = useNavigate();

    
  return (
    <div className='max-w-screen-md md:mx-auto min-h-screen w-full flex justify-center items-center px-4 '>

        <form className='w-full sm:w-[540px]' onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-4 rounded-md shadow-md border-gray-50 px-4 py-4'>
                <h1 className='text-3xl font-bold'>Login</h1>
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
                <label htmlFor='password'>Password</label>
                <input type='password' id='password'
                {...register('password', {
                    required: 'This field is required',
                })}
                placeholder='Enter your password' className='border p-2 rounded-md'/>
                
                {errors.password && <p className='text-red-500'>{errors.password.message}</p>}
                </div>
                <button type='submit' className='bg-blue-400 text-white p-2 rounded-md'>Login</button>
            </div>
        </form>
    </div>
  )
}

export default Login
