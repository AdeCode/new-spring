import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../components/@shared/InputField'


function NewInvoice() {
    const navigate = useNavigate()

    const newInvoiceMutation = () => { }

    const onSubmit = () => {

    }
    return (
        <Invoice className='px-[50px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span class="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className='box border border-cyan-900 w-full flex flex-col'>
                <div className='w-full border-b-2 border-cyan-800 pl-3 pt-2'>
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
                            <Form className='flex flex-col'>
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
                                        <InputField
                                            name='invoice'
                                            type='text'
                                            label='Due Date'
                                            placeholder='input invoice number'
                                        />
                                    </div>
                                    
                                    
                                </div>
                                <div className='flex'>
                                    <h2 className=''>Order Items</h2>
                                    <p className=''>*You should enter at least 1 item</p>
                                </div>
                                
                                <button type="submit" disabled={!isValid} className='btn w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                    {
                                        newInvoiceMutation.isLoading ?
                                            "Loading..."
                                            : "Continue"
                                    }
                                </button>
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
        box-shadow: 10px 50px 50px rgba(0, 0, 0, 0.06);
        border-radius: 6px;
    }
`

export default NewInvoice