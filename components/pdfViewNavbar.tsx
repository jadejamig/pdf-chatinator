"use client";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuGroup } from '@/components/ui/dropdown-menu';
import { File } from '@prisma/client';
import { ChevronLeft, MoreHorizontal, RotateCcw, Trash } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

interface PdfViewNavBarProps {
  file: File
}

const PdfViewNavBar = ({ file }: PdfViewNavBarProps) => {
  return (
    <div className='flex flex-col justify-center items-center w-full'>
    <div className='flex justify-between items-center w-full gap-x-6'>
      <Button variant='ghost' className='p-0'>
        <Link href="/dashboard" className='flex gap-x-2 items-center'>
          <ChevronLeft className='h-4 w-4'/>
          PDF List
        </Link>
      </Button>

      <p className='truncate text-sm font-semibold'>{file.name}</p>

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
              <DropdownMenuItem className='text-red-600 focus:text-red-700'>
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