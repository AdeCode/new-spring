import React from 'react'
import BackNav from '../../../../components/@shared/BackNav'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../../components/@shared/InputField'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import authService from '../../../../@services/authService'
import { useQuery } from 'react-query'
import { getPermissions, createRole } from '../../../../@services/merchantService'
import { ThreeDots } from 'react-loader-spinner'



function CreateRole() {
    const navigate = useNavigate()

    const { data: permissions, isLoading } = useQuery(['permission'], getPermissions)
    permissions && console.log(permissions)


    const createRoleMutation = useMutation(createRole, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/settings/user-roles')
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        console.log(values)
        createRoleMutation.mutate(values)
    }

    return (
        <div>
            <BackNav
                info="Back"
            />
            <h2 className='font-bold text-xl'>Create New Role</h2>
            <Formik
                isValid
                initialValues={{
                    role_name: '',
                    permissions: [],
                }}
                validationSchema={
                    Yup.object({
                        role_name: Yup.string().required("Please enter role name"),
                        permissions: Yup.array().min(1, 'Select at least 1 invoice permission'),
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
                            <h2 className=''>Create a new role and select permissions</h2>
                            <button
                                type="submit"
                                className='bg-green-700 text-white py-2 rounded-md px-5 flex items-center gap-1'
                            >
                                {
                                    createRoleMutation.isLoading ?
                                        "Loading..."
                                        : "Save New Role"
                                }
                            </button>
                        </div>
                        <div className='w-[400px]'>
                            <InputField
                                name='role_name'
                                type='text'
                                label='Role Name'
                                placeholder='e.g. Olawale'
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
                                <>
                                    {
                                        permissions?.permissions.map((permission, index) => (
                                            <div className='bg-white rounded-lg p-2 mb-2' key={index}>
                                                <h2 className='font-semibold text-lg'>{permission[0].group_name}</h2>
                                                <div role="group" className='flex flex-wrap'>
                                                    {
                                                        permission?.map((permit, index) => (
                                                            <label className='flex items-baseline gap-3 py-2' key={index}>
                                                                <Field
                                                                    type="checkbox"
                                                                    name="permissions"
                                                                    value={permit.permission_id}
                                                                    className='accent-gray'
                                                                    checked={values.permissions.includes(permit.permission_id)}
                                                                    onChange={(e) => {
                                                                        const isChecked = e.target.checked;
                                                                        if (isChecked) {
                                                                            setFieldValue('permissions', [...values.permissions, permit.permission_id]);
                                                                        } else {
                                                                            setFieldValue('permissions', values.permissions.filter(item => item !== permit.permission_id));
                                                                        }
                                                                    }}
                                                                />
                                                                <div className='flex flex-col'>
                                                                    <h2 className='font-semibold text-base'>{permit.permission_name}</h2>
                                                                    <p className='w-[250px] text-sm'>{permit.description}</p>
                                                                </div>
                                                            </label>
                                                        ))
                                                    }
                                                </div>
                                            </div>
                                        ))

                                    }
                                    <ErrorMessage name='permissions' component="div" className='text-red-500' />
                                </>
                        }
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateRole