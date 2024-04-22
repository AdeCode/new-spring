import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import UsersTable from '../../components/@tables/UsersTable'
import { Modal } from '@mui/material'
import CreateUserModal from '../../components/@shared/CreateUserModal'
import { getUsers } from '../../@services/merchantService'
import { useQuery } from 'react-query'

function UserSettings() {
    const navigate = useNavigate()

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const { data: users, isLoading } = useQuery(['users'], getUsers)


  return (
    <div>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}
            >
                <CreateUserModal
                    handleClose={handleClose}
                />
            </Modal>
        <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
            <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
        </Link>
        <div className='text-gray font-medium text-lg mb-4'>Settings</div>
        <div className='flex justify-between'>
            <h2 className='text-base font-medium mb-4'>Manage Users</h2>
            <button 
              className='flex items-center'
              onClick={()=>setOpen(true)}
            >
              Create new user <span className="material-symbols-outlined">add_circle</span>
            </button>
        </div>
        <h3 className=''>Users</h3>
        {
          isLoading ? 
          'Loading...' :
          <UsersTable
            data={users?.user_accounts}
          />
        }
        
    </div>
  )
}

export default UserSettings