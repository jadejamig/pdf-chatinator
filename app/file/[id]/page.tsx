import { getFileFromDb } from '@/actions/files';
import PdfViewNavBar from '@/components/pdfViewNavbar';
import { Ghost } from 'lucide-react';
import React from 'react'
import PdfRenderPage from './pdf-render';
import { notFound } from 'next/navigation';

interface PdfChatPageProps {
    params: {
        id: string
    }
}

const PdfChatPage = async ({ params }: PdfChatPageProps) => {
    const { id } = params;
    const file = await getFileFromDb(id);
    
    if (!file)
        return notFound()

    return (
        <main className='flex w-full justify-center'>
            <div className='flex flex-col max-w-5xl w-full px-4'>

                <PdfViewNavBar/>
                
                <div className="w-full h-px bg-zinc-300" />
                
                <div className='flex flex-col lg:flex-row w-full gap-2 my-8 py-2'>
               
                    <div className='flex lg:flex-1 justify-center items-center w-full text-center border py-4'>
                        <PdfRenderPage pdfUrl={file.url} />
                    </div>
                    <div className='flex lg:flex-[0.75] justify-center items-center h-full w-full bg-red-50'>
                        <Ghost className='w-10 h-10'/>
                    </div>
                </div>
                
        
            </div>
        </main>
    )
}

export default PdfChatPage