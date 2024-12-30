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
        <div className="  min-h-screen " style={{ backgroundImage: 'url("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTExMVFRUXFxobFxgYFxcYHRgXGhcXGhoaFRcYHSggGholGxcYIjEiJSkrLi4uFx8zODMtNygtLisBCgoKDg0OGhAQGi0lHSUtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALcBEwMBIgACEQEDEQH/xAAaAAADAQEBAQAAAAAAAAAAAAABAgMABAUH/8QAKxAAAgIBAwIFBAMBAQAAAAAAAAECESEDMUESUWFxgZHwBKHB0bHh8RMi/8QAGAEBAQEBAQAAAAAAAAAAAAAAAQIAAwT/xAAcEQEBAQADAQEBAAAAAAAAAAAAARECITFBEoH/2gAMAwEAAhEDEQA/APpiBdGoVHpeMyiO2CDM0BMn3Em6N1UJq5NGvhZKgSdVbFnF1kFZWC3On022/mDrklwR09OlQzdE1fGZC6ideoIJ/f37Gk+Lz6h05X4f0PwfTJ9w5qzRC187AccWvpJyT2fZPcjN9LrdfNzr1Pp11KXK3/oh9XDF+n++5041x5cU1LkzduwpY8DFJx6OjK0sjzlZD6V7rbsWXj/JxvrvL0aVIDkkqa8mUjx3F+p1LrCBV8cDm7tDPUb3Ymsnd9htKa33OrhDxi9xY4dv7nYlhEXpXfcmcl3iXT1q5x8/JSLjdY/v/SUNL9lvp9OjXGml6eCi1Eo01n+i6SWRdTST3RGr/OeOXS1mtv2dENTZNYvf9nLKJSGSrInja6ZJZ5JykKkOlkFFrxCUrz9jBp/LzuoMciyy80GMnHt+yknU+AKWRZTz5iy3NjarqZRlEVux6sC1XkaKRqGoNOAn8/QjYZaghoKM+9DwQiYbFlV5GUsZEjIMfcCE5Cakcfj/AApTRpJDKmx5um6spFF5wS4Doadq3j8l3k5zj8bQvvsWcquyerp0KnnJPqvOnXHPJlHuJBpbrHYpGaSZDpHLqJ2yVZ2pHVrQx2YFopRvcucnO8SR+IvoTq6OdrI0JVZrNaXFZ5H0n023sSnJVxbE6reF6Bit7dcJpiak6wK9TFPDEn/6eEEhtM6eRpYDo/TVuBxSY62U+slin5mUa5/wLp1Xqc+tFpr7M0bl126eq849jEY/NzBh1yavGAaMOodQJNO+7KT9OklaYtdxlGuQahmMl92U4Ix28R1Kgph0/ET/AKeBupCsI1oSNFhTzwFw4soYNhkZQpCdXzxAmSwUiSjRVbBWh9yeo1tz+BkxNaF55NGvietC1jND6Ooklh/2P/JDSV31FfE+UdXVTwu4jdGenkV/wMTddkJWrGW1nLDUzXD79/0XhOybFyhqyGWpiq9RZsRsw0ZitjyFmo14lQUrYdKTTsVy2x88Q0IWktne5T6WP/pZ9jlOv6WTVeKJ5eL4913pEdaCeOeC0ZWcv1Uc2uEcePrvz8c8p9MsMtCfVujmlEros62OEvbot+ABOhMxK0EsEnLJRMEkmLVKzdKoziwpCkvTyaxklQqjyZglgLYWwdVmA3Q6fInkaMW2YncsE0hmLsZqaPKHUuxO+Q3ZmO5G6iTkaU9l+f6DG1e9hJyJR1VlD9S5HE6nIOK+ULqcAg/GikqxVLhhkqaNpyMpW80CianhsPB7Y2Nhp+BlPxowVqyfR3GjxZgOEcK8Qr2BqXVkv+jxwV6m9KltOVJZTX3Oc0neDWGXHqR1102tvnYjqtN4zZx/T8nToSp2R+cdJy/XqktHGQRSRTV1lVIRBt+qsm9KR22MLZgOuLqCIZMtGmcwRWbAPKeKoGZR8RFhZ9CulNZTo59T+AhuZo9WBUhFF9rHUsbFoM2NHi/UEGuMmgiTFHLwJ3k3TwFy8jGiaWFnHmCI89O1T+djM51Te+fTPajPTfi6+3oBwp7b4+eg7TV/PuUhz6iea9x9Od/PwxuvPf7Agtx1ODISI0nwJ/zyaBa8f2FJY+4I4awNGQKHCsZQBFWw37AZFoSwI2u2Rk+wsogqpqN/2TcKLUKypUWJ9TfzkCjkp0XuPHTHWxtJ1juVfcSCKSg2TVSdGSs0pvhGWN8MfTBZqb+Mwsm+GjAdcTYEZo3SW5jYVIWKNQE8FknNZOqMcC0mTqsTiBqxmLYsMWCuAqQGgYtmlL4jWTc/nbBSbVYTRWLwcL1K4cpdvmxeGqttn2C8WnJvqGL15wNImq5GJvrNU9w0LWQXkQZj0uGJLcCZmPd5e4G+wNs8mUb9EZlE7HtPb55kW0kJBvbFGw66E6wUhtk59Of+F39wpg0BmUjWBC0isIt5+URbXsW0dTFGp44boLwI/wDQrpTTJuunHBYkJZKakkiH/Q0blYpRiH/R/GYrKj9RGIZdwoVilorg0B/+fz9C9JmVS/gaKwS6qWNyjljBOLlTkuAP1GslrydDIm1pRfgaHbenz+DmhK8K1+S8ZYWBsTKLjjP622Fmw1wK1xfGFe5mTULrh8vPt32DopVjL59LFcuM+O+6rGObe3mUUKfzN/PsUk0n4kirXoJQRqEVnOwWv6syQUZoDj6ge9Fb5FcaDTYShGms2VQmtp9arKKlTYGp2slpS/2/4DqvohVdVY/3xOTR1U9lnt7FSdIt7elpzxhZHUmThF0P00RXSae6MpMR2JqatfNjSG1dQ/geLOWM3WM8FoO8Ora258TWGUznezrNefJRCR0I4peQ8UwM1rv9gSdZ+efiM3T9Q9IEyvxMDoAYkVhijVRtO72FKnTWCckWkyZMVSRiZmoZ7CCy2J6ncMnwLLfs2Mgtc2qqdp8D6eo3x/pKattv0XzzK/SRpZ3LvjlPVJwfcK06a/sokaRGuuBWK9jNfPJmXmFPgCi9+QUU6fsChRYEYj6cOTXxQ7lwFqpEpxzuTnqLuUvNIk2MTU56lPZ1/HodCeDi6umSvONq2dZydMa49irE8adxTTxuSegnmlfD2LJAVvcNVZKpB9h55sj2/I9slUoTITefvgtOVuvnsDormyom9toQcd36dimlFX1Xd1kRuij01VGpg6aXHzOR9nVHPCFN/g6K+fomqjTkFIVhTvw/zgzHTZjdS7MBj/RlQqHoHTZg3WLZnHxComYtmYZeAu4sWRyzvq8jslEX/khlxNmpRjkevEcIWtIUIekPG4KSUQvjzC2Z+BmB1QsWOyUZGGs3nsaMrwhWle48VX9imFvlktSS/kq5nPOVPHPHkVIOVR1J5bd+l8eXqdenW9UyGnG3f+HRBjyTxPp9u4qi7Zryjof8EV0k1BLwBqBTZrXl87CCN+BWLEkrG0/lZyatDaUH4P8AA7jjt4iylXmUu0SuF/5uv4Hp8gjLCyZsxZc/PY1LsZSQVXkYH6mYRv5kBsOuj0BJGUjSZmK0BgeAWI0GCUvAwqaYp0ab2G6duRkh+knVSJOFClJOxGZh8gGMZiPxMjakwKXuIbUZCUixKcb3GJqTe5XSk2Bw8gSjkUjJ4+evkc9O/wA7os4Z4G09L27DuNZaVxDEEm12+dycn2M1uOmOoq7gW7zjuc8G+5nN2/0b8t+nVa2sTUZpyXuR6shIbXRLUwg6M1ujncmxo+D+eBsbXQ98ZH6lXc5tODoKzXhb9gxUrojLC+ch6s0Tiq9gWrf9gdWi1QK9xILsUigIteH3MK6+WYzLI02RhMeV70ViZQnYYxuw3gMY9jEjgGC8Nx7QJ/oGwYvuMn2JOQnVuzYdMtzbidVbjp3k2DQaMmjAozFlvgRqhpewJPAppYyA4m6QrzMGoaAhnIxKZypWaL9kKISlknK1SXz1L9D/ADXcWMStRYlHUp5+eoWHVjnGe+SOpKWPL7c5XOwxPimq8rH3+359A6UeLsTSabq0i2lm6zWPjNVSfRoppv5+xuNhepIjV4pXAyB1egHLuSs/oZsXr2A2Zj6bHiLEN5Ai2Y3UYzEjE7tNJoxiuaeBNx3ABiK6Qs4E6MYYm+g0LZjFJqeoUjK8c/oxhvgnoNmbCYklJ9JjCBU8fb3M/AxjMm5bsnLUxfz5uYwpR1PqaaSTbbS8jaesrrd/lGMVJ0N7GGrbrzz5Fq5e/JjE0xz60+Ecf/Wm7yu3vv6oxjrxjlzraqbdNVndPPku3Bf6ByV35BMF8PH12x1M5EnLNGMc87dbejQlX3ZtTUa82YxsO9Hi9vmDR9QmAnUjSkYwK+CmYxjB/9k=")' }}>
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
