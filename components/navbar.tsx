import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { LogOutIcon, MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

const NavigationBar = () => {
  return (
    <div className="flex justify-center items-center bg-zinc-900 rounded-xl py-5 md:py-8 px-4 md:px-10">
      <div className='flex justify-between items-center w-full '>
          <Link href="/">
            <p className="font-black text-xl md:text-3xl bg-gradient-to-r
             from-emerald-400 via-emerald-500 to-lime-300  inline-block text-transparent bg-clip-text">
              PDF Chatinator
            </p>
          </Link>
          <Button className="gap-x-2 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50 hidden md:flex" variant="ghost">
            <LogOutIcon className="h-4 w-4"/>
            <LogoutLink>Log out</LogoutLink>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-zinc-700 md:hidden">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4 text-zinc-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-zinc-700 border-none focus:border-none hover:border-none">
              <DropdownMenuItem className="flex justify-center items-center gap-x-2 text-zinc-50 focus:text-zinc-50 focus:bg-zinc-600 border-none focus:border-none hover:border-none">
                  {/* <Button className="gap-x-2 text-zinc-50 hover:bg-zinc-800 hover:text-zinc-50 hidden md:flex" variant="ghost"> */}
                    <LogOutIcon className="h-4 w-4"/>
                    <LogoutLink className="border-none hover:border-none">Log out</LogoutLink>
                  {/* </Button> */}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
      </div>
      {/* <div className="w-full h-px bg-zinc-300" /> */}
    </div>
  )
}

export default NavigationBar