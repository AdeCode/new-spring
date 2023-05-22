import httpService from "./httpService";

async function getAllInvoices(){
    const {data} = await httpService.secureInstance.get('/merchants/invoices/invoice')
    return data
}

const invoiceService = {
    getAllInvoices
}

export default invoiceService