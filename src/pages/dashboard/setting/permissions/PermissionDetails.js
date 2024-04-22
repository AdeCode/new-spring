import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from 'react-query'
import { getPermission } from '../../../../@services/merchantService'

function PermissionDetails() {
    const {permissionId} = useParams()

    const {data:permission, isLoading, error, isError} = useQuery(['permission',{permissionId}], getPermission)

  return (
    <div>PermissionDetails for {permissionId}</div>
  )
}

export default PermissionDetails