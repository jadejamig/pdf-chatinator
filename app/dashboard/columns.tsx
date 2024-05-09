"use client"

import { File } from ".prisma/client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Trash } from "lucide-react";
import { BiSolidFilePdf } from "react-icons/bi";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { deleteFileById } from "@/actions/files";
import { useRouter } from "next/router";



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
        <div className="flex items-center gap-x-2 cursor-pointer">
            <BiSolidFilePdf className="h-7 w-7 text-blue-500"/>
            <p className="">
                {row.getValue("name")}
            </p>
        </div>
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
        const updatedAt = row.getValue("updatedAt") as Date
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
      const file = row.original

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
                  onClick={async () => {
                     await deleteFileById(file.id)
                  }}
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
