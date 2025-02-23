'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { logout } from '@/app/(auth)/actions';
import { Check, LogOutIcon, Monitor, Moon, Sun, UserIcon } from 'lucide-react';
import Link from 'next/link';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import UserAvatar from './UserAvatar';

interface UserProps {
  id: string;
  name: string;
  email: string | null;
  avatarUrl: string;
  googleId: string | null;
  githubId: string | null;
}

interface UserButtonProps {
  className?: string;
  user: UserProps;
}

const UserButton: React.FC<UserButtonProps> = ({ className, user }) => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={className}>
          <UserAvatar
            className="rounded-full"
            avatarUrl={user.avatarUrl}
            size={40}
          />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Logged in as @{user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Link href={`/users/${user.name}`}>
          <DropdownMenuItem>
            <UserIcon className="mr-2 size-4" />
            Profile
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <Monitor className="mr-2 size-4" />
            Theme
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem onClick={() => setTheme('system')}>
                <Monitor className="mr-2 size-4" />
                System default
                {theme === 'system' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('light')}>
                <Sun className="mr-2 size-4" />
                Light
                {theme === 'light' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme('dark')}>
                <Moon className="mr-2 size-4" />
                Dark
                {theme === 'dark' && <Check className="ms-2 size-4" />}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => logout()}>
          <LogOutIcon className="mr-2 size-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserButton;
