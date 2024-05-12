"use client";

import { ScrollArea } from '@/components/ui/scroll-area';
import { LoaderPinwheel } from 'lucide-react';
import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { useResizeDetector } from "react-resize-detector";

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfRenderPageProps {
  pdfUrl: string
}
const PdfRenderPage = ({ pdfUrl }: PdfRenderPageProps) => {

  const [numPages, setNumPages] = useState<number>();

  const { width, ref } = useResizeDetector()

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const PdfLoading = () => {
    return (
      <div className='flex flex-col gap-y-2 justify-center items-center h-[600px] w-full'>
          <LoaderPinwheel className='w-10 h-10 animate-spin font-light'/>
          <p>{"Please wait while I fetch your file :)"}</p>
      </div>
    )
  }

  return (
    
    <div ref={ref} className='flex lg:flex-1/2 justify-center items-center w-full text-center border rounded-md py-4'>
        <ScrollArea className='h-[calc(100vh-7rem)] max-h-calc(100vh-7rem)]'>
          <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={PdfLoading}>
            { Array.from(Array(numPages).keys()).map((n) => (
              <Page key={n} pageNumber={n+1} width={width ? width * 0.8 : 100} />
              ))
            }
          </Document>
        </ScrollArea>
    </div>
  )
}

export default PdfRenderPage