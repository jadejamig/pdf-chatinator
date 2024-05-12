import { getFileFromDb } from '@/actions/files';
import PdfViewNavBar from '@/components/pdfViewNavbar';
import { Ghost } from 'lucide-react';
import { notFound } from 'next/navigation';
import PdfRenderPage from './pdf-render';

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
        <main className='flex-1 justify-between items-center flex flex-col'>
            <div className='flex flex-col w-full h-screen max-w-6xl px-4'>

                <PdfViewNavBar file={file}/>
                
                <div className='flex flex-col lg:flex-row w-full gap-2 my-2 py-2'>
                    <PdfRenderPage pdfUrl={file.url} />
                    <div className='flex lg:flex-1/2 justify-center items-center h-full w-full bg-red-50'>
                        <Ghost className='w-10 h-10'/>
                    </div>
                </div>
                
        
            </div>
        </main>
    )
}

export default PdfChatPage