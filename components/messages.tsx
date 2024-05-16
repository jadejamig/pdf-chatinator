"use client"

import React from 'react'
import { AIBubble, UserBubble } from './chat-bubble'
import { useInfiniteQuery } from '@tanstack/react-query'
import { Message } from '@prisma/client'

// NOT USED !!!!
const Messages = ({ fileId }: { fileId: string }) => {

  const fetchMessages = async ({ pageParam }: { pageParam: string | null }) => {
    const res = await fetch(`/api/message?cursor=${pageParam}&fileId=${fileId}`)
    return res.json()
  }
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['messages'],
    queryFn: fetchMessages,
    initialPageParam: null,
    getNextPageParam: (lastPage, pages) => lastPage.nextCursor,
  })

  return (
    <div className='grid w-full gap-4 overflow-scroll overflow-x-hidden rounded-md shadow px-4 pb-4'>
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      {
        status === 'pending' ? (<p>Loading...</p>) :
        status === 'error' ? (<p>Error: {error.message}</p>) :
        (
          data.pages.map((group, i) => (
            <div key={i} className='flex flex-col-reverse gap-y-4 '>
              {group.data.map((message: Message) => {
                { return message.isUserMessage ? <UserBubble key={message.id} message={message.text}  /> : <AIBubble key={message.id}  message={message.text} /> }
              })}
            </div>
          ))
        )
      }

      
    </div>
  )
}

export default Messages

const dummyMessage = [
  {
    author: "user",
    content: "message1"
  },
  {
    author: "assistant",
    content: "message2"
  },
  {
    author: "user",
    content: "message3"
  },
  {
    author: "assistant",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Amet aliquam id diam maecenas ultricies. Lacus viverra vitae congue eu consequat. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Et netus et malesuada fames ac turpis egestas sed. Turpis egestas sed tempus urna et. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Orci dapibus ultrices in iaculis nunc sed augue. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Vitae et leo duis ut diam quam nulla porttitor. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh."
  },
  {
    author: "user",
    content: "message5"
  },
  {
    author: "assistant",
    content: "message6"
  },
  {
    author: "user",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Rhoncus est pellentesque elit ullamcorper dignissim cras tincidunt lobortis. Amet aliquam id diam maecenas ultricies. Lacus viverra vitae congue eu consequat. Accumsan in nisl nisi scelerisque eu ultrices vitae auctor eu. Et netus et malesuada fames ac turpis egestas sed. Turpis egestas sed tempus urna et. Ornare arcu dui vivamus arcu felis bibendum ut tristique et. Dolor sit amet consectetur adipiscing elit pellentesque habitant morbi. Orci dapibus ultrices in iaculis nunc sed augue. Vitae semper quis lectus nulla at volutpat diam ut venenatis. Dignissim convallis aenean et tortor at risus viverra adipiscing at. Vitae et leo duis ut diam quam nulla porttitor. Mattis pellentesque id nibh tortor id aliquet lectus proin nibh."
  },
  {
    author: "assistant",
    content: "message8"
  },
  {
    author: "user",
    content: "message9"
  },
  {
    author: "assistant",
    content: "message10"
  },
]