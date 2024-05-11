"use client";

import { ChevronLeft, ChevronRight, Ghost } from 'lucide-react';
import { useState } from 'react';
import { Document, Outline, Page, pdfjs } from 'react-pdf'

import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';


pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

interface PdfRenderPageProps {
  pdfUrl: string
}
const PdfRenderPage = ({ pdfUrl }: PdfRenderPageProps) => {

  const [numPages, setNumPages] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(1);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  const PdfLoading = () => {
    return (
      <div className='flex flex-col gap-y-2 justify-center items-center h-[600px] w-full'>
          <Ghost className='w-10 h-10'/>
          <p>Please wait while I fetch your file.</p>
      </div>
    )
  }
  
  return (
    <div>
      <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess} loading={PdfLoading}>
        <Outline  />
        <Page pageNumber={pageNumber} height={600} />
      </Document>
      <div className='flex gap-x-2 justify-center items-center'>
        <ChevronLeft onClick={() => {
          setPageNumber((prev) => prev === 1 ? 1 : prev - 1)
        }}/>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <ChevronRight onClick={() => {
          setPageNumber((prev) => prev === numPages ? numPages : prev + 1)
        }}/>
      </div>
      
    </div>
  )
}

export default PdfRenderPage