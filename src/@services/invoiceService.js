import httpService from "./httpService";

async function getAllInvoices(){
    const {data} = await httpService.secureInstance.get('/merchants/invoices/invoice')
    return data
}

async function toggleInvoiceStatus({invoice_code, payload}){
    console.log(payload)
    //const [_key, {invoice_code}] = queryKey
    const {data} = await httpService.secureInstance.put(`/merchants/invoices/invoice/${invoice_code}`,payload)
    return data
}

const invoiceService = {
    getAllInvoices,
    toggleInvoiceStatus

}

export default invoiceService