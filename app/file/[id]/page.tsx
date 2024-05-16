export const maxDuration = 30;

import { getFileFromDb } from '@/actions/files';
import PdfViewNavBar from '@/components/pdfViewNavbar';
import { Ghost } from 'lucide-react';
import { notFound } from 'next/navigation';
import PdfRenderPage from './pdf-render';
import ChatWrapper from './chat-wrapper';

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
        <main className="flex flex-col flex-1 justify-between items-center h-dvh bg-zinc-950 bg-[url('/grid.svg')]">
            <div className='flex flex-col w-full max-w-6xl px-4'>

                <PdfViewNavBar file={file}/>
                
                <div className='flex flex-col md:flex-row w-full gap-4 my-4'>
                    <PdfRenderPage pdfUrl={file.url} />
                    <ChatWrapper fileId={file.id}/>
                </div>
                
        
            </div>
        </main>
    )
}

export default PdfChatPage