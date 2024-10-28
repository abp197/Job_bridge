import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import { createColumnHelper, useReactTable, getCoreRowModel } from '@tanstack/react-table';

const AdminJobsTable = () => {
    const { allAdminJobs, searchJobByText } = useSelector(store => store.job);
    const navigate = useNavigate();

    // Filter jobs based on search text
    const filteredJobs = useMemo(() => {
        return allAdminJobs?.filter(job => {
            if (!searchJobByText) return true;
            return (
                job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
                job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
            );
        });
    }, [allAdminJobs, searchJobByText]);

    const columnHelper = createColumnHelper();

    // Define table columns
    const columns = [
        columnHelper.accessor('company.name', {
            header: 'Company Name',
            cell: ({ row }) => (
                <div className="flex items-center">
                    <Avatar.Root className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-400 shadow-md">
                        <Avatar.Image 
                            src={row.original.company.logoUrl} 
                            alt={row.original.company.name} 
                            className="object-cover w-full h-full rounded-full"
                        />
                        <Avatar.Fallback delayMs={600} className="text-white font-semibold">{row.original.company.name[0]}</Avatar.Fallback>
                    </Avatar.Root>
                    <span className="ml-3 font-medium">{row.original.company.name}</span>
                </div>
            ),
        }),
        columnHelper.accessor('title', {
            header: 'Role',
            cell: ({ getValue }) => (
                <span className="font-medium text-indigo-600">{getValue()}</span>
            ),
        }),
        columnHelper.accessor('createdAt', {
            header: 'Date',
            cell: ({ getValue }) => (
                <span className="text-gray-500">{getValue().split("T")[0]}</span> // Format the date
            ),
        }),
        columnHelper.accessor('actions', {
            header: 'Action',
            cell: ({ row }) => (
                <div className="text-right">
                    <Popover.Root>
                        <Popover.Trigger asChild>
                            <button className="text-gray-400 hover:text-gray-600">
                                <MoreHorizontal />
                            </button>
                        </Popover.Trigger>
                        <Popover.Portal>
                            <Popover.Content className="w-32 p-2 bg-white rounded-lg shadow-lg border border-gray-200">
                                <div onClick={() => navigate(`/admin/companies/${row.original._id}`)} className="flex items-center gap-2 w-fit cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                                    <Edit2 className="w-4" />
                                    <span>Edit</span>
                                </div>
                                <div onClick={() => navigate(`/admin/jobs/${row.original._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md mt-2">
                                    <Eye className="w-4" />
                                    <span>Applicants</span>
                                </div>
                                <Popover.Arrow className="fill-white" />
                            </Popover.Content>
                        </Popover.Portal>
                    </Popover.Root>
                </div>
            ),
        }),
    ];

    // Create table instance using the new Tanstack API
    const table = useReactTable({
        data: filteredJobs || [],
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full bg-white border-collapse">
                <caption className="text-left font-semibold p-4 text-xl text-gray-700 bg-gray-100 border-b">
                    A list of your recently posted jobs
                </caption>
                <thead className="bg-gray-50">
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-6 py-3 text-left text-sm font-medium text-gray-600">
                                    {header.isPlaceholder ? null : header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-50 transition-colors">
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className="px-6 py-4 text-sm text-gray-700">
                                    {cell.column.columnDef.cell ? cell.column.columnDef.cell(cell) : cell.getValue()}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminJobsTable;
