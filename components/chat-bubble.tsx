"use client";

import { useResizeDetector } from "react-resize-detector";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Bot } from "lucide-react";

interface BubbleProps {
    message: string
}

export const UserBubble = ({message}: BubbleProps) => {
    const { width, ref } = useResizeDetector()
    return (
        <div ref={ref} className="flex justify-end items-center">
            <div  style={{ maxWidth: width ? width * 0.9 : 0}}>
            <Markdown className="bg-emerald-600 text-zinc-200 px-4 py-2 text-wrap rounded-full text-sm">   
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
            <div className="flex gap-x-2 justofy-start items-start" style={{ maxWidth: width ? width * 0.9 : 0}}>
                <div className="border border-emerald-600 rounded-full p-2">
                    <Bot className="flex-none h-4 w-4 text-emerald-300 "/>
                </div>
                
                <Markdown remarkPlugins={[remarkGfm]} className="font-sans text-zinc-200 px-4 py-2 text-wrap rounded-lg text-sm shadow-sm whitespace-pre">
                    {message}
                </Markdown>
            </div>
        </div>
    )
}