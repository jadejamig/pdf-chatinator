"use client"

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { useState } from "react";
import UploadButton from "@/components/upload-button";
import { Ghost } from "lucide-react";
import { useResizeDetector } from "react-resize-detector";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {

    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        state: {
            sorting,
            columnFilters,
        },
    })

    return (
        <div className="flex flex-col gap-y-6 bg-zinc-900 rounded-xl py-5 md:py-10 px-4 md:px-10">
            <div className="flex justify-between items-center gap-x-2 ">
                <Input
                    placeholder="Filter name..."
                    value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("name")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm shadow-sm"
                />

                <UploadButton/>
                
            </div>
            <div className="w-full">
                <div className="rounded-md border border-zinc-400 overflow-auto overflow-x-hidden
                                h-[calc(100dvh-19rem)] max-h-[calc(100dvh-19rem)]
                                md:h-[calc(100dvh-25rem)] md:max-h-calc(100dvh-25rem)] shadow-md">
                <Table className="">
                    <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                            </TableHead>
                            )
                        })}
                        </TableRow>
                    ))}
                    </TableHeader>
                    
                    <TableBody>
                    
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                        <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                            {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id}>
                                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                            ))}
                        </TableRow>
                        ))
                    ) : (
                        <TableRow>
                        <TableCell colSpan={columns.length} className="text-center">
                        <div className='flex flex-col justify-center items-center gap-y-2 my-10 h-full'>
                            <Ghost className='w-6 h-6 text-zinc-700'/>
                            <p className='text-zinc-600 font-medium text-sm'>{"It's a bit lonely around here..."}</p>
                            <p className='text-zinc-500 text-xs font-normal'>{"Upload your first PDF :)"}</p>
                        </div>
                        </TableCell>
                        </TableRow>
                    )}
                    
                    </TableBody>
                    
                    
                </Table>
                </div>
            </div>
            <div className="flex items-center justify-end space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="text-white bg-zinc-700"
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="text-white bg-zinc-700"
                >
                    Next
                </Button>
            </div>

        </div>
    )
}
