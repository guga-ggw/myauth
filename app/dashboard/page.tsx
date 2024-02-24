'use client'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React from 'react'

const page = () => {
  const router = useRouter()
  const LogOut = async () => {
  router.push('/SignUp') 
  signOut()
  }
  return (
    <div>
      <button onClick={() => LogOut()} className='w-24 h-5 bg-red-600 p-5 text-center rounded-lg text-white'>LogOut</button>
    </div>
  )
}

export default page