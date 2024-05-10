"use client";

import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import Dropzone from 'react-dropzone'
import { BiSolidFilePdf } from 'react-icons/bi'
import { Progress } from './ui/progress';

const UploadDropZone = () => {
    const [isUploading, setIsUploading] = useState<boolean>(true)

    return (
        <Dropzone multiple={false}  onDrop={(droppedFile) => { console.log(droppedFile)}}>
            {({getInputProps, getRootProps, acceptedFiles}) => (
                <div {...getRootProps()} className='border h-64 border-dashed border-gray-300 rounded-lg cursor-pointer bg-zinc-50'>
                    <div className='flex flex-col gap-y-2 justify-center items-center h-full w-full'>
                        <Plus className='text-zinc-500'/>
                        <p className='text-sm text-zinc-500'>
                            <span className='font-semibold'>{"Click to upload "}</span>
                            or drag and drop.
                        </p>
                        <p className='text-xs text-zinc-500'>{"PDF (up to 4MB)"}</p>

                        {(acceptedFiles && acceptedFiles[0]) && (
                            <div className='flex justify-center items-center gap-x-2 text-zinc-500
                                font-medium text-xs px-2 py-1 mt-2 bg-zinc-200 rounded-md'
                            >
                                <BiSolidFilePdf className="h-7 w-7 text-blue-500 "/>
                                <div className='truncate overflow-hidden max-w-xs'>
                                    {acceptedFiles[0].name}
                                </div>
                            </div>
                        )}

                        { true && (
                                <div className='w-full mt-4 max-w-xs mx-auto'>
                                    <Progress value={50} className='h-1 w-full bg-zinc-200' />
                                </div>
                            )}
                        </div>
                        
                    </div>
            )}
        </Dropzone>
    )
}

export default UploadDropZone