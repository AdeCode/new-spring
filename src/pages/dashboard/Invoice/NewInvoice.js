import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import InputField from '../../../components/@shared/InputField'
import DateTimePicker from 'react-datetime-picker';
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';
import TextField from '../../../components/@shared/TextField'
import InvoiceFooter from '../../../components/@shared/InvoiceFooter'
import customerService from '../../../@services/customerService'
import { useQuery } from 'react-query'
import merchantService from '../../../@services/merchantService'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'




function NewInvoice() {
    const navigate = useNavigate()

    const phoneNumberRef = useRef('')

    const [phoneNumber, setPhoneNumber] = useState('')

    const [currency, setCurrency] = useState('USD')

    const [subTotal, setSubTotal] = useState(0)

    const { data: customer, isLoading, error } = useQuery(['customer', {phoneNumber} ], customerService.fetchCustomerByPhoneNumber, {enabled:phoneNumberRef.current.length > 10})
    customer && console.log(customer.message)

    // const [data, setInvoiceData] = useState([
    //     { 
    //         customer_phone:'',
    //         customer_name:'',
    //         invoice_items:[],
    //         item:'',
    //         quantity:'',
    //         price:'',
    //         cbm:'',
    //     }
    // ])

    const [invoiceData, setInvoiceData] = useState([
        {             
            item:'',
            quantity:'',
            price:'',
            cbm:'',
            total:0
        }
    ])

    const handleCurrencyChange = (e) => {
        setCurrency(e.target.value)
        console.log(currency)
    }

    const calculateSubTotal = (data) => {
        const sum = data.reduce((accumulator, curr)=>{
            return accumulator += (curr.price*curr.quantity)
        },0)
        return sum
    }
    //console.log(invoiceData)
    //console.log(calculateSubTotal(invoiceData))

    const [value, onChange] = useState(new Date());
    // console.log(value)

    const handleClick = () => {
        // console.log('button clicked')
        setInvoiceData([...invoiceData,{item:'',quantity:'',price:'',cbm:'',total:''}])
        // console.log(invoiceData)
    }

    const handleItemChange = (e,i) => {
        const {name, value} = e.target
        const onChangeVal = [...invoiceData]
        onChangeVal[i][name]=value
        setInvoiceData(onChangeVal)
        // const total = onChangeVal[i].name
        //console.log(parseInt(onChangeVal[i]['quantity'])*parseInt(onChangeVal[i]['price']))
    }

    const handleDelete = (index) => {
        const deleteVal = [...invoiceData]
        deleteVal.splice(index,1)
        setInvoiceData(deleteVal)
    }

    const createInvoiceMutation = useMutation(merchantService.createInvoice, {
        onSuccess: res => {
            console.log(res)
            //dispatch({ type: 'LOGIN', payload: res.data })
            toast.success(res.message, {
                theme: "colored",
            })
            //navigate('/business-login')
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
            invoice_items:invoiceData
        }
        console.log(values)
        createInvoiceMutation.mutate(values)
    }

    
    const handleInputChange=(e,handleChange)=>{
        //console.log(e.currentTarget.value)
        if(e.currentTarget.name === 'customer_phone' && e.currentTarget.value.length >10){
            console.log('trigger find customer')
            phoneNumberRef.current=e.currentTarget.value
            setPhoneNumber(phoneNumberRef.current)
        }
        handleChange(e)
        console.log(phoneNumber)
    }

    return (
        <Invoice className='px-[50px]'>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            <div className='box w-full flex flex-col'>
                <div className='w-full flex justify-between border-b-2 border-cyan-900 px-3 py-2'>
                    <h2 className=''>Create Invoice</h2>
                    <select name='currency' onChange={handleCurrencyChange} className='py-3 px-3 rounded-md text-blue_text border border-[#FBFCFE]'>
                        <option value='USD' defaultValue>USD</option>
                        <option value='Naira' >Naira</option>
                    </select>
                </div>
                <div className='px-3 w-full'>
                    <Formik
                        isValid
                        initialValues={{
                            customer_email:'',
                            customer_name:'',
                            notes:'',
                            customer_phone:'',
                            invoice_due_date:value,
                            invoice_items:[
                                {
                                    item_name: "",
                                    weight: '',
                                    price: '',
                                    cbm:'',
                                    description: ""
                                },
                            ],
                            // 'item.name':'',
                            // 'item.weight':'',
                            // 'item.price':'',
                            // 'item.cbm':'',
                            // 'item.description':'',
                        }}
                        validationSchema={
                            Yup.object({
                                customer_email: Yup.string().email("Invalid email address")
                                    .required("email field can not be empty"),
                                customer_name:Yup.string().required("Please enter first name"),
                                customer_phone:Yup.string().required("Please enter phone number"),
                            })
                        }
                        onSubmit={(values, { setSubmitting, resetForm }) => {
                            setSubmitting(false)
                            onSubmit(values)
                            resetForm({
                                customer_email:'',
                                customer_name:'',
                                notes:'',
                                customer_phone:'',
                                invoice_items:[]
                            })
                        }}
                    >
                        {({ isSubmitting,isValid, handleChange }) => (
                            <Form className='flex flex-col py-2'>
                                <div className='flex w-full gap-2'>
                                    {/* <div className='grow'>
                                        <InputField
                                            name='invoice'
                                            type='text'
                                            label='Invoice number'
                                            placeholder='e.g. 09923EJ'
                                        />
                                    </div> */}
                                    <div className='grow'>
                                        <InputField
                                            name='customer_phone'
                                            type='text'
                                            label='Customer Phone'
                                            placeholder='e.g. 08033889999'
                                            // disabled
                                            onChange={(e)=>{handleInputChange(e,handleChange)}}
                                        />
                                    </div>
                                    <div className='grow'>
                                        <InputField
                                            name='customer_email'
                                            type='email'
                                            label='Customer Email'
                                            onChange={(e)=>{handleInputChange(e,handleChange)}}
                                            placeholder='e.g. user@mail.com'
                                        />
                                    </div>
                                </div>
                                
                                <div className='flex w-full gap-2'>
                                    <div className='grow'>
                                        <InputField
                                            name='customer_name'
                                            type='text'
                                            label='Customer Name'
                                            onChange={(e)=>{handleInputChange(e,handleChange)}}
                                            placeholder='e.g. Olawale James'
                                        />
                                    </div>
                                    <div className='grow-0'>
                                        <div className='flex flex-col'>
                                            <label htmlFor='date' className='font-medium text-base text-label mb-[6px]'>Due Date</label>
                                            <DateTimePicker onChange={onChange} value={value} className=''/>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                <div className='flex flex-col'>
                                    <h2 className=''>Order Items</h2>
                                    <p className=''>*You should enter at least 1 item</p>
                                    <div className='flex flex-col w-full'>
                                       
                                        <div className='flex flex-col gap-2 mb-4'>
                                            {
                                                invoiceData.map((val, i) => {
                                                    return (
                                                        <div className='flex w-full gap-2' key={i}>
                                                            {/* <div className='flex grow'>
                                                            <InputField
                                                                name="['item.name']"
                                                                type='text'
                                                                label='Name'
                                                                onChange={(e)=>{handleInputChange(e,handleChange)}}
                                                                placeholder='e.g. Olawale James'
                                                            />
                                                            </div> */}
                                                            <div className='flex grow flex-col'>
                                                                <label className='font-medium text-base text-label mb-[6px]'>Item</label>
                                                                <input className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' type='text' value={val.item} onChange={(e)=>handleItemChange(e,i)} name='item'/>
                                                            </div>
                                                            <div className='flex grow-0 flex-col'>
                                                                <label className='font-medium text-base text-label mb-[6px]'>Quantity</label>
                                                                <input className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' type='text' value={val.quantity} onChange={(e)=>handleItemChange(e,i)} name='quantity'/>
                                                            </div>
                                                            <div className='flex grow-0 flex-col'>
                                                                <label className='font-medium text-base text-label mb-[6px]'>CBM</label>
                                                                <input className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' type='text' value={val.cbm} onChange={(e)=>handleItemChange(e,i)} name='cbm'/>
                                                            </div>
                                                            <div className='flex grow-0 flex-col'>
                                                                <label className='font-medium text-base text-label mb-[6px]'>Price</label>
                                                                <input className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' type='text' value={val.price} onChange={(e)=>handleItemChange(e,i)} name='price'/>
                                                            </div>
                                                            <div className='flex grow-0 flex-col'>
                                                                <label className='font-medium text-base text-label mb-[6px]'>Total</label>
                                                                <input className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' type='text' value={val.price*val.quantity} onChange={(e)=>handleItemChange(e,i)} name='total'/>
                                                            </div>
                                                            {/* <span onClick={()=>handleDelete(i)} className='text-red-600 font-semibold text-xl cursor-pointer'>X</span> */}
                                                            <div className='flex items-end lg:pb-3'>
                                                                <span onClick={()=>handleDelete(i)} className="material-symbols-outlined cursor-pointer text-red-600">delete</span>
                                                            </div>
                                                        </div>
                                                    )
                                                })
                                            }
                                            {/* <p>{JSON.stringify(data)}</p> */}
                                        </div>
                                        <div className='flex'>
                                            <button onClick={handleClick} type='button' className='flex border border-green-700 text-green-700 items-center py-2 px-3 rounded-md'>
                                                <span className="material-symbols-outlined text-green-700">add</span>Add Item
                                            </button>
                                        </div>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='flex flex-col gap-3 p-3 w-[300px] h-auto bg-slate-400 text-black'>
                                            <div className='flex gap-4'>
                                                <h2 className=''>Sub total:</h2>
                                                <span className=''>{calculateSubTotal(invoiceData)} {currency}</span>
                                            </div>
                                            <div className='flex gap-4'>
                                                <h2 className=''>Tax(5%):</h2>
                                                <span className=''>{(calculateSubTotal(invoiceData)*5)/100} {currency}</span>
                                            </div>
                                            <div className='flex gap-4'>
                                                <h2 className=''>Invoice Total:</h2>
                                                <span className=''>{((calculateSubTotal(invoiceData)*10)/100)+calculateSubTotal(invoiceData)} {currency}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <TextField
                                        name='notes'
                                        type='text'
                                        label='Notes (optional)'
                                        placeholder='Enter notes'
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
            <InvoiceFooter/>
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
`

export default NewInvoice