'use client'
import { setLoggedIn } from '@/lib/features/usersSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const page = () => {
  const isLoggedIn = useAppSelector(state => state.pageReducer.isLoggedIn)
  const [profilemodul, setprofilemodul] = useState(false)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const LogOut = async () => {
  router.push('/SignUp') 
  signOut()
  dispatch(setLoggedIn())
  localStorage.clear()
  router.push('/SignUp')
  }
  return (
    <div>
      <div className='w-full h-[9vh] bg-red-800 flex items-center justify-end px-5'>
          <div className="w-12 relative h-12 rounded-full bg-gray-800" onClick={() => setprofilemodul(prev => !prev)}>
            {profilemodul ? (<div className='h-32 w-24 bg-gray-300 absolute top-14 right-0 rounded-2xl flex flex-col'>
              {isLoggedIn ? <div className='w-full h-full flex-col items-center justify-center'>
                <h1 className='cursor pointer'>Guga Muchiashvili</h1>
                <h1 className='cursor-pointer' onClick={() => LogOut()}>Sign out</h1>
              </div> : <div className='w-full h-full flex items-center justify-center'><h1 className='cursor-pointer' onClick={() => {router.push('SignUp')}}>Sign in</h1></div> }
            </div>) : (<></>)}
          </div>
      </div>
    </div>
  )
}

export default page