import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function UserRoles() {
    const navigate = useNavigate()
  return (
    <div>
        <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
            <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
        </Link>
        UserRoles
    </div>
  )
}

export default UserRoles