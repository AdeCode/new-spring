import { Form, Formik, useField, useFormikContext } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { toast } from 'react-toastify'
import merchantService from '../../@services/merchantService'
import { AuthContext } from '../../contexts/AuthContexts'
import SelectField from '../@shared/SelectField'
import styled from 'styled-components'


function BankInfo({data}) {
    //console.log(data?.bank_account_detail)
    const queryClient = useQueryClient()

    const { data: banks, isLoading: bankLoading } = useQuery(['banks'], merchantService.getBankList)
    // banks && console.log('from banks ', banks.data)

    const lookUpBankDetailsMutation = useMutation(merchantService.saveAccountDetails, {
        onSuccess: res => {
            //console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })

            queryClient.invalidateQueries('merchant_profile')
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const BankNameField = (props) => {
        // const [loading,setLoading] = useState(false)
        const {
            values: { account_number, bank_name, account_name}} = useFormikContext();

        const [field, meta] = useField(props)
       
        useEffect(() => {
            let isCurrent = true;
            if ((account_number > 9) && bank_name) {
                //make API call
                merchantService.confirmBankDetails({
                        accountNumber: account_number,
                        bankCode: bank_name
                    })
                    .then(res => {
                        //console.log(res)
                        if (res.data) {
                            console.log(res.data)
                            // setFieldValue('customer_email', res.data.email);
                        }else{
                            // setCustomerExists(false)
                        }
                    },
                        (err) => {
                            console.log(err)
                          
                        }
                    )
            }

            return () => {
                isCurrent = false;
            };
        }, [props.name, account_number, bank_name])

        return (
            <Div className='flex flex-col'>
                <label htmlFor={props.name} className='font-medium text-base text-label mb-[6px]'> Select your Bank* </label>
                <select {...props} {...field} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'>
                    {
                        bankLoading ? <option value=''>Loading...</option> :
                        banks?.data?.map(bank => {
                            return <option value={bank.bankCode} key={bank.bankCode}>{bank.bankName}</option>
                        })
                    }
                </select>
                {/* <input {...props} {...field} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' /> */}
                {!!meta.touched && !!meta.error && <div className='text-red-500'>{meta.error}</div>}
            </Div>
        );
    }

    let initialState = {}

    if (!!data?.bank_account_detail) {
        initialState = {
            account_number: data?.bank_account_detail?.bank_account_number,
            bank_name: data?.bank_account_detail?.bank_name,
            account_name: data?.bank_account_detail?.bank_account_name,
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
            //console.log(res)
            toast.success(res.message, {
                theme: "colored",
            })

            queryClient.invalidateQueries('merchant_profile')
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
                                        <BankNameField
                                            name='bank_name'
                                            text='text'
                                        />
                                        {/* <SelectField
                                            name='bank_name'
                                            label='Enter your bank Name'
                                            type='text'
                                        >
                                            {
                                                bankLoading ? <option value="">Loading...</option>
                                                    :
                                                    <>
                                                        <option value="">Select Bank</option>
                                                        {
                                                            banks?.data.map(bank => {
                                                                return (
                                                                    <option value={bank.bankCode} key={bank.bankCode}>{bank.bankName}</option>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }
                                        </SelectField> */}
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='account_number'
                                            type='text'
                                            label='Enter your account number*'
                                            placeholder='e.g. 0011990022'
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

const Div = styled.div`
  select{
    border: 1px solid rgba(14, 31, 48, 0.25)
  }
  select:focus{
    outline: none !important;
    border: 1px solid #1BB6EF;
  }
`

export default BankInfo