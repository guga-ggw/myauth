'use client'
import Form from '../components/Form'
import React, { useEffect } from 'react'

const page = () => {

  useEffect(() => {
    localStorage.clear()
  },[])
  return (
    <div className='w-full flex justify-center items-center h-[100vh] bg-[#b4aeae]'>
        <Form type={'SignIn'}/>
    </div>
  )
}

export default page