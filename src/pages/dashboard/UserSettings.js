import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserSettings() {
    const navigate = useNavigate()
  return (
    <div>
        <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
            <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
        </Link>
        <div className='text-gray font-medium text-lg mb-8'>Settings</div>
        <div className='flex justify-between'>
            <h2 className='text-base font-medium mb-4'>Manage Users</h2>
            <button className='flex items-center'>Create new user <span class="material-symbols-outlined">add_circle</span></button>
        </div>
        UserSettings
    </div>
  )
}

export default UserSettings