// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { Contact, Mail, Pen } from 'lucide-react';
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'


const isResume = true;

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div className=" bg-blue-600 opacity-10 min-h-screen ">
            <Navbar />
            <div className="max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-lg mt-10 p-8">
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-6">
                        <img 
                            src={user?.profile?.profilePhoto || "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"} 
                            alt="profile" 
                            className="h-28 w-28 rounded-full border border-gray-300 object-cover" 
                        />
                        <div>
                            <h1 className="font-semibold text-2xl text-gray-800">{user?.fullname || "John Doe"}</h1>
                            <p className="text-gray-500">{user?.profile?.bio || "No bio available"}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setOpen(true)} 
                        className="flex items-center gap-2 border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition"
                    >
                        <Pen size={20} />
                        <span>Edit</span>
                    </button>
                </div>
                <div className="my-8">
                    <div className="flex items-center gap-3 my-3 text-gray-600">
                        <Mail size={22} />
                        <span>{user?.email || "No email available"}</span>
                    </div>
                    <div className="flex items-center gap-3 my-3 text-gray-600">
                        <Contact size={22} />
                        <span>{user?.phoneNumber || "No phone number available"}</span>
                    </div>
                </div>
                <div className="my-8">
                    <h2 className="text-lg font-semibold text-gray-700 mb-4">Skills</h2>
                    <div className="flex flex-wrap gap-2">
                        {
                            user?.profile?.skills?.length !== 0 
                                ? user?.profile?.skills.map((item, index) => (
                                    <span key={index} className="bg-blue-100 text-blue-700 py-1 px-3 rounded-full text-sm">
                                        {item}
                                    </span>
                                  )) 
                                : <span className="text-gray-500">No skills added</span>
                        }
                    </div>
                </div>
                <div className="my-8">
                    <label className="text-md font-semibold text-gray-700">Resume</label>
                    <div className="mt-2">
                        {isResume ? (
                            <a 
                                target='_blank' 
                                rel='noopener noreferrer' 
                                href={user?.profile?.resume} 
                                className="text-blue-500 hover:underline"
                            >
                                {user?.profile?.resumeOriginalName || "Download Resume"}
                            </a> 
                        ) : (
                            <span className="text-gray-500">No resume uploaded</span>
                        )}
                    </div>
                </div>
            </div>
            <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-lg mt-8 p-8">
                <h2 className="font-bold text-xl text-gray-800 mb-5">Applied Jobs</h2>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
};

export default Profile;
