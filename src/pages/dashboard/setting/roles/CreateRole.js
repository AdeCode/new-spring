import React from 'react'
import BackNav from '../../../../components/@shared/BackNav'
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../../components/@shared/InputField'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import authService from '../../../../@services/authService'


function CreateRole() {
    const navigate = useNavigate()

    const createRoleMutation = useMutation(authService.registerCustomer, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/dashboard')
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
    }

    return (
        <div>
            <BackNav
                info="Back"
            />
            <h2 className='font-bold text-xl'>Create New Role</h2>
            {/* <div className='flex justify-between mb-3'>
                <h2 className=''>Create a new role and select permissions</h2>
                <button
                    className='bg-green-700 text-white py-2 rounded-md px-5 flex items-center gap-1'
                >
                    Save New Role
                </button>
            </div> */}
            <Formik
                isValid
                initialValues={{
                    role_name: '',
                    permissions: [],
                    user_management: []
                }}
                validationSchema={
                    Yup.object({
                        role_name: Yup.string().required("Please enter role name"),
                    })
                }
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false)
                    onSubmit(values)
                }}
            >
                {({ isSubmitting, values, isValid }) => (
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
                        <div className='bg-white rounded-lg p-2 mb-2'>
                            <h2 className='font-semibold text-lg'>Overview</h2>
                            <label className='flex items-baseline gap-3'>
                                <Field 
                                    type="checkbox" 
                                    name="permissions" 
                                    value="One" 
                                    className='accent-gray'
                                />
                                <div className='flex flex-col'>
                                    <h2 className='font-semibold text-base'>Contact Support</h2>
                                    <p className='w-[300px]'>User is able to contact support with complaints and inquiries</p>
                                </div>
                            </label>
                        </div>
                        <div className='bg-white rounded-lg p-2 mb-2'>
                            <h2 className='font-semibold text-lg'>User-management</h2>
                            <div  role="group" className='flex'>
                                <label className='flex items-baseline gap-3'>
                                    <Field type="checkbox" name="user_management" value="create_user" className='accent-gray' />
                                    <div className='flex flex-col'>
                                        <h2 className='font-semibold text-base'>Create User</h2>
                                        <p className='w-[300px]'>User has access to create a user</p>
                                    </div>
                                </label>
                                <label className='flex items-baseline gap-3'>
                                    <Field type="checkbox" name="user_management" value="view_users" className='accent-gray' />
                                    <div className='flex flex-col'>
                                        <h2 className='font-semibold text-base'>View all users</h2>
                                        <p className='w-[300px]'>User has acceess to all created users</p>
                                    </div>
                                </label>
                                <label className='flex items-baseline gap-3'>
                                    <Field type="checkbox" name="user_management" value="export_users" className='accent-gray' />
                                    <div className='flex flex-col'>
                                        <h2 className='font-semibold text-base'>Export users</h2>
                                        <p className='w-[300px]'>User is able to contact support with complaints and inquiries</p>
                                    </div>
                                </label>
                            </div>
                        </div>
                        {/* <button type="submit" disabled={!isValid} className='btn w-full rounded-md py-[11px] text-white bg-green-700 text-[16px] mt-[6px]'>
                            {
                                createRoleMutation.isLoading ?
                                    "Loading..."
                                    : "Continue"
                            }
                        </button> */}
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default CreateRole