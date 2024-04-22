import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import InputField from './InputField'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getRoles, getSubUser, updateUser } from '../../@services/merchantService';
import { toast } from 'react-toastify'
import { ThreeDots } from 'react-loader-spinner'


function UpdateUserModal({ handleClose, userId }) {
    const queryClient = useQueryClient()
    const { data: user, isLoading } = useQuery(['user', { userId }], getSubUser)
    const { data: roles, isLoading: roleLoading } = useQuery(['roles'], getRoles)
   

    let rolesArr = []
    const getIds = (roles) => {
        roles?.forEach((role) => {
            rolesArr.push(role.role_id)
        })
        return rolesArr
    }

    const updateUserMutation = useMutation(updateUser, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('users')
            handleClose()
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        updateUserMutation.mutate(values)
    }

    return (
        <div className='bg-white w-[400px] px-3 py-2'>
            <div className='flex justify-between'>
                <h2 className='font font-medium'>Update User</h2>
                <span
                    className="cursor-pointer material-symbols-outlined text-base"
                    onClick={() => handleClose()}
                >
                    cancel
                </span>
            </div>
            <p className='text-sm'>Update user details accordingly</p>
            {
                isLoading ? 
                    <div className='flex w-full justify-center'>
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
                    </div>
                    :
                    <div className=''>
                        <Formik
                            isValid
                            initialValues={{
                                first_name: user?.user_accounts?.first_name,
                                last_name: user?.user_accounts?.last_name,
                                email: user?.user_accounts?.email,
                                roles: [...rolesArr]
                            }}
                            validationSchema={
                                Yup.object({
                                    first_name: Yup.string().required('first name is required'),
                                    last_name: Yup.string().required('last name is required'),
                                    email: Yup.string().email("Invalid email address")
                                        .required("email field can not be empty"),
                                    roles: Yup.array().min(1, 'Select at least one role')
                                })
                            }
                            onSubmit={(values, { setSubmitting }) => {
                                setSubmitting(false)
                                onSubmit(values)

                            }}
                        >
                            {({ isSubmitting, isValid, handleChange, handleBlur, values, errors, setFieldValue }) => (
                                <Form>
                                    <div className='flex flex-col py-2'>
                                        <div className='flex w-full gap-4 py-3'>
                                            <div className='grow flex-col gap-4'>
                                                <div className='grow'>
                                                    <InputField
                                                        name='first_name'
                                                        type='text'
                                                        label='First Name'
                                                        placeholder='e.g. Dayo Adelabu'
                                                    />
                                                </div>
                                                <div className='grow'>
                                                    <InputField
                                                        name='last_name'
                                                        type='text'
                                                        label='Last Name'
                                                        placeholder='e.g. Dayo Adelabu'
                                                    />
                                                </div>
                                                <div className='grow'>
                                                    <InputField
                                                        name='email'
                                                        type='email'
                                                        label='Email'
                                                        placeholder='e.g. mymail@gmail.com'
                                                    />
                                                </div>
                                                <div className='grow'>
                                                    <div role="group">
                                                        <h2 className='font-medium text-base text-label mb-[6px]'>Select Role</h2>
                                                        <div className='flex flex-wrap gap-3'>
                                                            {
                                                                roles?.roles.length > 0 ?
                                                                    roles?.roles.map((role, index) => (
                                                                        <label className='flex items-center gap-1' key={index}>
                                                                            <Field
                                                                                type="checkbox"
                                                                                name="roles"
                                                                                value={role.role_id}
                                                                                className='accent-gray'
                                                                                checked={values.roles.includes(role.role_id)}
                                                                                onChange={(e) => {
                                                                                    const isChecked = e.target.checked;
                                                                                    if (isChecked) {
                                                                                        setFieldValue('roles', [...values.roles, role.role_id]);
                                                                                    } else {
                                                                                        setFieldValue('roles', values.roles.filter(item => item !== role.role_id));
                                                                                    }
                                                                                }}
                                                                            />
                                                                            <h3 className='font-medium text-sm'>{role.role_name}</h3>
                                                                        </label>
                                                                    ))
                                                                    :
                                                                    '*Please create roles to select from'
                                                            }
                                                        </div>
                                                        <ErrorMessage name='roles' component="div" className='text-red-500' />
                                                    </div>
                                                </div>

                                                <div className='flex justify-end items-center grow'>
                                                    <button type="submit" className='btn bg-green-700 hover:bg-green-600 w-full cursor-pointer rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                                        {
                                                            updateUserMutation.isLoading ?
                                                                "Loading..."
                                                                : "UPDATE"
                                                        }
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
            }
        </div>
    )
}

export default UpdateUserModal
