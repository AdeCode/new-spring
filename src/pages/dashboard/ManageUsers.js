import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function ManageUsers() {
    const navigate = useNavigate()
  return (
    <div>
        <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
            <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
        </Link>
        <div className='text-gray font-medium text-lg mb-8'>Settings</div>
        <div className='flex flex-col'>
            <h2 className='text-base font-medium mb-4'>Users Management</h2>
            <p className='mb-6 text-base'>Manage who can access your company's profile</p>
            <div className='flex gap-4'>
                <Link to='/settings/user-settings' className='flex gap-4 bg-white py-3 px-2 rounded-md cursor-pointer'>
                    <span class="material-symbols-outlined bg-gray w-[50px] h-[50px] rounded-[50%] flex items-center justify-center text-white">group</span>
                    <div className='flex flex-col mt-3'>
                        <div className='flex gap-2 items-center text-[#4BCA69]'>
                            <h3 className=''>Manage Users</h3><span class="material-symbols-outlined">trending_flat</span>
                        </div>
                        <h4 className='w-[200px] text-gray'>Manage users within your company</h4>
                    </div>
                </Link>
                <Link to='/settings/user-roles' className='flex gap-4 bg-white py-3 px-2 rounded-md cursor-pointer'>
                    <span class="material-symbols-outlined bg-gray w-[50px] h-[50px] rounded-[50%] flex items-center justify-center text-white">shuffle_on</span>
                    <div className='flex flex-col mt-3'>
                        <div className='flex gap-2 items-center text-[#4BCA69]'>
                            <h3 className=''>Manage Roles</h3><span class="material-symbols-outlined">trending_flat</span>
                        </div>
                        <h4 className='w-[200px] text-gray'>Manage user roles within your company</h4>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default ManageUsers