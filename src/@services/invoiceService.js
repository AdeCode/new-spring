import httpService from "./httpService";

async function getAllInvoices(){
    const {data} = await httpService.secureInstance.get('/merchants/invoices/invoice')
    return data
}

async function getInvoicesByCode({queryKey}){
    const [_key, {invoiceCode}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/invoice?invoice_code=${invoiceCode}`)
    return data
}

async function toggleInvoiceStatus({invoice_code, payload}){
    console.log(payload)
    //const [_key, {invoice_code}] = queryKey
    const {data} = await httpService.secureInstance.patch(`/merchants/invoices/invoice/${invoice_code}`,payload)
    return data
}

const invoiceService = {
    getAllInvoices,
    toggleInvoiceStatus,
    getInvoicesByCode
}

export default invoiceService