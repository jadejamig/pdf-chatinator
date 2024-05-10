import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

const PdfViewNavBar = () => {
  return (
    <div className='flex justify-between items-center w-full pt-8 pb-4'>
        <Link href="/dashboard" className='flex gap-x-2 items-center'>
          <ArrowLeft className='h-5 w-5'/>
          Back
        </Link>
    </div>
  )
}

export default PdfViewNavBar