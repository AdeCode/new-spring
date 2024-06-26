import httpService from "./httpService";

async function getAllInvoices({queryKey}){
    const [_key, {currency,status}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/invoice?currency=${currency}&status=${status}`)
    return data
}

async function getInvoices(){
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/invoice`)
    return data
}

async function getInvoicesByCode({queryKey}){
    const [_key, {invoiceCode}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/invoice?invoice_code=${invoiceCode}`)
    return data
}

async function filterInvoiceByStatus({queryKey}){
    const [_key, {status,customerId}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/customers/invoices?customer_id=${customerId}&status=${status}`)
    return data
}

async function filterInvoiceByCurrency({queryKey}){
    const [_key, {currency,customerId,status}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/customers/invoices?customer_id=${customerId}&currency=${currency}&status=${status}`)
    return data
}

async function filterInvoice({queryKey}){
    const [_key, {currency,customerId,status}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/customers/invoices?customer_id=${customerId}&currency=${currency}&status=${status}`)
    return data
}

async function toggleInvoiceStatus({invoice_code, payload}){
    const {data} = await httpService.secureInstance.patch(`/merchants/invoices/invoice?invoice_code=${invoice_code}`,payload)
    return data
}

const invoiceService = {
    getAllInvoices,
    toggleInvoiceStatus,
    getInvoicesByCode,
    filterInvoiceByStatus,
    filterInvoiceByCurrency,
    filterInvoice,
    getInvoices
}

export default invoiceService