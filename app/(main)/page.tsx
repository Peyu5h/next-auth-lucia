import { validateRequest } from '@/auth';
import React from 'react';
import { logout } from '../(auth)/actions';
import UserButton from '@/components/UserButton';

export default async function Page() {
  const { user } = await validateRequest();
  console.log(user);
  return (
    <div className="mx-auto mt-12 max-w-md">
      {user && (
        <div className="flex w-full items-center justify-between gap-x-4">
          <div>
            <div className="">Welcome {user.name}</div>
            <div className="">{user.email}</div>
          </div>
          <UserButton className="rounded-full" user={user} />
        </div>
      )}
    </div>
  );
}
