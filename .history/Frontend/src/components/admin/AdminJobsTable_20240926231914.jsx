import React, { useMemo } from 'react';
import { useTable } from '@tanstack/react-table';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import * as Avatar from '@radix-ui/react-avatar';
import * as Popover from '@radix-ui/react-popover';

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
                Header: 'Company Name',
                accessor: 'company.name', // Access nested company name
                Cell: ({ row }) => (
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
                Header: 'Role',
                accessor: 'title'
            },
            {
                Header: 'Date',
                accessor: 'createdAt',
                Cell: ({ value }) => value.split("T")[0] // Format the date
            },
            {
                Header: 'Action',
                accessor: 'actions',
                Cell: ({ row }) => (
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

    // Create table instance
    const tableInstance = useTable({ columns, data: filteredJobs });

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = tableInstance;

    return (
        <div>
            <table {...getTableProps()} className="min-w-full bg-white border-collapse">
                <caption className="text-left font-medium p-2">A list of your recently posted jobs</caption>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()} className="px-4 py-2 border-b">
                                    {column.render('Header')}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map(row => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()} className="hover:bg-gray-100">
                                {row.cells.map(cell => (
                                    <td {...cell.getCellProps()} className="px-4 py-2 border-b">
                                        {cell.render('Cell')}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default AdminJobsTable;
