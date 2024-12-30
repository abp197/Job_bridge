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
        <div className="  min-h-screen " style={{ backgroundImage: 'url("data:image/jpeg;base64,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")' }}>
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
