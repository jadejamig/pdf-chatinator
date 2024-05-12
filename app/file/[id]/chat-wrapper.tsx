import ChatInput from '@/components/chat-input'
import Messages from '@/components/messages'
import { Ghost } from 'lucide-react'
import React from 'react'

const ChatWrapper = () => {
  return (
    <div className='flex lg:flex-1/2 justify-center items-center h-full w-full'>
      <div className='flex flex-col w-full h-[calc(100dvh-5rem)] justify-between gap-2'>
        <Messages />
        <ChatInput />
      </div>
      
    </div>
  )
}

export default ChatWrapper