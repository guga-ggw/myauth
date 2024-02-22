'use client'
import Form from '../components/Form'
import React, { useState } from 'react'

function page() {
  const [regtype, setreg] = useState('SignUp')
  return (
    <div className='w-full flex justify-center items-center h-[100vh] bg-[#b4aeae]'>
        <Form type={'SignUp'}/>
    </div>
  )
}

export default page