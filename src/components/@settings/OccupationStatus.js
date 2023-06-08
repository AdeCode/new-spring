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


function OccupationStatus() {

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
            setFieldValue('document', base64);
        }
        else {
            toast.error('Image size must be of 2MB or less');
        };
    };


    const occupationStatusMutation = useMutation(merchantService.saveKycOccupation, {
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
        // console.log(values)
        occupationStatusMutation.mutate(values)
    }
    return (
        <div className='bg-white w-full px-4 py-4'>
            <h2 className='font-semibold text-black'>Fill the form below</h2>
            <hr className='text-[#40525E] opacity-50' />
            <Formik
                isValid
                initialValues={{
                    occupation: '',
                    source_of_income: '',
                    employment_status: '',
                    income_band:'',
                    document:''
                }}
                validationSchema={
                    Yup.object({
                        occupation: Yup.string().required("Please enter your occupation"),
                        source_of_income: Yup.string().required("Please enter your source of income"),
                        employment_status: Yup.string().required("Select your current employment status"),
                        income_band: Yup.string().required("select your income band"),
                        document: Yup.string().required("Please upload a document"),
                    })
                }
                onSubmit={(values, { setSubmitting, resetForm }) => {
                    setSubmitting(false)
                    onSubmit(values)
                    console.log(values)
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
                                        <InputField
                                            name='occupation'
                                            type='text'
                                            label='Occupation'
                                            placeholder='e.g. Software Engineer'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='source_of_income'
                                            type='text'
                                            label='Source of Income '
                                            placeholder='e.g Salary'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='employment_status'
                                            label='Employment Status'
                                            type='text'
                                        >
                                            <option value="">Select status</option>
                                            <option value="employed">Employed</option>
                                            <option value="unemployed">Unemployed</option>
                                            <option value="self_employed">Self Employed</option>
                                            <option value="student">Student</option>
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <SelectField
                                            name='income_band'
                                            label='Income Band'
                                            type='string'
                                        >
                                            <option value="">Select range</option>
                                            <option value="0 - 100,000">0 - 100,000</option>
                                            <option value="101,000 - 500,000">101,000 - 500,000</option>
                                            <option value="501,000 - 1,000,000">501,000 - 100,000,000</option>
                                            <option value="above 1,000,000">above 1,000,000</option>
                                        </SelectField>
                                    </div>
                                </div>
                                <div className='flex w-full gap-4 py-3'>
                                    <Div className='grow flex flex-col items-center gap-4 border h-fit py-5 rounded-lg'>
                                        <div className='form-control flex flex-col mb-4 relative border-none lg:border'>
                                            <label htmlFor='document' className='font-medium text-base text-label mb-[6px]'>Upload a Bank statement (showing address)</label>
                                            <input
                                                name='document'
                                                type='file'
                                                className='form-control'
                                                onChange={(e) => handleIcon(e, setFieldValue,)}
                                            />
                                            <ErrorMessage name='document' component="div" className='text-red-500'/>
                                        </div>
                                    </Div>
                                </div>
                                
                            </div>

                            <div className='flex justify-end'>
                                <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        occupationStatusMutation.isLoading ?
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

export default OccupationStatus