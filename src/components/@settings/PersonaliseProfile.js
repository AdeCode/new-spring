import React, { useContext } from 'react'
import { Formik, Form, useField, useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { TextField } from '@mui/material'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import merchantService from '../../@services/merchantService'
import { AuthContext } from '../../contexts/AuthContexts'
import { toast } from 'react-toastify'


function PersonaliseProfile({ data }) {
    //const { data: profile, isLoading, error } = useQuery(['merchat_profile'], merchantService.getMerchantProfile)
    //profile && console.log('from profile ', profile)
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
            //console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('merchat_profile')

        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        //console.log('submitting ',values)
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
                        first_name: Yup.string().required("Please enter customer name"),
                        last_name: Yup.string().required("Please enter customer name"),
                        phone: Yup.string().required("Please enter customer  phone number"),
                        invoice_items: Yup.array(Yup.object({
                            item_name: Yup.string().required('Item name is required'),
                            quantity: Yup.number().required('Quantity is required').min(1, 'minimum of one quantity required'),
                            price: Yup.number().required('Price is required').min(1, 'must be greater than zero'),
                            cbm: Yup.number().required('CBM is required'),
                            total: Yup.number(),
                        })).min(1, 'Enter at least 1 invoice item'),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    //console.log('all values ', values)
                    resetForm({
                        email: '',
                        customer_name: '',
                        notes: '',
                        phone: '',
                        invoice_items: []
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
                                            label='First Name'
                                            placeholder='e.g. Adewale'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='last_name'
                                            type='text'
                                            label='Last Name'
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
                                            label='Email Address'
                                            placeholder='e.g. user@mail.com'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='phone'
                                            type='text'
                                            label='Phone Number'
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
                                        label='BVN'
                                        placeholder='e.g. 0022133889999'
                                    />
                                </div>
                            </div>

                            {/* <h2 className='font-semibold text-black'>Password Update</h2>
                            <hr className='text-[#40525E] opacity-50' />
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Change your password</h2>
                                    <p className='text-gray font-normal'>You can change your password here easily</p>
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='old_password'
                                        type='password'
                                        label='Old Password'
                                        placeholder='********'
                                        icon={true}
                                    />
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='new_password'
                                        type='password'
                                        label='New Password'
                                        placeholder='********'
                                        icon={true}
                                    />
                                </div>
                            </div> */}
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