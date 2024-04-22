import React from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { useMutation, useQueryClient } from 'react-query'
import merchantService from '../../@services/merchantService'
import { toast } from 'react-toastify'


function PersonaliseProfile({ data }) {
    const queryClient = useQueryClient()
    const merchantData = data?.merchant_account_profile

    let initialState = {}

    if (!!merchantData) {
        initialState = {
            first_name: merchantData?.first_name,
            last_name: merchantData?.last_name,
            email: merchantData?.email,
            phone: merchantData?.phone,
            bvn: merchantData?.bvn
        }
    } else {
        initialState = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            bvn: ''
        }
    }

    const saveAccountProfileMutation = useMutation(merchantService.saveAccountProfile, {
        onSuccess: res => {
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('merchant_profile')

        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        saveAccountProfileMutation.mutate(values)
    }

    return (
        <div className='bg-white w-full px-4 py-4'>
            <h2 className='font-semibold text-black'>Personalize your Profile</h2>
            <hr className='text-[#40525E] opacity-50' />

            <Formik
                isValid
                initialValues={
                    initialState
                }
                validationSchema={
                    Yup.object({
                        email: Yup.string().email("Invalid email address")
                            .required("email field can not be empty"),
                        first_name: Yup.string().required("Please enter first name"),
                        last_name: Yup.string().required("Please enter last name"),
                        phone: Yup.string().required("Please enter customer phone number"),
                        bvn: Yup.string().required("BVN is required"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    resetForm({
                        email: '',
                        customer_name: '',
                        notes: '',
                        phone: '',
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Full Name</h2>
                                    <p className='text-gray font-normal'>You can customize your full name here</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='first_name'
                                            type='text'
                                            label='First Name*'
                                            placeholder='e.g. Adewale'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='last_name'
                                            type='text'
                                            label='Last Name*'
                                            placeholder='e.g. Komolafe'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Email &amp; Phone Number</h2>
                                    <p className='text-gray font-normal'>Gain access to ccounts and notifications</p>
                                </div>
                                <div className='flex grow gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='email'
                                            type='email'
                                            label='Email Address*'
                                            placeholder='e.g. user@mail.com'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='phone'
                                            type='text'
                                            label='Phone Number*'
                                            placeholder='e.g. 08033889999'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end w-full gap-4 py-3'>
                                <div className='w-[360px]'>
                                    <InputField
                                        name='bvn'
                                        type='text'
                                        label='BVN*'
                                        placeholder='************'
                                    />
                                    <p className=''>Your BVN will not be displayed after submission</p>
                                </div>
                            </div>

                            <div className='flex justify-end'>
                                <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        saveAccountProfileMutation.isLoading ?
                                            "Loading..."
                                            : "Save Changes"
                                    }
                                </button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>


        </div>
    )
}

export default PersonaliseProfile