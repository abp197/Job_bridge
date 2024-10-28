import React, { useEffect, useState } from 'react';
import Avatar from 'react-avatar';
import { Popover } from '@headlessui/react';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <div className="overflow-x-auto p-4">
            <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
                <caption className="text-left px-6 py-4 text-lg font-semibold text-gray-700 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-t-lg shadow-md">
                    Recent Registered Companies
                </caption>
                <thead>
                    <tr className="bg-gray-200 text-sm leading-normal">
                        <th className="px-6 py-3 text-left font-bold text-gray-700">Logo</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left font-bold text-gray-700">Date</th>
                        <th className="px-6 py-3 text-right font-bold text-gray-700">Action</th>
                    </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {filterCompany?.map((company) => (
                        <tr key={company._id} className="border-b border-gray-200 hover:bg-gray-100 transition duration-150">
                            <td className="px-6 py-4">
                                <Avatar 
                                    name={company.name} 
                                    src={company.logo} 
                                    round={true} 
                                    size="40" 
                                    className="shadow-md transform hover:scale-105 transition-transform duration-300"
                                />
                            </td>
                            <td className="px-6 py-4 font-medium">{company.name}</td>
                            <td className="px-6 py-4">{company.createdAt.split("T")[0]}</td>
                            <td className="px-6 py-4 text-right">
                                <Popover className="relative">
                                    <Popover.Button className="outline-none focus:ring-2 ring-offset-2 ring-indigo-500">
                                        <MoreHorizontal className="cursor-pointer transform hover:scale-110 transition-transform duration-300 text-gray-700" />
                                    </Popover.Button>
                                    <Popover.Panel className="absolute right-0 z-10 w-32 mt-2 bg-white border border-gray-200 shadow-xl rounded-lg">
                                        <div 
                                            onClick={() => navigate(`/admin/companies/${company._id}`)} 
                                            className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-100 p-2 rounded transition-colors duration-150"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
                                        </div>
                                    </Popover.Panel>
                                </Popover>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CompaniesTable;
