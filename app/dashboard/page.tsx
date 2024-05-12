import { getUserFiles } from '@/actions/files';
import NavigationBar from '@/components/navbar';
import { Ghost, Loader } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { cn } from '@/lib/utils';

const Dashboard = async () => {
  
  const retrievedfiles = await getUserFiles();

  return (
    <main className={cn("flex w-full justify-center", !retrievedfiles?.length ? "h-screen" : "")}>
        
        <div className='flex flex-col max-w-6xl w-full px-4'>

            <NavigationBar/>
            
            <div className="w-full h-px bg-zinc-300" />
          
            <div className='flex flex-row gap-x-2 mt-8'>
              {/* <UploadButton/> */}
            </div>
            
            <DataTable columns={columns} data={retrievedfiles ?? []} />
            
        </div>
    </main>
  )
}

export default Dashboard