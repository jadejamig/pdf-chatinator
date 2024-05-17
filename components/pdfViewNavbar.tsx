"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { File } from '@prisma/client';
import { ChevronLeft, MoreHorizontal, RotateCcw, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { deleteFileById } from '@/actions/files';
import { useRouter } from 'next/navigation';

interface PdfViewNavBarProps {
  file: File
}

const PdfViewNavBar = ({ file }: PdfViewNavBarProps) => {
  // const { toast } = useToast();
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center w-full bg-zinc-900 text-zinc-50 rounded-xl mt-4'>
      <div className='flex justify-between items-center w-full gap-x-8 px-2'>
        <Button variant='ghost' className='py-0 hover:bg-zinc-800 text-zinc-50 hover:text-zinc-50'>
          <Link href="/dashboard" className='flex gap-x-2 items-center'>
            <ChevronLeft className='h-4 w-4'/>
            Dashboard
          </Link>
        </Button>

        <p className='truncate text-sm font-semibold max-w-xl'>{file.name}</p>

        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="py-0 hover:bg-zinc-800 hover:text-zinc-50">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className='bg-zinc-700 border-none'>
              <DropdownMenuGroup className='bg-zinc-700'>
                {/* <DropdownMenuItem className='bg-zinc-700 focus:bg-zinc-600 text-zinc-200 focus:text-zinc-200'>
                  <RotateCcw className="mr-2 h-4 w-4" />
                  <span>Reset chat</span>
                </DropdownMenuItem> */}
                <DropdownMenuItem 
                  className='text-red-500 focus:text-red-500 bg-zinc-700 focus:bg-zinc-600'
                  onClick={ async () => {
                    const { success } = await deleteFileById(file.key)
                    
                    if (!success) {
                      toast.error("Something went wrong, couldn't delete the file.")
                      // toast({
                      //   duration: 4000,
                      //   variant: "default",
                      //   description: `💥 Something went wrong, couldn't delete the file!`
                      // })
                      return
                    }

                    toast.success("Deleted successfully!")
                    router.push('/dashboard')

                  }}
                >
                  <Trash className="mr-2 h-4 w-4" />
                  <span>Delete file</span>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
    </div>
  )
}

export default PdfViewNavBar