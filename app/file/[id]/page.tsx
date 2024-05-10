import PdfViewNavBar from '@/components/pdfViewNavbar';
import { Ghost } from 'lucide-react';
import React from 'react'

interface PdfChatPageProps {
    params: {
        id: string
    }
}

const PdfChatPage = ({ params }: PdfChatPageProps) => {
    const { id } = params;

    return (
        <main className='flex w-full justify-center h-screen '>
            <div className='flex flex-col max-w-5xl w-full px-4'>

                <PdfViewNavBar/>
                
                <div className="w-full h-px bg-zinc-300" />
                
                <div className='flex flex-col lg:flex-row w-full h-full gap-2 bg-red-100 justify-center items-center my-8'>
                    <div className='flex lg:flex-1 justify-center items-center h-full w-full bg-red-50'>
                        <Ghost className='w-10 h-10'/>
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