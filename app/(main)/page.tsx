
import { validateRequest } from '@/auth'
import React from 'react'
import { logout } from '../(auth)/actions'
import Logout from '@/components/Logout'
import { UserButton } from '@/components/UserButton'

export default async function Page() {
const {user} = await validateRequest()
console.log(user)
  return (
    <div>
    <div>
      {user && <UserButton user={user}/>}
    </div>
    </div>
  )
}

