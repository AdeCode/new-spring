import React from 'react'
import { Formik, Form, useField, useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../@shared/InputField'
import { useMutation } from 'react-query'
import TextField from '../@shared/TextField'
import SelectField from '../@shared/SelectField'
import avatar from '../../images/business/avatar.png'

function BusinessProfile() {
    const updateProfileMutation = useMutation()

    const onSubmit = (values) => {
        console.log(values)
    }
    return (
        <div className='bg-white w-full px-4 py-4 max-h-screen overflow-scroll'>
            <h2 className='font-semibold text-black'>Personalize Merchant Account</h2>
            <Formik
                isValid
                initialValues={{
                    first_name: '',
                    last_name: '',
                    customer_email: '',
                    customer_name: '',
                    notes: '',
                    customer_phone: '',
                    invoice_due_date: '',
                    invoice_items: '',
                }}
                validationSchema={
                    Yup.object({
                        customer_email: Yup.string().email("Invalid email address")
                            .required("email field can not be empty"),
                        first_name: Yup.string().required("Please enter customer name"),
                        last_name: Yup.string().required("Please enter customer name"),
                        customer_phone: Yup.string().required("Please enter customer  phone number"),
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
                    //console.log(values)
                    resetForm({
                        customer_email: '',
                        customer_name: '',
                        notes: '',
                        customer_phone: '',
                        invoice_items: []
                    })
                }}
            >
                {({ isSubmitting, isValid, handleChange, values, errors, setFieldValue }) => (
                    <Form className='flex flex-col py-2'>
                        <div className='flex w-full gap-4 py-3'>
                            <div className='flex flex-col grow w-[150px]'>
                                <h2 className='font font-medium'>Business Name</h2>
                                <p className='text-gray font-normal'>Enter your business name here</p>
                            </div>
                            <div className='flex gap-4 grow'>
                                <div className='grow'>
                                    <InputField
                                        name='first_name'
                                        type='text'
                                        label='Business Name'
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
                            <div className='flex flex-col grow w-[150px]'>
                                <h2 className='font font-medium'>Email &amp; RC Number</h2>
                                <p className='text-gray font-normal'>Edit Email &amp; RC Number</p>
                            </div>
                            <div className='flex gap-4 grow'>
                                <div className='grow'>
                                    <InputField
                                        name='customer_email'
                                        type='email'
                                        label='Email Address'
                                        placeholder='e.g. user@mail.com'
                                    />
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='rc_number'
                                        type='text'
                                        label='Company RC Number'
                                        placeholder='e.g. NC00223'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full gap-4 py-3'>
                            <div className='flex flex-col grow w-[150px]'>
                                <h2 className='font font-medium'>Business Location</h2>
                                <p className='text-gray font-normal'>Edit your business location</p>
                            </div>
                            <div className='flex gap-4 grow'>
                                <div className='grow'>
                                    <InputField
                                        name='country'
                                        type='text'
                                        label='Country'
                                        placeholder='e.g. Nigeria'
                                    />
                                </div>
                                <div className='grow'>
                                    <InputField
                                        name='state'
                                        type='text'
                                        label='State'
                                        placeholder='e.g. Lagos'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full gap-2 py-3'>
                            <div className='flex flex-col items-center grow w-[150px]'>
                                <div className='mb-3'>
                                    <img src={avatar} alt='avatar'/>
                                </div>
                                <h2 className='font-normal text-[#40525E] text-sm opacity-70'>Upload Business Logo</h2>
                            </div>
                            <div className='flex gap-4 grow'>
                                <div className='grow'>
                                    <TextField
                                        name='official_address'
                                        type='text'
                                        label='Official Address'
                                        placeholder='Enter notes'
                                        component="textarea"
                                        rows='4'
                                    />
                                </div>
                                <div className='grow'>
                                    <TextField
                                        name='description'
                                        type='text'
                                        label='Description'
                                        placeholder='e.g. Lagos'
                                        component="textarea"
                                        rows='4'
                                    />
                                </div>
                            </div>
                        </div>
                        <div className='flex w-full gap-4 py-3'>
                            <div className='grow'>
                                <InputField
                                    name='business_owner_username'
                                    type='text'
                                    label='Business Owner Username'
                                    placeholder='e.g. Nigeria'
                                />
                            </div>
                            <div className='grow'>
                                <SelectField
                                    name='business_category'
                                    label='Business Category'
                                    type='text'
                                >
                                    <option value="red">Red</option>
                                    <option value="green">Green</option>
                                    <option value="blue">Blue</option>
                                </SelectField>
                            </div>
                            <div className='grow'>
                                <InputField
                                    name='phone_number'
                                    type='text'
                                    label='Phone Number'
                                    placeholder='e.g. 08022119922'
                                />
                            </div>
                        </div>
                        <div className='flex w-full gap-4 py-3'>
                            <div className='grow'>
                                <InputField
                                    name='city'
                                    type='text'
                                    label='City'
                                    placeholder='e.g. Lagos'
                                />
                            </div>
                            <div className='grow'>
                                <InputField
                                    name='zip_code'
                                    type='text'
                                    label='Zip Code'
                                    placeholder='e.g. 000111'
                                />
                            </div>
                            <div className='grow'>
                                <InputField
                                    name='office_address_number'
                                    type='text'
                                    label='Office Address Number'
                                    placeholder='e.g. 002'
                                />
                            </div>
                        </div>

                        <div className='flex justify-end'>
                            <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                {
                                    updateProfileMutation.isLoading ?
                                        "Loading..."
                                        : "Save Changes"
                                }
                            </button>
                        </div>

                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default BusinessProfile
