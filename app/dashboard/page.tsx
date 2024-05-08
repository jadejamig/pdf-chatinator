import NavigationBar from '@/components/navbar'
import React from 'react'

const Dashboard = () => {
  return (
    <div className='flex w-full justify-center items-center'>
        <div className='flex flex-col max-w-5xl w-full justify-end'>
             <NavigationBar/>
             <div className="w-full h-px bg-zinc-300" /> 
        </div>
    </div>
  )
}

export default Dashboard