"use client";

import { logout } from '@/app/(auth)/actions'
import React from 'react'

const Logout = () => {
  return (
    <div>
            <button onClick={() => {logout()}} className="px-3 py-2 rounded-xl bg-rose-600 absolute">LOGOUT</button>

    </div>
  )
}

export default Logout
