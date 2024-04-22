import React from 'react'
import BackNav from '../../../../components/@shared/BackNav'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../../components/@shared/InputField'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getGroupPermissions, createPermission } from '../../../../@services/merchantService'
import TextField from '../../../../components/@shared/TextField'
import { ThreeDots } from 'react-loader-spinner'


function CreatePermission() {
    const navigate = useNavigate()

    const { data: groupPermissions, isLoading } = useQuery(['group-permission'], getGroupPermissions)

    const CreatePermissionMutation = useMutation(createPermission, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/settings/user-permissions')
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        CreatePermissionMutation.mutate(values)
    }

    return (
        <div>
            <BackNav
                info="Back"
            />
            <h2 className='font-bold text-xl'>Create Permission</h2>
            <Formik
                isValid
                initialValues={{
                    permission_name: '',
                    permission_description: '',
                    permission_group_id: ''
                }}
                validationSchema={
                    Yup.object({
                        permission_name: Yup.string().required("Permission name is missing"),
                        permission_description: Yup.string().required("Permission description is missing"),
                        permission_group_id: Yup.string().required("Select a permission group"),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    onSubmit(values)
                }}
            >
                {({ isSubmitting, values, isValid, setFieldValue }) => (
                    <Form className='flex flex-col'>
                        <div className='flex justify-between mb-3'>
                            <h2 className=''>Create a new permissions</h2>
                            <button
                                type="submit"
                                className='bg-green-700 text-white py-2 rounded-md px-5 flex items-center gap-1'
                            >
                                {
                                    CreatePermissionMutation.isLoading ?
                                        "Loading..."
                                        : "Save Permission"
                                }
                            </button>
                        </div>
                        <div className='w-[400px]'>
                            <InputField
                                name='permission_name'
                                type='text'
                                label='Permission Name'
                                placeholder='e.g. Olawale'
                            />
                        </div>
                        <div className='w-[400px]'>
                            <TextField
                                name='permission_description'
                                type='text'
                                label='Permission Description'
                                placeholder='Enter description'
                                component="textarea"
                                rows='4'
                            />
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
                            <div className='bg-white rounded-lg p-2 mb-2'>
                                <h2 className='font-semibold text-lg'>Permission Group</h2>
                                <p className=''>Select a permission group</p>
                                <div  role="group" aria-labelledby="my-radio-group" className='flex gap-5'>
                                    {
                                        groupPermissions.permission_groups.map(permission => (
                                            <label className='flex items-baseline gap-1'>
                                                <Field type="radio" 
                                                    name="permission_group_id" 
                                                    value={values.permission_group_id} 
                                                    className='accent-gray' 
                                                    checked={values.permission_group_id === permission.group_id}
                                                    onChange={() => setFieldValue("permission_group_id", permission.group_id)}
                                                />
                                                <div className='flex flex-col'>
                                                    <h2 className='font-semibold text-base'>{permission.group_name}</h2>
                                                </div>
                                            </label>
                                        ))
                                    }
                                </div>
                                <ErrorMessage name='permission_group_id' component="div" className='text-red-500'/>
                            </div>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreatePermission