// "use client";

import { getUserFiles } from '@/actions/files'
import NavigationBar from '@/components/navbar'
import UploadButton from '@/components/upload-button'
import { File } from '@prisma/client';
import { useTransition, useState, useEffect } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Ghost, Loader, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Dashboard = async () => {

  const retrievedfiles = await getUserFiles();

  return (
    <main className='flex w-full justify-center h-screen '>
        <div className='flex flex-col max-w-5xl w-full px-4'>

            <NavigationBar/>
            
            <div className="w-full h-px bg-zinc-300" />
          
            <div className='flex flex-row gap-x-2 mt-8'>
              {/* <UploadButton/> */}
            </div>

            {(retrievedfiles && retrievedfiles.length !== 0) ? (
                  <DataTable columns={columns} data={retrievedfiles} />
              ) : false ? (
                <div className='flex flex-col justify-center items-center h-full gap-y-2 my-4'>
                  <Loader className='animate-spin w-8 h-8'/>
                  <p className='font-semibold text-lg'>Hold on while we fetch your files.</p>
                  <p className='text-zinc-500 text-sm font-medium'>Go touch some grass first.</p>
                </div>
              ) : (
                <div className='flex flex-col justify-center items-center gap-y-2 h-full my-4'>
                  <Ghost className='w-10 h-10'/>
                  <p className='font-semibold text-lg'>{"It's a bit lonely around here..."}</p>
                  <p className='text-zinc-500 text-sm font-medium'>Upload your first PDF.</p>
                </div>
              )
            }
    
        </div>
    </main>
  )
}

export default Dashboard