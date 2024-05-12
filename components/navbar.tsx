import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const NavigationBar = () => {
  return (
    <div className="flex flex-col justify-start items-center">
      <div className='flex justify-between items-center w-full mt-8 mb-4'>
          <Link href="/">
            <p className="font-black text-xl min-[375px]:text-3xl">PDF Chatinator</p>
          </Link>
          <Button className="flex gap-x-2" variant="ghost">
            <LogOutIcon className="h-4 w-4"/>
            <LogoutLink>Log out</LogoutLink>
          </Button>
          
      </div>
      <div className="w-full h-px bg-zinc-300" />
    </div>
  )
}

export default NavigationBar