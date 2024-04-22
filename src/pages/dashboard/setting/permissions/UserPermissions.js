import React from 'react'
import BackNav from '../../../../components/@shared/BackNav'
import PermissionsTable from '../../../../components/@tables/PermissionsTable'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getPermissions } from '../../../../@services/merchantService'
import { ThreeDots } from 'react-loader-spinner'

function UserPermissions() {
    const navigate = useNavigate()

    const gotoCreatePermission = () => {
        navigate('/settings/create-permission')
    }


    const { data: permissions, isLoading } = useQuery(['permission'], getPermissions)

    return (
        <div>
            <BackNav
                info="Manage Permissions"
            />
            <div className='flex justify-between mb-3'>
                <h3 className=''>Manage permissions within your company</h3>
                <button
                    onClick={gotoCreatePermission}
                    className='bg-green-700 text-white py-2 rounded-md px-5 flex items-center gap-1'
                >
                    Create Permission <span class="material-symbols-outlined">arrow_right_alt</span>
                </button>
            </div>
            {
                isLoading ?
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
                        <h2>Permissions</h2>
                        {
                            permissions?.permissions.length > 0 ?
                            <PermissionsTable
                                data={permissions?.permissions}
                            />
                            :
                            'You currently have no permissions, click the create permissions button above to create permission'
                            
                        }
                        
                    </>
            }

        </div>
    )
}

export default UserPermissions