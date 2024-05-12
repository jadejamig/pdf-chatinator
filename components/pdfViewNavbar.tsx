"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { File } from '@prisma/client';
import { ChevronLeft, MoreHorizontal, RotateCcw, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { deleteFileById } from '@/actions/files';
import { useRouter } from 'next/navigation';

interface PdfViewNavBarProps {
  file: File
}

const PdfViewNavBar = ({ file }: PdfViewNavBarProps) => {
  const { toast } = useToast();
  const router = useRouter();
  return (
    <div className='flex flex-col justify-center items-center w-full'>
    <div className='flex justify-between items-center w-full gap-x-8'>
      <Button variant='ghost' className='p-0'>
        <Link href="/dashboard" className='flex gap-x-2 items-center'>
          <ChevronLeft className='h-4 w-4'/>
          Dashboard
        </Link>
      </Button>

      <p className='truncate text-sm font-semibold max-w-xl'>{file.name}</p>

      <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <RotateCcw className="mr-2 h-4 w-4" />
                <span>Reset chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className='text-red-600 focus:text-red-700'
                onClick={ async () => {
                  const { success } = await deleteFileById(file.key)
                  
                  if (!success) {
                    toast({
                      duration: 4000,
                      variant: "default",
                      description: `💥 Something went wrong, couldn't delete the file!`
                    })
                    return
                  }

                  toast({
                    duration: 4000,
                    variant: "success",
                    description: `🗑 Deleted successfully!`
                  })
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

    <div className="w-full h-px bg-zinc-300" />
    </div>
  )
}

export default PdfViewNavBar