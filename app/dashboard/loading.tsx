import NavigationBar from '@/components/navbar'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const DashboardLoader = () => {
  return (
    <main className={"flex w-full justify-center"}>
        
      <div className='flex flex-col max-w-5xl w-full px-4'>

          <NavigationBar/>
          
          <div className="w-full h-px bg-zinc-300" />

          <div className='flex flex-col gap-y-2 my-4'>
            <div className='flex w-full justify-between mt-8'>
              <Skeleton height={30} width={300} />
              <Skeleton height={30} width={100} />
            </div>

            <div className='flex flex-col gap-y-2 my-4 p-4 border rounded-lg'>
              <div className='flex w-full flex-row gap-x-2 mt-2'>
                <Skeleton height={30} containerClassName="flex-1"/>
                <Skeleton height={30} containerClassName="flex-1"/>
                <Skeleton height={30} containerClassName="flex-1"/>
              </div>

              <div className='w-full mt-2'>
                <Skeleton height={30} containerClassName="flex-1" count={15} className='mt-2'/>
              </div>
            </div>
            
          </div>

      </div>
    </main>
  )
}

export default DashboardLoader