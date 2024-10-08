import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { BiHomeAlt, BiLogInCircle, BiSelectMultiple } from 'react-icons/bi';
import { FaHome, FaUsers } from 'react-icons/fa';
import { BsFillPostcardFill } from 'react-icons/bs';
import { TbBrandAppleArcade } from 'react-icons/tb';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdExplore, MdOfflineBolt, MdPendingActions } from 'react-icons/md';
import { GiFigurehead } from 'react-icons/gi';
import Swal from 'sweetalert2';
import {SiGoogleclassroom,SiInstructure} from 'react-icons/si';
import {IoMdDoneAll} from 'react-icons/io';
import {IoSchoolSharp} from 'react-icons/io5'; 
import Scroll from '../hooks/useScroll';
import { RingLoader } from 'react-spinners'; 


const adminNavItems = [
    { to: "/dashboard/admin-home", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard Home" },

    { to: "/dashboard/manage-users", icon: <FaUsers className='text-2xl' />, label: "Manage Users" },

    { to: "/dashboard/manage-classes", icon: <BsFillPostcardFill className='text-2xl' />, label: "Manage Class" },

    { to: "/dashboard/manage-applications", icon: <TbBrandAppleArcade className='text-2xl' />, label: "Applications" },

]

const instructorNavItems = [
    {
    to: "/dashboard/instructor-cp",
    icon: <FaHome className='text-2xl' />,
    label: "Home"
     },
     {
        to: "/dashboard/add-class",
        icon: <MdExplore className='text-2xl' />,
        label: "Add a Class"
         },
         {
            to: "/dashboard/my-classes",
            icon: <IoSchoolSharp className='text-2xl' />,
            label: "My Classes"
             },
             {
                to: "/dashboard/my-pending",
                icon: <MdPendingActions className='text-2xl' />,
                label: "Pending Courses"
                 },
                 {
                    to: "/dashboard/my-approved",
                    icon: <IoMdDoneAll className='text-2xl' />,
                    label: "Approved Classes"
                     },
]

const students = [
    {
        to: "/dashboard/student-cp",
        icon: <BiHomeAlt className='text-2xl' />,
        label: "Dashboard"
         },
         {
            to: "/dashboard/enrolled-classes",
            icon: <SiGoogleclassroom className='text-2xl' />,
            label: "My Enroll"
             },
             {
                to: "/dashboard/my-selected",
                icon: <BiSelectMultiple className='text-2xl' />,
                label: "My Selected"
                 },
                 {
                    to: "/dashboard/my-payments",
                    icon: <MdPendingActions className='text-2xl' />,
                    label: "Payment History"
                     },
                     {
                        to: "/dashboard/apply-instructor",
                        icon: <SiInstructure className='text-2xl' />,
                        label: "Apply for Instructor"
                         },
]

const lastMenuItems = [
    {
        to: "/",
        icon: <BiHomeAlt className='text-2xl' />,
        label: "Main Home"
    },
    {
        to: "/trending",
        icon: <MdOfflineBolt className='text-2xl' />,
        label: "Trending"
    },
    {
        to: "/browse",
        icon: <GiFigurehead className='text-2xl' />,
        label: "Following"
    },
]

const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const { loader, logout } = useAuth();
    const { currentUser } = useUser();
    const navigate = useNavigate()
    const role = currentUser?.role;

        const handleLogOut =() => {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, LogOut Me!"
              }).then((result) => {
                if (result.isConfirmed) {
                    logout()
                    .then(
                        Swal.fire({
                            title: "Logged Out",
                            text: "You have been logged out successfully",
                            icon: "success"
                          })
                    ).catch((error) => console.log(error))
                }
                navigate("/")
              });
        }

    //const role = "user";

    if(loader) {
        return <div className='flex justify-center items-center h-screen'>
          <RingLoader
      color="#0000ff"
      size={100}
    />
        </div>
      }
    return (
        <div className='flex '>
            <div className={`${open ? "w-72 overflow-y-auto" : "w-[90px] overflow-auto"} bg-white h-screen p-7 md:block hidden pt-8 relative duration-300`}>
                <div className='flex gap-x-4 items-center'>
                    <img onClick={() => setOpen(!open)} src="/dash-logo.png" alt="" className={`cursor-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} />

                        <Link to="/"><h1
                        onClick={() => setOpen(!open)} 
                        className={`text-black text-2xl inline-flex gap-1 items-center font-bold dark:text-white  
                        ${!open && "scale-0"}`}>
                            GATE 
                            <img className='w-8 h-8' src="/logo.png" /></h1>
                        </Link>
                </div>

                {/*NavLinks*/}

                {/* Admin role */}

                {
                    role === "admin" && ( <ul className='pt-6'>
                        <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                        {
                            role === "admin" && adminNavItems.map((menuItem, index) => (
                                <li key={index} className='mb-2'>
                                    <NavLink to={menuItem.to}
                                        className={
                                            ({ isActive }) =>
                                                `flex ${isActive ? "bg-red-500 text-white" : "text-black"
                                                } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm 
                         items-center gap-x-4 `
                                        }
                                    >{menuItem.icon}
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                )}


                    {/* Instructor roles */}
                {
                    role === "instructor" && ( <ul className='pt-6'>
                        <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                        {
                            role === "instructor" && instructorNavItems.map((menuItem, index) => (
                                <li key={index} className='mb-2'>
                                    <NavLink to={menuItem.to}
                                        className={
                                            ({ isActive }) =>
                                                `flex ${isActive ? "bg-red-500 text-white" : "text-black"
                                                } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm 
                         items-center gap-x-4 `
                                        }
                                    >{menuItem.icon}
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                )}

                    {/*Student Roles*/}
                 {
                    role === "user" && ( <ul className='pt-6'>
                        <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                        {
                            role === "user" && students.map((menuItem, index) => (
                                <li key={index} className='mb-2'>
                                    <NavLink to={menuItem.to}
                                        className={
                                            ({ isActive }) =>
                                                `flex ${isActive ? "bg-red-500 text-white" : "text-black"
                                                } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm 
                         items-center gap-x-4 `
                                        }
                                    >{menuItem.icon}
                                        <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                    </NavLink>
                                </li>
                            ))
                        }
                    </ul>
                )}


                <ul className='pt-6'>
                    <p className={`ml-3 text-gray-500 mb-3 ${!open && "hidden"}`}><small>USEFUL LINKS</small></p>
                    {
                        lastMenuItems.map((menuItem, index) => (
                            <li key={index} className='mb-2'>
                                <NavLink to={menuItem.to}
                                    className={
                                        ({ isActive }) =>
                                            `flex ${isActive ? "bg-red-500 text-white" : "text-black"
                                            } duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm 
                         items-center gap-x-4 `
                                    }
                                >{menuItem.icon}
                                    <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                                </NavLink>
                            </li>
                        ))
                    }

                    <li>
                        <button
                        onClick={() => handleLogOut()}
                            className=" flex duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm 
                         items-center gap-x-4"
                        >
                            <BiLogInCircle className='text-2xl' />
                            <span className={`${!open && "hidden"} origin-left duration-200`}>
                                LogOut
                                </span>
                        </button>
                    </li>
                </ul>
            </div>
            <div className='h-screen overflow-y-auto px-8 flex-1'>
                <Scroll/>
                <Outlet/>
            </div>
        </div>
    )
}

export default DashboardLayout