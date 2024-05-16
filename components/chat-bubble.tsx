"use client";

import { useResizeDetector } from "react-resize-detector";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

interface BubbleProps {
    message: string
}

export const UserBubble = ({message}: BubbleProps) => {
    const { width, ref } = useResizeDetector()
    return (
        <div ref={ref} className="flex justify-end items-center">
            <div  style={{ maxWidth: width ? width * 0.9 : 0}}>
            <Markdown className="bg-blue-500 text-white px-4 py-2 text-wrap rounded-md text-sm">   
               {message}
            </Markdown>
            </div>
        </div>
    )
}

export const AIBubble = ({message}: BubbleProps) => {
    const { width, ref } = useResizeDetector()
    return (
        <div ref={ref} className="flex justify-start items-center">
            <div style={{ maxWidth: width ? width * 0.9 : 0}}>
            <Markdown remarkPlugins={[remarkGfm]} className=" bg-zinc-50 text-black px-4 py-2 border border-zinc-200 text-wrap rounded-lg text-sm shadow-sm whitespace-pre">
                {message}
            </Markdown>
            </div>
        </div>
    )
}