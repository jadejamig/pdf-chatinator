import NavigationBar from '@/components/navbar'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardLoader = () => {
  return (

    <main className="flex flex-1 w-full justify-center items-center h-dvh max-h-dvh bg-zinc-950 bg-[url('/grid.svg')] p-4 md:p-10">
        <div className='flex flex-col max-w-6xl w-full h-full gap-y-6'>

          <NavigationBar/>
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <div className='flex flex-col gap-y-6 bg-zinc-900 rounded-xl py-10 px-10'>
            <div className='flex w-full justify-between'>
              <Skeleton height={30} width={150} className='text-red-500'/>
              <Skeleton height={30} width={100} className='text-red-500'/>
            </div>

            <div className='flex flex-col gap-y-2 my-4 p-4 border border-zinc-400 rounded-lg'>
              <div className='flex w-full flex-row gap-x-2 mt-2'>
                <Skeleton height={30} containerClassName="flex-1"/>
                <Skeleton height={30} containerClassName="flex-1"/>
                <Skeleton height={30} containerClassName="flex-1"/>
              </div>

              <div className="rounded-md overflow-scroll overflow-x-hidden h-[calc(100dvh-27rem)] max-h-calc(100dvh-27rem)] shadow-md">
                <Skeleton height={30} containerClassName="flex-1" count={15} className='mt-2'/>
              </div>
            </div>
            
          </div>
          </SkeletonTheme>

      </div>
    </main>
  )
}

export default DashboardLoader