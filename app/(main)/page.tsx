
import { validateRequest } from '@/auth'
import React from 'react'
import { logout } from '../(auth)/actions'
import { UserButton } from '@/components/UserButton'

export default async function Page() {
const {user} = await validateRequest()
console.log(user)
  return (
    <div className='max-w-md mx-auto mt-12'>
      {user && 
      (
        <div className='flex items-center gap-x-4 w-full justify-between'>
          <div>
            <div className="">Welcome {user.name}</div>
            <div className="">{user.email}</div>
          </div>
          <UserButton user={user}/>
      </div>
      )
      }
    </div>
  )
}

