import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Formik, Form, useField, useFormikContext, FieldArray, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../components/@shared/InputField'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import TextField from '../../../components/@shared/TextField'
import InvoiceFooter from '../../../components/@shared/InvoiceFooter'
import customerService from '../../../@services/customerService'
import { QueryClient, useQuery } from 'react-query'
import merchantService from '../../../@services/merchantService'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'
import helperFunctions from '../../../@helpers/helperFunctions'
import AlertBox from '../../../components/AlertBox'
import axios from 'axios'
import SelectField from '../../../components/@shared/SelectField'
import QuantityUnitField from '../../../components/@shared/QuantityUnitField'
import { getTaxRate, pageStatus, calculateSubTotal, calculateTax, calculateInvoiceTotal } from '../../../@helpers/helperFunctions'

function NewInvoice() {
    const navigate = useNavigate()

    const [currency, setCurrency] = useState('NGN')

    const [customerCountry, setCustomerCountry] = useState('')

    const [customerExists, setCustomerExists] = useState(false)

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
    }

    const { data: profile, isLoading: profileLoading } = useQuery(['merchant_profile'], merchantService.getMerchantProfile)

    const [invoice_due_date, onChange] = useState(new Date());

    const createInvoiceMutation = useMutation(merchantService.createInvoice, {
        onSuccess: res => {
            console.log(res)
            //dispatch({ type: 'LOGIN', payload: res.data })
            toast.success(res.message, {
                theme: "colored",
            })
            navigate('/invoice')
            // QueryClient.invalidateQueries('invoices')
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onSubmit = (values) => {
        values={
            ...values,
            currency,
            invoice_due_date
        }
        console.log(values)
        createInvoiceMutation.mutate(values)
    }

    const NameField = (props) => {
        const {
            values: { customer_phone, }, setFieldValue,
        } = useFormikContext();

        const [field, meta] = useField(props)

        useEffect(() => {
            let isCurrent = true;
            if (customer_phone && customer_phone.length > 10) {
                //make API call
                const phoneNumber = customer_phone
                customerService.fetchCustomerByPhoneNumber(phoneNumber)
                    .then(res => {
                        //console.log(res)
                        if (!!isCurrent && res.data) {
                            setFieldValue(props.name, res.data.name);
                            setFieldValue('customer_email', res.data.email);
                            setCustomerExists(true)
                        }else{
                            setCustomerExists(false)
                        }
                    },
                        (err) => {
                            console.log('customer doesnt exists')
                            setFieldValue(props.name, '');
                            setFieldValue('customer_email', '');
                            setCustomerExists(false)
                            //console.log(err)
                        }
                    )
            }

            return () => {
                isCurrent = false;
            };
        }, [props.name, customer_phone, setFieldValue])

        return (
            <div className='flex flex-col'>
                <label htmlFor='name' className='font-medium text-base text-label mb-[6px]'>Receiver Name</label>
                <input {...props} {...field} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' />
                {!!meta.touched && !!meta.error && <div className='text-red-500'>{meta.error}</div>}
            </div>
        );
    }

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

    const { data: vatRate, isLoading: vatLoading } = useQuery(['vat',{customerCountry}], merchantService.getVat)

    const countryChange =(e, setFieldValue) => {
        setFieldValue('customer_country',e.target.value)
        setCustomerCountry(e.currentTarget.value)
    }

    const Empty_invoice_items = { item_name: '', quantity: 0, price: '', cbm: '', unit: 'kg', total: '' }
    return (
        <Invoice className='px-[50px]'>
            <div className='flex justify-between'>
                <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                    <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
                </Link>
                {
                    (!profile?.data?.bank_account_detail || !profile?.data?.merchant_account_profile || !profile?.data?.profile) &&
                    <AlertBox
                        message={<Link to='/settings/personal-information'>Click here to complete your compliance requirements to access invoice creation</Link>}
                    />
                }
                
            </div>
            <div className='box w-full flex flex-col' disabled={pageStatus(profile?.data?.bank_account_detail,profile?.data?.merchant_account_profile,profile?.data?.profile)}>
                <div className='w-full flex justify-between border-b-2 border-cyan-900 px-3 py-2'>
                    <h2 className=''>Create Invoice</h2>
                    <select name='currency' onChange={handleCurrencyChange} className='py-3 px-3 rounded-md text-blue_text border border-[#FBFCFE]'>
                        <option value='NGN' >NGN</option>
                        <option value='USD' defaultValue>USD</option>
                    </select>
                </div>
                <div className='px-3 w-full'>
                    <Formik
                        isValid
                        initialValues={{
                            customer_email: '',
                            customer_name: '',
                            note: '',
                            customer_phone: '',
                            invoice_due_date: '',
                            invoice_items: [Empty_invoice_items],
                            customer_country: '',
                            customer_address: '',
                            sender_name: '',
                            sender_phone: '',
                            sender_address: '',
                        }}
                        validationSchema={
                            Yup.object({
                                customer_email: Yup.string().email("Invalid email address")
                                    .required("email field can not be empty"),
                                customer_name: Yup.string().required("Please enter customer name"),
                                customer_phone: Yup.string().required("Please enter customer  phone number"),
                                invoice_items: Yup.array(Yup.object({
                                    item_name: Yup.string().required('Item name is required'),
                                    quantity: Yup.number().required('Quantity is required').min(1,'minimum of one quantity required'),
                                    price: Yup.number().required('Price is required').min(1,'must be greater than zero'),
                                    cbm: Yup.number().required('CBM is required'),
                                    total: Yup.number(),
                                })).min(1,'Enter at least 1 invoice item'),
                            })
                        }
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(false)
                            onSubmit(values)
                            console.log('form fields ',values)
                            resetForm({
                                customer_email: '',
                                customer_name: '',
                                note: '',
                                customer_phone: '',
                                invoice_items: []
                            })
                        }}
                    >
                        {({ isSubmitting, isValid, handleChange, handleBlur, values, errors, setFieldValue }) => (
                            <Form className='flex flex-col py-2'>
                                <div className='flex w-full gap-2'>
                                    <div className='grow'>
                                        <InputField
                                            name='customer_phone'
                                            type='text'
                                            label='Receiver Phone'
                                            placeholder='e.g. 08033889999'
                                        // disabled
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='customer_email'
                                            type='email'
                                            label='Receiver Email'
                                            placeholder='e.g. user@mail.com'
                                            disabled={customerExists}
                                        />
                                    </div>
                                    <div className=''>
                                        <SelectField
                                            name='customer_country'
                                            label="Receiver's Country*"
                                            value={values.customer_country}
                                            onBlur={handleBlur}
                                            onChange={(e)=>{countryChange(e,setFieldValue )}}
                                        >
                                            {
                                                countriesLoading ? <option value="">Loading...</option>
                                                    :
                                                    <>
                                                        <option value="">Select Country</option>
                                                        {
                                                            countries?.map((country,index) => {
                                                                return (
                                                                    <option value={country.name} key={country.ise3}>{country.name}</option>
                                                                )
                                                            })
                                                        }
                                                    </>
                                            }
                                        </SelectField>
                                    </div>
                                </div>
                                <div className='flex w-full gap-2'>
                                    <div className='grow'>
                                        <NameField
                                            name='customer_name'
                                            type='text'
                                            placeholder='e.g. Olawale James'
                                            disabled={customerExists}
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='customer_address'
                                            type='text'
                                            label="Receiver's Address"
                                            placeholder='e.g. 2 Houston Street NY'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <div className='flex flex-col'>
                                            <label htmlFor='date' className='font-medium text-base text-label mb-[6px]'>Due Date</label>
                                            <DateTimePicker onChange={onChange} value={invoice_due_date} className='' />
                                        </div>
                                    </div>
                                </div>
                                <div className='flex w-full gap-2 pt-3'>
                                    <div className='grow-0'>
                                        <InputField
                                            name='sender_name'
                                            type='text'
                                            label="Sender's Name"
                                            placeholder='e.g. Adegoke James'
                                        />
                                    </div>
                                    <div className='grow-0'>
                                        <InputField
                                            name='sender_phone'
                                            type='text'
                                            label="Sender's Phone"
                                            placeholder='e.g. 08022889900'
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='sender_address'
                                            type='text'
                                            label="Sender's Address"
                                            placeholder='e.g. 2, Kumapayi Street, Ikeja, Lagos'
                                        />
                                    </div>
                                </div>
                                <div className='flex flex-col mt-3'>
                                    <h2 className=''>Order Items</h2>
                                    <p className=''>*You should enter at least 1 item</p>
                                    <div className='flex flex-col w-full'>
                                        <FieldArray name='invoice_items'>
                                            {
                                                ({ push, remove, }) => (
                                                    <>
                                                        {
                                                            values.invoice_items.map((_, index) => (
                                                                <div className='flex w-full gap-2' key={index}>
                                                                    <div className='flex grow flex-col'>
                                                                        <label className='font-medium text-base text-label mb-[6px]'>Item</label>
                                                                        <Field
                                                                            name={`invoice_items[${index}].item_name`}
                                                                            type='text'
                                                                            placeholder='item name'
                                                                            className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'
                                                                        />
                                                                        <ErrorMessage name={`invoice_items[${index}].item_name`} component="div" className='text-red-500' />
                                                                    </div>
                                                                    <div className='flex grow-0'>
                                                                        <QuantityUnitField
                                                                            name={`invoice_items.${index}.quantity`}
                                                                            type='number'
                                                                            label="Quantity*"
                                                                            value={`invoice_items.${index}.unit`}
                                                                            // value={values.unit}
                                                                            onBlur={handleBlur}
                                                                            unit={`invoice_items.${index}.unit`}
                                                                        >
                                                                            <option value="kg">kg</option>
                                                                            <option value="carton">carton</option>
                                                                            <option value="litres">litres</option>
                                                                        </QuantityUnitField>
                                                                        {/* <div className='flex flex-col'>
                                                                            <label className='font-medium text-base text-label mb-[6px]'>Quantity (kg)</label>
                                                                            <Field
                                                                                name={`invoice_items.${index}.quantity`}
                                                                                type='number'
                                                                                placeholder='item quantity'
                                                                                className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'
                                                                            />
                                                                            <ErrorMessage name={`invoice_items[${index}].quantity`} component="div" className='text-red-500' />
                                                                        </div>
                                                                        <SelectField
                                                                            name='unit'
                                                                            label="Unit*"
                                                                            value={values.unit}
                                                                            onBlur={handleBlur}
                                                                        >
                                                                            <option value="kg">kg</option>
                                                                            <option value="carton">carton</option>
                                                                            <option value="litres">litres</option>
                                                                        </SelectField> */}


                                                                        {/* 
                                                                        <label className='font-medium text-base text-label mb-[6px]'>Quantity (kg)</label>
                                                                        <Field
                                                                            name={`invoice_items.${index}.quantity`}
                                                                            type='number'
                                                                            placeholder='item quantity'
                                                                            className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'
                                                                        />
                                                                        <ErrorMessage name={`invoice_items[${index}].quantity`} component="div" className='text-red-500' /> */}
                                                                    </div>
                                                                    <div className='flex grow-0 flex-col'>
                                                                        <label className='font-medium text-base text-label mb-[6px]'>Price 
                                                                            {currency === 'USD' ? <span>&#65284;</span> : <span className='pl-1'>&#8358;</span>} (unit)
                                                                        </label>
                                                                        <Field
                                                                            name={`invoice_items.${index}.price`}
                                                                            type='text'
                                                                            placeholder='0.00'
                                                                            className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'
                                                                        />
                                                                        <ErrorMessage name={`invoice_items[${index}].price`} component="div" className='text-red-500' />
                                                                    </div>
                                                                    <div className='flex grow-0 flex-col'>
                                                                        <label className='font-medium text-base text-label mb-[6px]'>CBM</label>
                                                                        <Field
                                                                            name={`invoice_items.${index}.cbm`}
                                                                            type='number'
                                                                            placeholder='e.g. 2'
                                                                            className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'
                                                                        />
                                                                        <ErrorMessage name={`invoice_items[${index}].cbm`} component="div" className='text-red-500' />
                                                                    </div>
                                                                    <div className='flex grow-0 flex-col'>
                                                                        <label className='font-medium text-base text-label mb-[6px]'>Subtotal</label>
                                                                        <Field
                                                                            name={`invoice_items.${index}.total`}
                                                                            type='text'
                                                                            placeholder='Total'
                                                                            className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg'
                                                                            value={values.invoice_items[index].price}
                                                                            // onChange={()=>{setFieldValue(`invoice_items.${index}.total`,values.invoice_items[index].price);handleChange()}}
                                                                            disabled
                                                                        />
                                                                        <ErrorMessage name={`invoice_items[${index}].total`} component="div" className='text-red-500' />
                                                                    </div>
                                                                    <div className='flex items-center lg:pb-3'>
                                                                        <span onClick={() => remove(index)} disabled={isSubmitting} className="material-symbols-outlined cursor-pointer disabled:opacity-50 text-red-600">delete</span>
                                                                    </div>
                                                                </div>
                                                            ))
                                                        }
                                                        <div className='my-3'>
                                                            {typeof errors.invoice_items === 'string' ?
                                                                (
                                                                    <div className='text-red-500'>{errors.invoice_items}</div>
                                                                ) : null
                                                            }
                                                            <button disabled={isSubmitting} onClick={() => push(Empty_invoice_items)} type='button' className='flex border border-green-700 text-green-700 items-center py-2 px-3 rounded-md'>
                                                                <span className="material-symbols-outlined disabled:opacity-50 text-green-700">add</span>Add Item
                                                            </button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </FieldArray>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='flex flex-col gap-3 p-3 w-[300px] h-auto bg-white text-black'>
                                            <div className='flex justify-between'>
                                                <h2 className=''>Sub total:</h2>
                                                <span className='font-semibold gap-1 flex'>
                                                    {helperFunctions.formatCurrency(currency,calculateSubTotal(values.invoice_items))}
                                                </span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <h2 className=''>Tax({getTaxRate(vatRate?.data[0]?.vat_value)}%):</h2>
                                                <span className='font-semibold gap-1 flex'>
                                                    {helperFunctions.formatCurrency(currency,calculateTax(values.invoice_items, getTaxRate(vatRate?.data[0]?.vat_value)))}
                                                </span>
                                            </div>
                                            <div className='flex justify-between'>
                                                <h2 className=''>Invoice Total:</h2>
                                                <span className='font-semibold gap-1 flex'>
                                                    {/* {currency === 'USD' ? <span>&#65284;</span> : <span className='pl-1'>&#8358;</span>}  */}
                                                    {helperFunctions.formatCurrency(currency,calculateInvoiceTotal(values.invoice_items, getTaxRate(vatRate?.data[0]?.vat_value)))}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <TextField
                                        name='note'
                                        type='text'
                                        label='Notes (optional)'
                                        placeholder='Enter note'
                                        component="textarea"
                                        rows='4'
                                    />

                                    {/* <Field component="textarea" rows="4" value={""}></Field> */}
                                </div>
                                <div className='flex justify-end'>
                                    <button type="submit" disabled={!isValid} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>
                                        {
                                            createInvoiceMutation.isLoading ?
                                                "Loading..."
                                                : "Create Invoice"
                                        }
                                    </button>
                                </div>

                            </Form>
                        )}
                    </Formik>
                </div>
            </div>
            <InvoiceFooter />
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

    input{
        border: 1px solid rgba(14, 31, 48, 0.25)
    }
    input:focus{
        outline: none !important;
        border: 1px solid #1BB6EF;
    }
    div[disabled]{
        pointer-events: none;
        opacity: 0.5;
        cursor: not-allowed;
    }
`

export default NewInvoice