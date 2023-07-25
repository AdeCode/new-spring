import { Form, Formik } from 'formik';
import React from 'react'
import InputField from './InputField'
import * as Yup from 'yup'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import axios from 'axios';
import merchantService from '../../@services/merchantService';
import { toast } from 'react-toastify'
import SelectField from './SelectField';


function UpdateVatModal ({data, handleClose}) {
    console.log(data)
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
            <h2 className='font font-medium'>Update VAT</h2>
            <div className=''>
            <Formik
                isValid
                initialValues={{
                    vat: data?.value,
                    country: data?.country,
                    vat_id: data?.vat_id
                }}
                validationSchema={
                    Yup.object({
                        country: Yup.string(),
                        vat: Yup.number().required("vat is required"),
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
                                        <SelectField
                                            name='country'
                                            label='Country*'
                                            value={values.country}
                                            onBlur={handleBlur}
                                        >
                                            {
                                                countriesLoading ? <option value="">Loading...</option>
                                                    :
                                                    <>
                                                        <option value="">Select Country</option>
                                                        {
                                                            countries?.map((country, index) => {
                                                                return (
                                                                    <option value={country.name} key={country.ise3}>{country.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }
                                        </SelectField>
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='vat'
                                            type='number'
                                            label='VAT(%)*'
                                            placeholder='e.g. 5'
                                        />
                                    </div>
                                    <div className='flex justify-end items-center grow'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 w-full cursor-pointer rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                updateVATMutation.isLoading ?
                                                    "Loading..."
                                                    : "Save"
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

export default UpdateVatModal
