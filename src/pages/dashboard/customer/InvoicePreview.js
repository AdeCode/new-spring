import React, { useRef, useState } from 'react'
import styled from 'styled-components'
import gig from '../../../images/dashboard/gig.png'
import mastercard from '../../../images/dashboard/Mastercard-logo.png'
import visa from '../../../images/dashboard/visa.png'
import logo from '../../../images/home/logo1.png'
import TextField from '../../../components/@shared/TextField'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import jsPDF from 'jspdf';
import helperFunctions from '../../../@helpers/helperFunctions'
import InvoiceFooter from '../../../components/@shared/InvoiceFooter'
import CheckBox from '../../../components/@shared/CheckBox'
import { useQuery } from 'react-query'
import invoiceService from '../../../@services/invoiceService'
import ReactToPrint from 'react-to-print'
import merchantService from '../../../@services/merchantService'



function InvoicePreview() {
    const invoiceTemplateRef = useRef(null)

    const [agree, setAgree] = useState(true)

    const { invoiceCode } = useParams()

    const navigate = useNavigate()

    const { data: invoice, isLoading, error, isError } = useQuery(['invoice', { invoiceCode }], invoiceService.getInvoicesByCode)
    invoice && console.log(invoice)

    const handleGeneratePdf = () => {
        const doc = new jsPDF({
            orientation: 'landscape',
            format: [495.28, 741.89],
            unit: 'px',
        });

        // Adding the fonts.
        doc.setFont('Inter-Regular', 'normal');

        doc.html(invoiceTemplateRef.current, {
            async callback(doc) {
                await doc.save('invoice');
            },
        });
    }

    const { data: profile, isLoading: profileLoading } = useQuery(['merchat_profile'], merchantService.getMerchantProfile)
    profile && console.log(profile)
    // const location = useLocation()
    // const data = location.state.invoice.invoice
    // console.log(data)

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
        <>
            <Link onClick={() => navigate(-1)} className='flex gap-2 items-center mb-6'>
                <span className="material-symbols-outlined">keyboard_backspace</span><h2 className=''>Back</h2>
            </Link>
            {
                isLoading ? 'Loading...'
                    :
                    <div style={styles.container} className='border border-gray rounded-lg' ref={invoiceTemplateRef}>
                        <div style={styles.top} className="flex justify-between border-b border-gray p-4">
                            <div className='flex flex-col gap-3'>
                                <h2 className='font-bold text-2xl text-green-700'>INVOICE</h2>
                                <div className='max-w-[100px] max-h-[100px]'>
                                    <img src={profile?.data?.profile?.business_logo} alt={profile?.data?.profile?.business_name} />
                                </div>
                            </div>
                            {
                                (!profile?.data) ?
                                    <h3>
                                        <Link to='/settings/personal-information' className='text-semibold text-yellow-700'>Update your profile </Link>
                                        to unlock all invoice features
                                    </h3> :
                                    <div className='flex flex-col gap-3'>
                                        <h2 className='font-semibold text-2xl text-neutral-700'>{profile?.data?.profile?.business_name}</h2>
                                        <p className='text-base'>
                                            {
                                                (profile?.data?.profile?.official_address === null) ?
                                                    <h3>
                                                        <Link to='/settings/personal-information' className='text-semibold text-yellow-700'>Update your profile </Link>
                                                        to unlock all invoice features
                                                    </h3>
                                                    :
                                                    profile?.data?.profile?.office_address_number + ' ' + ((profile?.data?.profile?.official_address === null) ? '' : profile?.data?.profile?.official_address)


                                            }
                                        </p>
                                    </div>
                            }

                        </div>
                        <div className='p-4'>
                            <div className='flex justify-between'>
                                <div className='flex flex-col gap-1'>
                                    <div className='flex gap-2'>
                                        <h3 className='text-neutral-700'>To: </h3><span className='text-black'>{invoice?.invoice?.name}</span>
                                    </div>
                                    <h3 className='text-base'>{invoice?.invoice?.email}</h3>
                                    <h3 className='text-base'>{invoice?.invoice?.phone}</h3>
                                </div>
                                <div className='w-[300px] border flex flex-col'>
                                    <div className='flex border-b justify-between py-1 px-2'>
                                        <h3 className=''>Due date</h3><span className='font-medium'>{invoice?.invoice?.due_date}</span>
                                    </div>
                                    <div className='flex border-b justify-between py-1 px-2'>
                                        <h3 className=''>Invoice date</h3><span className='font-medium'>{invoice?.invoice?.creation_date}</span>
                                    </div>
                                    <div className='flex border-b justify-between py-1 px-2'>
                                        <h3 className=''>Invoice #</h3><span className='font-medium'>{invoice?.invoice?.invoice_code}</span>
                                    </div>
                                    <div className='flex border-b justify-between py-1 px-2'>
                                        <h3 className=''>Grand Total</h3><span className='font-medium'>{helperFunctions.formatCurrency(invoice?.invoice?.currency, invoice?.invoice?.total_cost)}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <div className='flex justify-between mt-2'>
                                    <h2 className='text-green-700 font-semibold'>Invoice details</h2>
                                    <span className='flex gap-2'>Invoice Status:
                                        <h2 className={`${invoice?.invoice?.status === 'PAID' ? 'text-green-700' : 'text-red-700'} font-semibold`}>
                                            {invoice?.invoice?.status}
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
                                                invoice?.invoice?.items.map(invoice => {
                                                    return (
                                                        <tr className='' key={invoice.item_name}>
                                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.item_name}</td>
                                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.quantity}</td>
                                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.cbm || 2}</td>
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
                                        <textarea className='p-2 bg-inherit border opacity-70' defaultValue={invoice?.invoice?.note || ''} id="note" name="note" rows="3" cols="70" readOnly>
                                        </textarea>
                                    </div>
                                    <div className='border flex flex-col w-[300px]'>
                                        <div className='flex justify-between py-2 px-2'>
                                            <h2 className=''>Subtotal:</h2><span className=''>{helperFunctions.formatCurrency(invoice?.invoice?.currency, invoice?.invoice?.sub_total)}</span>
                                        </div>
                                        <div className='flex justify-between py-2 px-2'>
                                            <h2 className=''>Tax:(7.5%)</h2><span className=''>{helperFunctions.formatCurrency(invoice?.invoice?.currency, (invoice?.invoice?.sub_total * invoice?.invoice?.tax))}</span>
                                        </div>
                                        <div className='flex justify-between py-4 px-2 bg-slate-400 text-black'>
                                            <h2 className='font-semibold'>Grand Total:</h2><span className='font-semibold'>{helperFunctions.formatCurrency(invoice?.invoice?.currency, invoice?.invoice?.total_cost)}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='flex flex-col border-b pb-3'>
                                    {
                                        invoice?.invoice?.status === 'UNPAID' ?
                                            <CheckBox
                                                onChange={() => setAgree(!agree)}
                                                checked={agree}
                                            />
                                            :
                                            null
                                    }

                                    <div className='w-full flex justify-end gap-4 mt-3'>
                                        <ReactToPrint
                                            trigger={() => (
                                                <Button type="submit" className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Download</Button>
                                            )}
                                            content={() => invoiceTemplateRef.current}
                                        />
                                        {
                                            invoice?.invoice?.status === 'UNPAID' ?
                                                <button type="submit" disabled={!agree} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Pay Now</button>
                                                : null
                                        }

                                    </div>
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
            }

            {/* <InvoiceFooter/> */}
        </>
    )
}

const Button = styled.button`
    @media print{
        display:none;
    }
`

export default InvoicePreview
