import { Form, Formik, Field } from 'formik';
import React from 'react'
import InputField from './InputField'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import merchantService from '../../@services/merchantService';
import { toast } from 'react-toastify'
import SelectField from './SelectField';


function CreateUserModal ({handleClose}) {
    const queryClient = useQueryClient()
    const { data: countries, isLoading: countriesLoading } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    )

    const updateVATMutation = useMutation(merchantService.updateVat, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('vats')
            handleClose()
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        //console.log(values)
        updateVATMutation.mutate(values)
    }

    return (
        <div className='bg-white w-[400px] px-3 py-2'>
            <div className='flex justify-between'>
                <h2 className='font font-medium'>Create New User</h2>
                <span 
                    className="cursor-pointer material-symbols-outlined text-base"
                    onClick={()=>handleClose()}
                >
                    cancel
                </span>
            </div>
            <p className='text-sm'>Input user details accordingly</p>
            <div className=''>
            <Formik
                isValid
                initialValues={{
                    full_name: '',
                    email: '',
                    role: []
                }}
                validationSchema={
                    Yup.object({
                        full_name: Yup.string().required('Name field is required'),
                        email: Yup.string().email("Invalid email address")
                        .required("email field can not be empty"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
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
                                            name='full_name'
                                            type='text'
                                            label='Full Name'
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
                                    <div  role="group">
                                        <h2 className='font-medium text-base text-label mb-[6px]'>Select Role</h2>
                                        <div className=''>
                                            <label className='flex items-baseline gap-3'>
                                                <Field type="checkbox" name="role" value="backend_engineer" className='accent-gray' />
                                                <h3 className='font-medium text-sm'>Backend Engineer</h3>
                                            </label>
                                            <label className='flex items-baseline gap-3'>
                                                <Field type="checkbox" name="role" value="cto" className='accent-gray' />
                                                <h3 className='font-medium text-sm'>Chief Technology Officer</h3>
                                            </label>
                                            <label className='flex items-baseline gap-3'>
                                                <Field type="checkbox" name="role" value="super_admin" className='accent-gray' />
                                                <h3 className='font-medium text-sm'>Super Admin</h3>
                                            </label>
                                        </div>
                                    </div>
                                    </div>
                                    <div className='flex justify-end items-center grow'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 w-full cursor-pointer rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                updateVATMutation.isLoading ?
                                                    "Loading..."
                                                    : "CREATE"
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
        </div>
    )
}

export default CreateUserModal
