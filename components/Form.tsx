'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const Form = ({type} : {type : string}) => {
    const navigate = useRouter()



  
  type TSignUpSchema = z.infer<typeof SignUpSchema>
  type TSignInSchema = z.infer<typeof SignInSchema>

  const SignUpSchema = z.object({
    NickName : z.string().min(5, 'character must be at least 5 characters'),
    email: z.string().email('enter valid email'),
    password: z.string().min(8, 'passwords must be at least 8 characters'),
    confirmPassword: z.string().min(8, 'confirm passwords must be at least 8 characters')
  }).refine((data) => data.confirmPassword == data.password, {
    message : "Passwords doesn't match",
    path : ['confirmPassword']
  })

  const SignInSchema = z.object({
    Lemail: z.string().email('enter valid email'),
    Lpassword: z.string().min(8, 'passwords must be at least 8 characters'),
  })


  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm<TSignInSchema | TSignUpSchema>({
    resolver : zodResolver(type == "SignUp" ? SignUpSchema : SignInSchema),
  })

  const CreateUser = (data) => {
    console.log(data)
  }

  const LogIn = (data) => {
    console.log(data)
  }
  return (
    <div className='w-5/6 h-4/6 bg-black lg:w-1/3 rounded-lg bg-opacity-50 xl:w-3/7'>
        {type == 'SignUp' ? 
        (
            <form onSubmit={handleSubmit(CreateUser)} className='w-full h-full rounded-lg flex items-center justify-around flex-col'>
                <h1 className='text-3xl text-white font-black'>Sign Up</h1>
                <input type="text" className='w-2/3 h-12 rounded-lg px-2 text-[12px] outline-none' placeholder='Enter UserName' {...register('NickName')}/>
                {errors?.NickName && <span className="text-[red] text-[10px]">{errors.NickName.message}</span>}
                <input type="email" className='w-2/3 h-12 rounded-lg px-2 text-[12px] outline-none' placeholder='Enter email' {...register('email')}/>
                {errors?.email && <span className="text-[red] text-[10px]">{errors.email.message}</span>}
                <input type="password" className='w-2/3 h-12 rounded-lg px-2 text-[12px] outline-none' placeholder='Enter password' {...register('password')}/>
                {errors?.password && <span className="text-[red] text-[10px]">{errors.password.message}</span>}
                <input type="password" className='w-2/3 h-12 rounded-lg px-2 text-[12px] outline-none' placeholder='Confirm password' {...register('confirmPassword')}/>
                {errors?.confirmPassword && <span className="text-[red] text-[10px]">{errors.confirmPassword.message}</span>}
                <button className='px-5 bg-gray-700 py-3 text-white rounded-xl'>Create Account</button>
                <p className='text-sm mt-[-20px] underline text-white cursor-pointer' onClick={() => navigate.push('SignIn') }>Already have an account?</p>
            </form>
        ) 
        : (
            <form onSubmit={handleSubmit(LogIn)} className='w-full h-full rounded-lg flex items-center justify-around flex-col'>
                <h1 className='text-3xl text-white font-black'>Sign Up</h1>
                <input type="email" className='w-2/3 h-12 rounded-lg px-2 text-[12px] outline-none' placeholder='Enter email' {...register('Lemail')}/>
                {errors?.Lemail && <span className="text-[red] text-[10px]">{errors.Lemail.message}</span>}
                <input type="password" className='w-2/3 h-12 rounded-lg px-2 text-[12px] outline-none' placeholder='Enter password' {...register('Lpassword')}/>
                {errors?.Lpassword && <span className="text-[red] text-[10px]">{errors.Lpassword.message}</span>}
                <button className='px-5 bg-gray-700 py-3 text-white rounded-xl'>Create Account</button>
                <p className='text-sm mt-[-20px] underline text-white cursor-pointer' onClick={() => navigate.push('SignUp') }>Do not have an account?</p>
            </form>
        )
        }
    </div>
  )
}

export default Form