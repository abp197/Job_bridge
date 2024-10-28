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
        <div
            className="min-h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
            style={{ backgroundImage: `url('/images/background.png')` }}
        >
            <div className="overflow-x-auto bg-white bg-opacity-90 shadow-xl rounded-lg p-6 backdrop-blur-sm">
                <table className="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
                    <caption className="text-left p-4 text-gray-500">A list of your recent registered companies</caption>
                    <thead>
                        <tr className="bg-gradient-to-r from-gray-100 to-gray-200">
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Logo</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Name</th>
                            <th className="px-6 py-3 text-left font-semibold text-gray-600">Date</th>
                            <th className="px-6 py-3 text-right font-semibold text-gray-600">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterCompany?.map((company) => (
                            <tr key={company._id} className="border-t border-gray-200 hover:bg-gray-100 transition">
                                <td className="px-6 py-4">
                                    <Avatar name={company.name} src={company.logo} round={true} size="40" />
                                </td>
                                <td className="px-6 py-4">{company.name}</td>
                                <td className="px-6 py-4">{company.createdAt.split("T")[0]}</td>
                                <td className="px-6 py-4 text-right">
                                    <Popover className="relative">
                                        <Popover.Button className="outline-none focus:ring-2 ring-offset-2 ring-gray-300">
                                            <MoreHorizontal className="cursor-pointer" />
                                        </Popover.Button>
                                        <Popover.Panel className="absolute right-0 z-10 w-32 mt-2 bg-white border border-gray-200 shadow-lg rounded-md">
                                            <div
                                                onClick={() => navigate(`/admin/companies/${company._id}`)}
                                                className="flex items-center gap-2 w-full cursor-pointer hover:bg-gray-100 p-2 rounded"
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
        </div>
    );
};

export default CompaniesTable;
