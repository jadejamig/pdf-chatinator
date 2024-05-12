import { getUserFiles } from '@/actions/files';
import NavigationBar from '@/components/navbar';
import { Ghost, Loader } from 'lucide-react';
import { columns } from './columns';
import { DataTable } from './data-table';
import { cn } from '@/lib/utils';

const Dashboard = async () => {
  
  const retrievedfiles = await getUserFiles();

  return (
    <main className={"flex flex-1 w-full justify-center items-center"}>
        <div className='flex flex-col max-w-6xl w-full h-dvh max-h-dvh gap-y-6 px-4'>

            <NavigationBar/>
            
          
            {/* <div className='flex flex-row gap-x-2 mt-8'>
              <UploadButton/>
            </div> */}
            
            <DataTable columns={columns} data={retrievedfiles ?? []} />
            
        </div>
    </main>
  )
}

export default Dashboard