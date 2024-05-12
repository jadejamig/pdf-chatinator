"use client"

import React from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'

const ChatInput = () => {
  return (
    <div className="flex w-full gap-2 ">
      <Textarea autoFocus rows={1} placeholder="Ask me something." className='resize-none' />
      <Button size='sm' className='flex gap-x-2 justify-center items-center'>
        Send
        <SendHorizonal className='h-4 w-4'/>
      </Button>
    </div>
  )
}

export default ChatInput