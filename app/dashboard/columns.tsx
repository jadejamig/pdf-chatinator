"use client"

import { File } from ".prisma/client";
import { deleteFileById } from "@/actions/files";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { CellContext, ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { BiSolidFilePdf } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";
import { MouseEventHandler } from "react";
import { UTApi } from 'uploadthing/server';
import { useRouter } from "next/navigation";

const CellAction = ({ row }: CellContext<File, unknown>) => {
  const file = row.original;
  const { toast } = useToast();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem 
          className='text-red-600 focus:text-red-700 bg-red-100/50'
          onClick={ async () => {
            const { success } = await deleteFileById(file.key)
                  
                  if (!success) {
                    toast({
                      duration: 4000,
                      variant: "default",
                      description: `💥 Something went wrong, couldn't delete the file!`
                    })
                    return
                  }

                  toast({
                    duration: 4000,
                    variant: "success",
                    description: `🗑 Deleted successfully!`
                  })

                  router.refresh();
          }}
        >
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete file</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export const columns: ColumnDef<File>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            File name
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({row}) => (
        <Link href={`/file/${row.original.id}`} className="flex items-center justify-start gap-x-2 cursor-pointer">
            <BiSolidFilePdf className="h-7 w-7 text-blue-500"/>
            <p className="max-w-xs truncate">
                {row.original.name}
            </p>
        </Link>
    )
  },
  {
    accessorKey: "uploadStatus",
    header: "Status",
  },
  {
    accessorKey: "updatedAt",
    header: "Last modified",
    cell: ({row}) => {
        const updatedAt = row.original.updatedAt as Date
    return (
        <div className="">
            <p className="">
                {updatedAt.toLocaleDateString('en-us', { weekday:"short", year:"numeric", month:"short", day:"numeric"}) }
            </p>
        </div>
    )}
  },
  {
    id: "actions",
    cell: CellAction,
  }
]
