import React from 'react'
import BackNav from '../../../../components/@shared/BackNav'
import RolesTable from '../../../../components/@tables/RolesTable'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getRoles } from '../../../../@services/merchantService'
import { ThreeDots } from 'react-loader-spinner'


function UserRoles() {
  const navigate = useNavigate()

  const gotoCreateRole = () => {
    navigate('/settings/create-role')
  }

  const { data: roles, isLoading: roleLoading } = useQuery(['roles'], getRoles)

  return (
    <div>
      <BackNav
        info="Manage Roles"
      />
      <div className='flex justify-between mb-3'>
        <h3 className=''>Manage roles within your company</h3>
        <button
          onClick={gotoCreateRole}
          className='bg-green-700 text-white py-2 rounded-md px-5 flex items-center gap-1'
        >
          Create Role <span className="material-symbols-outlined">arrow_right_alt</span>
        </button>
      </div>
      <h2>Roles</h2>
      {
        roleLoading ?
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#4fa94d"
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName=""
            visible={true}
          />
          :
          <>
            {
              roles.roles.length > 0 ?
              <RolesTable
                data={roles?.roles}
              />
              :
              'You currently have no roles available, click the create role button above to create a new role'
            }
          </>
          
      }
    </div>
  )
}

export default UserRoles