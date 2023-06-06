import { ErrorMessage, Form, Formik } from 'formik'
import React from 'react'
import { useMutation, useQuery } from 'react-query'
import * as Yup from 'yup'
import merchantService from '../../@services/merchantService'
import InputField from '../@shared/InputField'
import { toast } from 'react-toastify'
import SelectField from '../@shared/SelectField'
import axios from 'axios'
import styled from 'styled-components'


function IdentityVerification() {

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result);
            };
            fileReader.onerror = (error) => {
                reject(error);
            };
        });
    };

    const handleIcon = async (e, setFieldValue) => {
        const file = e.target.files[0];
        //check the size of image 
        if (file?.size / 1024 / 1024 < 2) {
            const base64 = await convertToBase64(file);
            setFieldValue('profile_details_doc', base64);
        }
        else {
            toast.error('Image size must be of 2MB or less');
        };
    };

    const { data: countries, isLoading: countriesLoading, error } = useQuery(['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    )
    //countries && console.log(countries)

    const identityVerificationMutation = useMutation(merchantService.saveKycIdentity, {
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
        identityVerificationMutation.mutate(values)
    }
    return (
        <div className='bg-white w-full px-4 py-4'>
            <h2 className='font-semibold text-black'>Fill the form below</h2>
            <hr className='text-[#40525E] opacity-50' />
            <Formik
                isValid
                initialValues={{
                    kyc_type: '',
                    kyc_number: '',
                    country_issued: '',
                    issued_by: '',
                    date_issued: '',
                    expiration_date: '',
                    profile_details_doc:'',
                }}
                validationSchema={
                    Yup.object({
                        kyc_type: Yup.string().required("Please enter account number"),
                        kyc_number: Yup.string().required("Please enter bank name"),
                        country_issued: Yup.string().required("Please enter customer  account name"),
                        issued_by: Yup.string().required("Please enter customer  account name"),
                        date_issued: Yup.string().required("Please enter customer  account name"),
                        expiration_date: Yup.string().required("Please enter customer  account name"),
                        profile_details_doc: Yup.string().required("Please upload a document"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    //console.log(values)
                    resetForm({
                        kyc_type: '',
                        kyc_number: '',
                        country_issued: '',
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form>
                        <div className='flex flex-col py-2'>
                            <div className='flex gap-6'>
                                <div className='flex flex-col w-full gap-2 py-3'>
                                    <div className='grow'>
                                        <SelectField
                                            name='kyc_type'
                                            label='ID type'
                                            type='text'
                                        >
                                            <option value="">Select type</option>
                                            <option value="NINMC Slip">NINMC Slip</option>
                                            <option value="Drivers License">Drivers License</option>
                                            <option value="Voter’s card">Voter’s card</option>
                                            <option value="NIN">National ID</option>
                                            <option value="International passport">International Passport</option>
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='kyc_number'
                                            type='text'
                                            label='Enter ID Number'
                                            placeholder='e.g. 0122993300'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='country_issued'
                                            label='Issued Country'
                                            type='text'
                                        >
                                            {
                                                countriesLoading ? <option value="">Loading...</option>
                                                    :
                                                    <>
                                                        <option value="">Select Country</option>
                                                        {
                                                            countries?.map(country => {
                                                                return (
                                                                    <option value={country.name} key={country.iso3}>{country.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='issued_by'
                                            label='Issued By'
                                            type='text'
                                        >
                                           <option value="">Select</option>
                                           <option value="Government">Government</option>
                                            <option value="Private Organization">Private Organization</option>
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='date_issued'
                                            type='date'
                                            label='Date Issued'
                                       />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='expiration_date'
                                            type='date'
                                            label='Expiration date'
                                       />
                                    </div>

                                </div>
                                <div className='flex w-full gap-4 py-3'>
                                    <Div className='grow flex flex-col items-center gap-4 border h-fit py-5 rounded-lg'>
                                        {/* <h3 className='text-[#40525E] opacity-70 text-sm'>Upload a document that shows your profile details</h3>
                                        <div className='grow'>
                                            <InputField
                                                name='account_name'
                                                type='text'
                                                label='Enter your Account Name'
                                                placeholder='e.g. Moshood Abiola'
                                            />
                                        </div> */}
                                        <div className='form-control flex flex-col mb-4 relative border-none lg:border'>
                                            <label htmlFor={'cac_document'} className='font-medium text-base text-label mb-[6px]'>Upload a document that shows your profile details</label>
                                            <input
                                                name='profile_details_doc'
                                                type='file'
                                                className='form-control'
                                                onChange={(e) => handleIcon(e, setFieldValue,)}
                                            />
                                            <ErrorMessage name='profile_details_doc' component="div" className='text-red-500'/>
                                        </div>
                                    </Div>
                                </div>
                                
                            </div>

                            <div className='flex justify-end'>
                                <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        identityVerificationMutation.isLoading ?
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
    border: 1px solid rgba(14, 31, 48, 0.25)
`

export default IdentityVerification