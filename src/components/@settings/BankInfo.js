import { Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { useMutation, useQuery } from 'react-query'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { toast } from 'react-toastify'
import merchantService from '../../@services/merchantService'
import { AuthContext } from '../../contexts/AuthContexts'


function BankInfo() {
    const { state } = useContext(AuthContext)
    const { data: profile, isLoading, error } = useQuery(['merchat_profile'], merchantService.getMerchantProfile)

    //console.log(profile.data)

    let initialState = {}

    if (!!profile?.data) {
        initialState = {
            account_number: profile?.data?.account_number,
            bank_name: profile?.data?.bank_name,
            account_name: profile?.data?.account_name,
        }
    } else {
        initialState = {
            account_number: '',
            bank_name: '',
            account_name: '',
        }
    }


    const saveAccountDetailsMutation = useMutation(merchantService.saveAccountDetails, {
        onSuccess: res => {
            console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })
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
        saveAccountDetailsMutation.mutate(values)
    }

    return (
        <div className='bg-white w-full px-4 py-4'>
            <h2 className='font-semibold text-black'>Create your Account Information</h2>
            <hr className='text-[#40525E] opacity-50' />
            <Formik
                isValid
                initialValues={
                    initialState
                //     {
                //     account_number: '',
                //     bank_name: '',
                //     account_name: '',
                // }
                }
                validationSchema={
                    Yup.object({
                        account_number: Yup.number().required("Please enter account number"),
                        bank_name: Yup.string().required("Please enter bank name"),
                        account_name: Yup.string().required("Please enter customer  account name"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    //console.log(values)
                    resetForm({
                        account_number: '',
                        bank_name: '',
                        account_name: '',
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col w-[350px]'>
                                    <h2 className='font font-medium'>Account Information</h2>
                                    <p className='text-gray font-normal'>You can customize your account details here</p>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='account_number'
                                            type='text'
                                            label='Enter your account number'
                                            placeholder='e.g. 0011990022'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='bank_name'
                                            type='text'
                                            label='Enter your bank Name'
                                            placeholder='e.g. Zenith'
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col min-w-[350px]'>

                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <InputField
                                            name='account_name'
                                            type='text'
                                            label='Enter your Account Name'
                                            placeholder='e.g. Moshood Abiola'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        saveAccountDetailsMutation.isLoading ?
                                            "Loading..."
                                            : "Save"
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

export default BankInfo