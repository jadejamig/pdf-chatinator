import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOutIcon } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const NavigationBar = () => {
  return (
    <div className="flex flex-col justify-start items-center bg-zinc-900 rounded-xl py-5 px-10">
      <div className='flex justify-between items-center w-full '>
          <Link href="/">
            <p className="font-black text-xl min-[375px]:text-3xl bg-gradient-to-r from-emerald-400 via-emerald-500 to-lime-300  inline-block text-transparent bg-clip-text">PDF Chatinator</p>
          </Link>
          <Button className="flex gap-x-2 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50" variant="ghost">
            <LogOutIcon className="h-4 w-4"/>
            <LogoutLink>Log out</LogoutLink>
          </Button>
          
      </div>
      {/* <div className="w-full h-px bg-zinc-300" /> */}
    </div>
  )
}

export default NavigationBar