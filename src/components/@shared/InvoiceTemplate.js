import React, { useRef, useState } from 'react'
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

function InvoiceTemplate() {
    const invoiceTemplateRef = useRef(null)

    const [agree, setAgree] = useState(false)

    const navigate = useNavigate()

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

    const location = useLocation()
    const data = location.state.invoice.invoice
    // console.log(data)

    const styles = {
        container:{
            // background:'blue',
            display:'flex',
            flexDirection:'column',
            width:'100%'
        },
        top:{
            display:'flex',
            justifyContent:'space-between'
        }
    }

  return (
    <>
    <div style={styles.container} className='border border-gray rounded-lg' ref={invoiceTemplateRef}>
        <div style={styles.top} className="flex justify-between border-b border-gray p-4">
            <div className='flex flex-col gap-3'>
                <h2 className='font-bold text-2xl text-green-700'>INVOICE</h2>
                <div className='w-[100px] h-[100px]'>
                    <img src={gig} alt='company'/>
                </div>
                {/* <p className='text-base'>Business Logo here</p> */}
            </div>
            <div className='flex flex-col gap-3'>
                <h2 className='font-semibold text-2xl text-neutral-700'>GIG LOGISTICS INT'L EXPRESS</h2>
                <p className='text-base'>No 6, Gbagada, Lagos.</p>
            </div>
        </div>
        <div className='p-4'>
            <div className='flex justify-between'>
                <div className='flex gap-1'>
                    <h3 className='text-neutral-700'>To: </h3><span className='text-black'>{data?.name}</span>
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
                        <h3 className=''>Invoice Total</h3><span className='font-medium'>{helperFunctions.formatCurrency(data?.currency,data?.total_cost)}</span>
                    </div>
                </div>
            </div>
            <div className='flex flex-col'>
                <h2 className='text-green-700 font-semibold'>Invoice details</h2>
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
                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.quantity}</td>
                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.cbm || 2}</td>
                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.price}</td>
                                            <td className='m-0 text-center py-3 text-sm font-medium'>{invoice?.price}</td>
                                        </tr>
                                    )
                                })
                            }
                            {/* <tr className=''>
                                <td className='m-0 text-center py-3 text-sm font-medium'>Iron rod</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>500</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>40</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>478</td>
                                <td className='m-0 text-center py-3 text-sm font-medium'>21099</td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
                <div className='flex w-full justify-between'>
                    <div className='w-[500px] flex gap-3'>
                        <h3 className='text-neutral-700'>Notes:</h3>
                        <textarea className='p-2 bg-inherit border opacity-70' id="note" name="note" rows="3" cols="70" readOnly>
                        {data?.note}
                        </textarea>
                    </div>
                    <div className='border flex flex-col w-[300px]'>
                        <div className='flex justify-between py-2 px-2'>
                            <h2 className=''>Subtotal:</h2><span className=''>{helperFunctions.formatCurrency(data?.currency,data?.total_cost)}</span>
                        </div>
                        <div className='flex justify-between py-2 px-2'>
                            <h2 className=''>Tax:(7.5%)</h2><span className=''>{helperFunctions.formatCurrency(data?.currency,(data?.total_cost * data?.tax))}</span>
                        </div>
                        <div className='flex justify-between py-4 px-2 bg-slate-400 text-black'>
                            <h2 className='font-semibold'>Invoice Total:</h2><span className='font-semibold'>{helperFunctions.formatCurrency(data?.currency,data?.total_cost)}</span>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col border-b pb-3'>
                    <CheckBox
                        onChange={()=>setAgree(!agree)}
                        checked={agree}
                    />
                    <div className='w-full flex justify-end gap-4'>
                        <button type="submit" onClick={handleGeneratePdf} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Download</button>
                        <button type="submit" disabled={!agree} className='btn bg-green-700 hover:bg-green-600 lg:w-[200px] disabled:opacity-60 disabled:cursor-not-allowed w-full rounded-md py-[11px] text-white text-[16px] mt-[6px]'>Pay Now</button>

                    </div>
                    {/* <button className=''>Pay Now</button> */}
                </div>
                <div className='flex justify-between mt-4'>
                    <div className='flex gap-2'>
                        <img src={mastercard} alt='mastercard-logo' width='80px' height='80px'/>
                        <img src={visa} alt='visa-logo' width='80px' height='80px'/>
                    </div>
                    <div className='flex items-center gap-2'>
                        <h3 className='w-fit text-gray text-base font-medium'>Secured by</h3>
                        <img src={logo} alt='visa-logo'/>
                    </div>
                </div>
            </div>
        </div>
    </div>
        <InvoiceFooter/>
    </>
    
  )
}


export default InvoiceTemplate