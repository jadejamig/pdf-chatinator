"use client";

import { ChatContextProvider } from '@/Context/chat-context';
import ChatInput from '@/components/chat-input';
import Messages from '@/components/messages';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient()

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatContextProvider fileId={fileId}>
      <div className='flex lg:flex-1/2 justify-center items-center h-full w-full'>
        <div className='flex flex-col w-full h-[calc(100dvh-5rem)] justify-between gap-2'>
          <Messages />
          <ChatInput />
        </div>
        
      </div>
      </ChatContextProvider>
    </QueryClientProvider>
  )
}

export default ChatWrapper