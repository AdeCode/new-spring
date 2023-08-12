import React from 'react'
import BackNav from '../../components/@shared/BackNav'
import RolesTable from '../../components/@tables/RolesTable'
import {useNavigate} from 'react-router-dom'
import { useQuery } from 'react-query'
import merchantService from '../../@services/merchantService'

function UserRoles() {
  const navigate = useNavigate()

  const gotoCreateRole = () => {
    navigate('/settings/create-role')
  }
  
  const { data: roles, isLoading: roleLoading } = useQuery(['roles'], merchantService.getRoles)
  roles&&console.log(roles)
  return (
    <div>
        {/* <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
            <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
        </Link> */}
        <BackNav
          info="Manage Roles"
        />
        <div className='flex justify-between mb-3'>
          <h3 className=''>Manage roles within your company</h3>
          <button 
            onClick={gotoCreateRole}
            className='bg-green-700 text-white py-2 rounded-md px-5 flex items-center gap-1'
          >
            Create Role <span class="material-symbols-outlined">arrow_right_alt</span>
          </button>
        </div>
        <h2>Roles</h2>
        <RolesTable/>
    </div>
  )
}

export default UserRoles