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
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { BiSolidFilePdf } from "react-icons/bi";
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link";
import { MouseEventHandler } from "react";
import { UTApi } from 'uploadthing/server';

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
    cell: ({ row }) => {
      const file = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
                <Button 
                  variant='destructive' 
                  className="flex gap-x-2 w-full"
                  onClick={ async () => await deleteFileById(file.key)} //await deleteFileById(file.id)
                >
                    <Trash className="h-4 w-4"/>
                    Delete File
                </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  }
]
