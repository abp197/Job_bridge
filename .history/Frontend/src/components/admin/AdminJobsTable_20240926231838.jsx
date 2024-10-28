import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';
import { useTablefrom '@tanstack/react-table';

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

    // Define table columns
    const columns = useMemo(
        () => [
            {
                accessorKey: 'company.name',
                header: 'Company Name',
                cell: ({ row }) => (
                    <div className="flex items-center">
                        <Avatar.Root className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-gray-400">
                            <Avatar.Image 
                                src={row.original.company.logoUrl} 
                                alt={row.original.company.name} 
                                className="object-cover w-full h-full rounded-full"
                            />
                            <Avatar.Fallback delayMs={600}>{row.original.company.name[0]}</Avatar.Fallback>
                        </Avatar.Root>
                        <span className="ml-2">{row.original.company.name}</span>
                    </div>
                )
            },
            {
                accessorKey: 'title',
                header: 'Role'
            },
            {
                accessorKey: 'createdAt',
                header: 'Date',
                cell: ({ getValue }) => getValue().split("T")[0]
            },
            {
                accessorKey: 'actions',
                header: 'Action',
                cell: ({ row }) => (
                    <div className="text-right">
                        <Popover.Root>
                            <Popover.Trigger asChild>
                                <button>
                                    <MoreHorizontal />
                                </button>
                            </Popover.Trigger>
                            <Popover.Portal>
                                <Popover.Content className="w-32 p-2 bg-white rounded shadow-md">
                                    <div onClick={() => navigate(`/admin/companies/${row.original._id}`)} className="flex items-center gap-2 w-fit cursor-pointer">
                                        <Edit2 className="w-4" />
                                        <span>Edit</span>
                                    </div>
                                    <div onClick={() => navigate(`/admin/jobs/${row.original._id}/applicants`)} className="flex items-center w-fit gap-2 cursor-pointer mt-2">
                                        <Eye className="w-4" />
                                        <span>Applicants</span>
                                    </div>
                                    <Popover.Arrow className="fill-white" />
                                </Popover.Content>
                            </Popover.Portal>
                        </Popover.Root>
                    </div>
                )
            }
        ],
        [navigate]
    );

    // Create table instance using tanstack v8 API
    const table = createTable().setRowModel({
        core: getCoreRowModel()
    });

    const tableInstance = useTable({
        data: filteredJobs,
        columns,
        table
    });

    return (
        <div>
            <table className="min-w-full bg-white border-collapse">
                <caption className="text-left font-medium p-2">A list of your recently posted jobs</caption>
                <thead>
                    {tableInstance.headerGroups.map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className="px-4 py-2 border-b">
                                    {header.renderHeader()}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {tableInstance.rows.map(row => (
                        <tr key={row.id} className="hover:bg-gray-100">
                            {row.cells.map(cell => (
                                <td key={cell.id} className="px-4 py-2 border-b">
                                    {cell.renderCell()}
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
