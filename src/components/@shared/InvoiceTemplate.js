import React, { useContext, useRef, useState } from 'react'
import styled from 'styled-components'
import gig from '../../images/dashboard/gig.png'
import mastercard from '../../images/dashboard/Mastercard-logo.png'
import visa from '../../images/dashboard/visa.png'
import logo from '../../images/home/logo1.png'
import InvoiceFooter from './InvoiceFooter'
import CheckBox from './CheckBox'
import TextField from './TextField'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import helperFunctions from '../../@helpers/helperFunctions'
import jsPDF from 'jspdf';
import ReactToPrint from 'react-to-print'
import { AuthContext } from '../../contexts/AuthContexts'
import { useQuery } from 'react-query'
import merchantService from '../../@services/merchantService'

function InvoiceTemplate() {
    const {state} = useContext(AuthContext)

    const { data: profile, isLoading, error } = useQuery(['merchant_profile'], merchantService.getMerchantProfile)

    const invoiceTemplateRef = useRef(null)

    const [agree, setAgree] = useState(true)

    const navigate = useNavigate()

    const location = useLocation()
    
    const data = location.state.invoice.invoice

    const styles = {
        container: {
            // background:'blue',
            display: 'flex',
            flexDirection: 'column',
            width: '100%'
        },
        top: {
            display: 'flex',
            justifyContent: 'space-between'
        }
    }

    return (
        <Div>
            <div style={styles.container} className='border border-gray rounded-lg' ref={invoiceTemplateRef}>
                <div style={styles.top} className="flex justify-between border-b border-gray p-4">
                    <div className='flex flex-col gap-3'>
                        <h2 className='font-bold text-2xl text-green-700'>INVOICE</h2>
                        <div className='max-w-[100px] max-h-[100px]'>
                            <img className='object-contain h-[100px]' src={profile?.data?.profile?.business_logo} alt={profile?.data?.profile?.business_name}/>
                        </div>
                    </div>
                    
                        {
                            (!profile?.data?.profile) ? 
                            <h3>
                                <Link to='/settings/personal-information' className='text-semibold text-yellow-700'>Update your profile </Link> 
                                to unlock all invoice features
                            </h3> :
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-semibold text-2xl text-neutral-700 text-end'>{profile?.data?.profile?.business_name}</h2>
                                <p className='text-base'>
                                    {
                                        (profile?.data?.profile?.official_address === null) ? 
                                        <h3>
                                            <Link to='/settings/personal-information' className='text-semibold text-yellow-700'>Update your profile </Link> 
                                            to unlock all invoice features
                                        </h3> 
                                        :
                                        profile?.data?.profile?.office_address_number+ ' ' +((profile?.data?.profile?.official_address === null) ? '' : profile?.data?.profile?.official_address)


                                    }
                                </p>
                                <h3 className='text-right'>{profile?.data?.merchant_account_profile?.phone}</h3>
                            </div>
                        }
                    
                </div>
                <div className='p-4'>
                    <div className='flex justify-between'>
                        <div className='flex flex-col gap-1'>
                            <div className='flex gap-2'>
                                <h3 className='text-neutral-700'>To: </h3><span className='text-black'>{data?.name}</span>
                            </div>
                            <h3 className='text-base'>{data?.email}</h3>
                            <h3 className='text-base'>{data?.phone}</h3>
                            <div className='flex justify-between'>
                                <h3 className=''>Sender's Name:</h3><span className='font-medium'>{data?.sender_name}</span>
                            </div>
                            <div className='flex justify-between'>
                                <h3 className=''>Sender's Address:</h3><span className='font-medium'>{data?.sender_address}</span>
                            </div>
                            <div className='flex justify-between'>
                                <h3 className=''>Sender's Phone:</h3><span className='font-medium'>{data?.sender_phone}</span>
                            </div>
                        </div>
                        <div className='w-[300px] border flex flex-col'>
                            <div className='flex border-b justify-between py-1 px-2'>
                                <h3 className=''>Due date</h3><span className='font-medium'>{data?.due_date}</span>
                            </div>
                            <div className='flex border-b justify-between py-1 px-2'>
                                <h3 className=''>Invoice date</h3><span className='font-medium'>{data?.creation_date}</span>
                            </div>
                            <div className='flex border-b justify-between py-1 px-2'>
                                <h3 className=''>Invoice #</h3><span className='font-medium'>{data?.invoice_code}</span>
                            </div>
                            <div className='flex border-b justify-between py-1 px-2'>
                                <h3 className=''>Invoice Total</h3><span className='font-medium'>{helperFunctions.formatCurrency(data?.currency, data?.total_cost)}</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col'>
                    <div className='flex justify-between mt-2'>
                        <h2 className='text-green-700 font-semibold'>Invoice details</h2>
                        <span className='flex gap-2'>Invoice Status: 
                            <h2 className={`${data?.status === 'PAID' ? 'text-green-700' : 'text-red-700'} font-semibold`}>
                                {data?.status}
                            </h2>
                        </span>
                    </div>
                        <div className='py-6'>
                            <table className='w-full border-b'>
                                <thead className='bg-green-700 text-white h-[50px] rounded-md'>
                                    <tr className='py-4'>
                                        <th>Items</th>
                                        <th>Quantity</th>
                                        <th>CBM</th>
                                        <th>Price</th>
                                        <th>SubTotal</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.items.map(invoice => {
                                            return (
                                                <tr className='' key={invoice.item_name}>
                                                    <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.item_name}</td>
                                                    <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.quantity} {invoice?.unit}</td>
                                                    <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.cbm}</td>
                                                    <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.price}</td>
                                                    <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.price}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='flex w-full justify-between'>
                            <div className='w-[500px] flex gap-3'>
                                <h3 className='text-neutral-700'>Notes:</h3>
                                <textarea className='p-2 bg-inherit border opacity-70' defaultValue={data?.note || ''} id="note" name="note" rows="3" cols="70" readOnly>
                                    {/* {data?.note} */}
                                </textarea>
                            </div>
                            <div className='border flex flex-col w-[300px]'>
                                <div className='flex justify-between py-2 px-2'>
                                    <h2 className=''>Subtotal:</h2><span className=''>{helperFunctions.formatCurrency(data?.currency, data?.sub_total)}</span>
                                </div>
                                <div className='flex justify-between py-2 px-2'>
                                    <h2 className=''>Tax:({data?.vat * 100} %)</h2><span className=''>{helperFunctions.formatCurrency(data?.currency, (data?.sub_total * data?.vat))}</span>
                                </div>
                                <div className='flex justify-between py-4 px-2 bg-slate-400 text-black'>
                                    <h2 className='font-semibold'>Grand Total:</h2><span className='font-semibold'>{helperFunctions.formatCurrency(data?.currency, data?.total_cost)}</span>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-col border-b pb-3'>
                            <CheckBox
                                onChange={() => setAgree(!agree)}
                                checked={agree}
                            />
                            <div className='w-full flex justify-end gap-4'>
                                <ReactToPrint
                                    trigger={() => (
                                        <Button type="submit" className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Download</Button>
                                    )}
                                    content={() => invoiceTemplateRef.current}
                                />
                                <Button type="submit" disabled={!agree} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Pay Now</Button>

                            </div>
                            {/* <button className=''>Pay Now</button> */}
                        </div>
                        <div className='flex justify-between mt-4'>
                            <div className='flex gap-2'>
                                <img src={mastercard} alt='mastercard-logo' width='50px' height='50px' />
                                <img src={visa} alt='visa-logo' width='50px' height='50px' />
                            </div>
                            <div className='flex items-center gap-2'>
                                <h3 className='w-fit text-gray text-base font-medium'>Secured by</h3>
                                <img src={logo} alt='visa-logo' width='60px' height='50px' />
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <InvoiceFooter />
                    </div>
                </div>
            </div>
            {/* <InvoiceFooter /> */}
        </Div>

    )
}

const Div = styled.div`
    @media print{
        padding: 5px 20px;
    }
`


const Button = styled.button`
    @media print{
        display:none;
    }
`

export default InvoiceTemplate