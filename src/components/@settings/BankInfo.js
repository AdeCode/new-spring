import { ErrorMessage, Form, Formik, useField, useFormikContext } from 'formik'
import React, { useContext, useEffect, useState } from 'react'
import { QueryClient, useMutation, useQuery, useQueryClient } from 'react-query'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { toast } from 'react-toastify'
import merchantService from '../../@services/merchantService'
import { AuthContext } from '../../contexts/AuthContexts'
import SelectField from '../@shared/SelectField'
import styled from 'styled-components'
import { TroubleshootOutlined } from '@mui/icons-material'
import TextField from '../@shared/TextField'
import ServicesInput from '../@shared/ServicesInput'


function BankInfo({ data }) {
    const queryClient = useQueryClient()
    const [selectedCode, setSelectedCode] = useState('')

    const [businessLogo, setBusinessLogo] = useState('')

    const { data: banks, isLoading: bankLoading, error } = useQuery(['banks'], merchantService.getBankList)
    
    const lookUpBankDetailsMutation = useMutation(merchantService.saveAccountDetails, {
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

    const extractSelectedBankDetails = async (banks, selectedBank) => {
        try {
            if (!!banks) {
                const selectedDetails = await banks?.data.banks.filter(bank => bank.bankName === selectedBank)
                return selectedDetails
            }
        } catch (err) {
        }
    }

    let nameLoading = false

    const BankNameField = (props) => {
        let {
            values: { account_number, bank_name, account_name }, setFieldValue } = useFormikContext();

        const [field, meta] = useField(props)

        useEffect(() => {
            extractSelectedBankDetails(banks, bank_name)
                .then(res => setSelectedCode(res[0]?.bankCode))

            let isCurrent = true;
            if ((account_number.length > 9) && bank_name) {

                //make API call
                nameLoading = true
                merchantService.confirmBankDetails({
                    accountNumber: account_number,
                    bankCode: selectedCode
                })
                    .then(res => {
                        if (res.data) {
                            nameLoading = false
                        } else {
                        }
                    },
                        (err) => {
                            
                        }
                    )
            }

            return () => {
                isCurrent = false;
            };
        }, [props.name, account_number, bank_name, setFieldValue])

        return (
            <Div className='flex flex-col'>
                <label htmlFor={props.name} className='font-medium text-base text-label mb-[6px]'> Select your Bank* </label>
                <select {...props} {...field} name={props.name} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'>
                    {
                        bankLoading ? <option value=''>Loading...</option> :
                            <>
                                {
                                    banks?.data?.banks.map(({ bankCode, bankName }) => {
                                        return <option value={bankName} key={bankCode}>{bankName}</option>
                                    })
                                }

                            </>
                    }
                </select>
                {!!meta.touched && !!meta.error && <div className='text-red-500'>{meta.error}</div>}
            </Div>
        );
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                setBusinessLogo(fileReader.result)
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleCacDoc = async (e, setFieldValue) => {
        const file = e.target.files[0];
        //check the size of image 
        if (file?.size / 1024 / 1024 < 2) {
            const base64 = await convertToBase64(file);
            setFieldValue('cac_document', base64);
        }
        else {
            toast.error('Image size must be of 2MB or less');
        };
    };

    const handleIcon = async (e, setFieldValue) => {
        const file = e.target.files[0];
        //check the size of image 
        if (file?.size / 1024 / 1024 < 2) {
            const base64 = await convertToBase64(file);
            setFieldValue('utility_bill', base64);
        }
        else {
            toast.error('Image size must be of 2MB or less');
        };
    };

    let initialState = {}

    if (!!data?.bank_account_detail) {
        initialState = {
            account_number: data?.bank_account_detail?.bank_account_number,
            bank_name: data?.bank_account_detail?.bank_name,
            account_name: data?.bank_account_detail?.bank_account_name,
            tin_number: data?.profile?.tin_number,
            cac_document: data?.profile?.cac_document,
            utility_bill: data?.profile?.utility_bill,
            company_rc_number: data?.profile?.company_rc_number,
        }
    } else {
        initialState = {
            account_number: '',
            bank_name: '',
            account_name: '',
            tin_number: '',
            cac_document: '',
            utility_bill: '',
            company_rc_number: '',
        }
    }


    const saveAccountDetailsMutation = useMutation(merchantService.saveAccountDetails, {
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

    const updateAccountDetailsMutation = useMutation(merchantService.updateAccountDetails, {
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
        if (!!data?.bank_account_detail) {
            //patch
            updateAccountDetailsMutation.mutate(values)
        } else {
            //post
            saveAccountDetailsMutation.mutate(values)
        }
    }

    return (
        <div className='bg-white w-full px-4 py-4'>
            <h2 className='font-semibold text-black'>Create your Account Information</h2>
            <hr className='text-[#40525E] opacity-50' />
            <Formik
                isValid
                initialValues={
                    {
                        account_number: data?.bank_account_detail?.bank_account_number,
                        bank_name: data?.bank_account_detail?.bank_name,
                        account_name: data?.bank_account_detail?.bank_account_name,
                        tin_number: data?.profile?.tin_number,
                        cac_document: data?.profile?.cac_document,
                        utility_bill: data?.profile?.utility_bill,
                        company_rc_number: data?.profile?.company_rc_number,
                    }
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
                                            name='bank_name'
                                            type='text'
                                            label='Enter Bank Name*'
                                            placeholder='e.g. Wema Bank'
                                        />
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
                                    <div className='grow flex'>
                                        <InputField
                                            name='account_name'
                                            type='text'
                                            label='Enter your Account Name'
                                            placeholder='e.g. Moshood Abiola'
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='grow'>
                                    <InputField
                                        name='company_rc_number'
                                        type='text'
                                        label='Company RC Number*'
                                        placeholder='e.g. NC00223'
                                    />
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='tin_number'
                                        type='text'
                                        label='Enter TIN Number'
                                        placeholder='e.g. 096453627181'
                                    />
                                </div>
                            </div>
                            <div className='flex w-full gap-4 py-3'>
                                <div className='flex flex-col min-w-[350px]'>
                                    <div className='w-full flex flex-col items-center'>
                                        <div className='form-control flex flex-col mb-4 relative border-none lg:border'>
                                            <div className='flex justify-center'>
                                                <div className='mb-3 max-w-[100px] max-h-[100px]'>
                                                    {
                                                        values.cac_document ?
                                                            <img src={data?.profile?.cac_document} alt={data?.profile?.business_name} />
                                                            :
                                                            <span class="material-symbols-outlined">image</span>
                                                    }
                                                </div>
                                            </div>
                                            <label htmlFor={'cac_document'} className='font-medium text-base text-label mb-[6px]'>Upload your CAC document</label>
                                            <input
                                                name='cac_document'
                                                type='file'
                                                className='form-control'
                                                onChange={(e) => handleCacDoc(e, setFieldValue,)}
                                            />
                                            <ErrorMessage name='cac_document' component="div" className='text-red-500' />
                                        </div>
                                    </div>
                                </div>
                                <div className='grow flex gap-4'>
                                    <div className='grow'>
                                        <div className='w-full flex flex-col items-center'>
                                            <div className='form-control flex flex-col items-center mb-4 relative border-none lg:border'>
                                                <div className='flex justify-center'>
                                                    <div className='mb-3 max-w-[100px] max-h-[100px]'>
                                                        {
                                                            values.utility_bill ?
                                                                <img src={data?.profile?.utility_bill} alt={data?.profile?.business_name} />
                                                                :
                                                                <span class="material-symbols-outlined">image</span>
                                                        }
                                                    </div>
                                                </div>
                                                <label htmlFor={'cac_document'} className='font-medium text-base text-label mb-[6px]'>Upload your Utility bill</label>
                                                <input
                                                    name='utility_bill'
                                                    type='file'
                                                    className='form-control'
                                                    onChange={(e) => handleIcon(e, setFieldValue,)}
                                                />
                                                <ErrorMessage name='utility_bill' component="div" className='text-red-500' />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex justify-end'>
                                <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        (saveAccountDetailsMutation.isLoading || updateAccountDetailsMutation.isLoading) ?
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