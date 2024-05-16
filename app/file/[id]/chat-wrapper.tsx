"use client";

import ChatSection from '@/components/chat-section';

const ChatWrapper = ({ fileId }: { fileId: string }) => {
  return (
      <div className='flex lg:flex-1/2 justify-center items-center h-full w-full'>
          <ChatSection fileId={fileId} />
      </div>
  )
}

export default ChatWrapper