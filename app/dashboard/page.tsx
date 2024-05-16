import { getUserFiles } from '@/actions/files';
import NavigationBar from '@/components/navbar';
import { columns } from './columns';
import { DataTable } from './data-table';

const Dashboard = async () => {
  
  const retrievedfiles = await getUserFiles();

  return (
    <main className="flex flex-1 w-full justify-center items-center h-dvh max-h-dvh bg-zinc-950 bg-[url('/grid.svg')] p-10">
        <div className='flex flex-col max-w-6xl w-full h-full gap-y-6'>

            <NavigationBar/>
            
            <DataTable columns={columns} data={retrievedfiles ?? []} />
            
        </div>
    </main>
  )
}

export default Dashboard