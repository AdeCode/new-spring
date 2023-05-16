import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../components/@shared/InputField'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';


function NewInvoice() {
    const navigate = useNavigate()

    const [value, onChange] = useState(new Date());
    console.log(value)

    const newInvoiceMutation = () => { }

    const onSubmit = () => {

    }
    return (
        <Invoice className='px-[50px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className='box w-full flex flex-col'>
                <div className='w-full border-b-2 border-cyan-900 pl-3 pt-2'>
                    <h2 className=''>Create Invoice</h2>
                </div>
                <div className='px-3 w-full'>
                    <Formik
                        isValid
                        initialValues={{
                            invoice: '',
                            password: '',
                        }}
                        validationSchema={
                            Yup.object({
                                email: Yup.string()
                                    .email("Invalid email address")
                                    .required("email field can not be empty"),
                                password: Yup.string().required('password field can not be empty')
                            })
                        }
                        onSubmit={(values, { setSubmitting }) => {
                            setSubmitting(false)
                            onSubmit(values)
                        }}
                    >
                        {({ isSubmitting, values, isValid }) => (
                            <Form className='flex flex-col py-2'>
                                <InputField
                                    name='invoice'
                                    type='text'
                                    label='Invoice number'
                                    placeholder='input invoice number'
                                />
                                <div className='flex w-full gap-2'>
                                    <div className='grow'>
                                        <InputField
                                            name='invoice'
                                            type='text'
                                            label='Customer Name'
                                            placeholder='input invoice number'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <div className='flex flex-col'>
                                            <label htmlFor='date' className='font-medium text-base text-label mb-[6px]'>Due Date</label>
                                            <DateTimePicker onChange={onChange} value={value} className=''/>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className=''>Order Items</h2>
                                    <p className=''>*You should enter at least 1 item</p>
                                    <div className='flex flex-col'>
                                        <div className='flex w-full gap-2'>
                                            <div className='grow'>
                                                <InputField
                                                    name='item'
                                                    type='text'
                                                    label='Item'
                                                    placeholder='item'
                                                />
                                            </div>
                                            <div className='grow-0'>
                                                <InputField
                                                    name='item'
                                                    type='text'
                                                    label='Item'
                                                    placeholder='item'
                                                />
                                            </div>
                                            <div className='grow-0'>
                                                <InputField
                                                    name='item'
                                                    type='text'
                                                    label='Item'
                                                    placeholder='item'
                                                />
                                            </div>
                                            <div className='grow-0'>
                                                <InputField
                                                    name='item'
                                                    type='text'
                                                    label='Item'
                                                    placeholder='item'
                                                />
                                            </div>
                                        </div>
                                        <div className='flex'>
                                            <button className=''>Add Item</button>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='flex flex-col gap-3 p-3 w-[200px] h-auto bg-slate-400 text-black'>
                                            <div className='flex gap-4'>
                                                <h2 className=''>Sub total:</h2>
                                                <span className=''>0 EGP</span>
                                            </div>
                                            <div className='flex gap-4'>
                                                <h2 className=''>Tax:</h2>
                                                <span className=''>0 EGP</span>
                                            </div>
                                            <div className='flex gap-4'>
                                                <h2 className=''>Invoice Total:</h2>
                                                <span className=''>0 EGP</span>
                                            </div>
                                        </div>
                                    </div>
                                    <InputField
                                        name='notes'
                                        type='text'
                                        label='Notes (optional)'
                                        placeholder='Enter notes'
                                    />
                                </div>
                                <div className='flex justify-end'>
                                        <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                            {
                                                newInvoiceMutation.isLoading ?
                                                    "Loading..."
                                                    : "Send Invoice"
                                            }
                                        </button>
                                </div>
                                
                            </Form>
                        )}
                    </Formik>
                </div>
            </div>

        </Invoice>
    )
}

const Invoice = styled.div`
    .box{
        box-shadow: 10px 50px 50px 50px rgba(0, 0, 0, 0.07);
        border-radius: 6px;
    }

    .card{
        box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
    }

    .react-datetime-picker__wrapper{
        height:40px;
        padding: 8px;
        border-radius:8px;
        border: 1px solid rgba(14, 31, 48, 0.25);
        color: #6A707E;
    }
`

export default NewInvoice