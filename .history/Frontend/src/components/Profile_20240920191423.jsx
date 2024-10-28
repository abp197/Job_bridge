import React, { useState } from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import AppliedJobTable from './AppliedJobTable';
import UpdateProfileDialog from './UpdateProfileDialog';
import { Contact, Mail, Pen } from 'lucide-react';

const isResume = true;

const Profile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div>
            <Navbar />
            <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
                <div className='flex justify-between'>
                    <div className='flex items-center gap-4'>
                        <img 
                            src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg" 
                            alt="profile" 
                            className="h-24 w-24 rounded-full" 
                        />
                        <div>
                            <h1 className='font-medium text-xl'>{user?.fullname}</h1>
                            <p>{user?.profile?.bio}</p>
                        </div>
                    </div>
                    <button 
                        onClick={() => setOpen(true)} 
                        className="text-right border border-gray-300 rounded-md px-2 py-1"
                    >
                        <Pen />
                    </button>
                </div>
                <div className='my-5'>
                    <div className='flex items-center gap-3 my-2'>
                        <Mail />
                        <span>{user?.email}</span>
                    </div>
                    <div className='flex items-center gap-3 my-2'>
                        <Contact />
                        <span>{user?.phoneNumber}</span>
                    </div>
                </div>
                <div className='my-5'>
                    <h1>Skills</h1>
                    <div className='flex items-center gap-1'>
                        {
                            user?.profile?.skills.length !== 0 
                                ? user?.profile?.skills.map((item, index) => (
                                    <span key={index} className='bg-blue-100 text-blue-700 py-1 px-2 rounded'>
                                        {item}
                                    </span>
                                  )) 
                                : <span>NA</span>
                        }
                    </div>
                </div>
                <div className='grid w-full max-w-sm items-center gap-1.5'>
                    <label className="text-md font-bold">Resume</label>
                    {
                        isResume 
                            ? <a 
                                target='_blank' 
                                rel='noopener noreferrer' 
                                href={user?.profile?.resume} 
                                className='text-blue-500 w-full hover:underline cursor-pointer'
                              >
                                {user?.profile?.resumeOriginalName}
                              </a> 
                            : <span>NA</span>
                    }
                </div>
            </div>
            <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
                <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
                {/* Applied Job Table */}
                <AppliedJobTable />
            </div>
            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </div>
    );
}

export default Profile;
