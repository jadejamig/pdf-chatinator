"use client";

import { Plus } from 'lucide-react'
import React, { Dispatch, SetStateAction, useState } from 'react'
import Dropzone from 'react-dropzone'
import { BiSolidFilePdf } from 'react-icons/bi'
import { Progress } from './ui/progress';
import { useUploadThing } from '@/lib/uploadthing';
import { useToast } from './ui/use-toast';
import { useRouter } from 'next/navigation';

interface DropzoneProps {
    setIsOpen:  Dispatch<SetStateAction<boolean>>
}

const UploadDropZone = ({ setIsOpen }: DropzoneProps) => {
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [isError, setIsError] = useState<boolean>(false);

    const { toast } = useToast();
    const router = useRouter();

    const { startUpload } = useUploadThing(
        "pdfUploader",
        {   
            onClientUploadComplete: ([res]) => {
                
                setIsOpen(false);
                router.refresh();
                toast({
                    duration: 4000,
                    variant: "success",
                    description: `🎉 Successfully uploaded pdf ${res.name}`
                })
            },
            onUploadError: (e) => {
                toast({
                    duration: 2000,
                    variant: "destructive",
                    description: e.message //"Something went wrong! Couldn't upload your file."
                })
            }
        },
    );

    const startSimulatedProgress = () => {
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    return prevProgress
                }

                return prevProgress + 5
            })
        }, 500)

        return interval
    }

    return (
        <Dropzone
            noClick={true}
            multiple={false}  
            onDrop={ async (droppedFile) => { 
                setIsError(false);
                setIsUploading(true);
                const progressInterval = startSimulatedProgress();
                
                const res = await startUpload(droppedFile);

                if (!res) {
                    clearInterval(progressInterval);
                    setUploadProgress(0);
                    setIsUploading(false);
                    setIsError(true);
                    return
                }

                clearInterval(progressInterval);
                setUploadProgress(100);
                setIsUploading(false);
            }}
        >
            {({getInputProps, getRootProps, acceptedFiles, open}) => (
                <div {...getRootProps()} className='border h-64 border-dashed border-zinc-500 rounded-lg cursor-pointer bg-zinc-800'
                    onClick={open}
                >
                    <div className='flex flex-col gap-y-2 justify-center items-center h-full w-full'>
                        <input {...getInputProps()} />
                        <Plus className='text-zinc-400'/>
                        <p className='text-sm text-zinc-400'>
                            <span className='font-semibold'>{"Click to upload "}</span>
                            or drag and drop.
                        </p>
                        <p className='text-xs text-zinc-500'>{"One PDF at a time (up to 4MB)"}</p>

                        {(acceptedFiles && acceptedFiles[0] && !isError) && (
                            <div className='flex justify-center items-center gap-x-2 text-zinc-500
                                font-medium text-xs px-2 py-1 mt-2 bg-zinc-200 rounded-md'
                            >
                                <BiSolidFilePdf className="h-7 w-7 text-blue-500 "/>
                                <div className='truncate overflow-hidden max-w-xs'>
                                    {acceptedFiles[0].name}
                                </div>
                            </div>
                        )}

                        { isUploading && (
                            <div className='w-full mt-4 max-w-xs mx-auto'>
                                <Progress value={uploadProgress} className='h-1 w-full bg-zinc-200' />
                            </div>
                        )}
                    </div>
                        
                </div>
            )}
        </Dropzone>
    )
}

export default UploadDropZone