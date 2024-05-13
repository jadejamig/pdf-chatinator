"use client"

import React, { useContext } from 'react'
import { Textarea } from './ui/textarea'
import { Button } from './ui/button'
import { SendHorizonal } from 'lucide-react'
import { ChatContext } from '@/Context/chat-context'

const ChatInput = () => {
  const { addMessage, handleInputChange, message, isLoading } = useContext(ChatContext)

  return (
    <div className="flex w-full gap-2 items-end">
      <Textarea autoFocus rows={1} 
                placeholder="Ask me something." 
                className='resize-none text-base' 
                onChange={handleInputChange} 
                value={message} 
                disabled={isLoading}
      />
      <Button className='flex gap-x-2 justify-center items-center px-6' onClick={addMessage} disabled={isLoading}>
        Send
        <SendHorizonal className='h-4 w-4'/>
      </Button>
    </div>
  )
}

export default ChatInput