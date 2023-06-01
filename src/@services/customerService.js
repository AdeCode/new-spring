import httpService from "./httpService";

async function fetchCustomerByPhoneNumber(phoneNumber){
    //const [_key, {phoneNumber}] = queryKey
    const {data} = await httpService.secureInstance.get(`/customers/user?phone_number=${phoneNumber}`)
    return data
}

async function fetchMerchantCustomers(){
    const {data} = await httpService.secureInstance.get('/customers/user')
    return data
}

async function fetchAllCustomers(){
    const {data} = await httpService.secureInstance.get(`/merchants/customers/list`)
    return data
}

async function fetchCustomerInvoices({queryKey}){
    const [_key, {customerId}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/customers/invoices?customer_id=${customerId}`)
    return data
}

const customerService = {
    fetchCustomerByPhoneNumber,
    fetchMerchantCustomers,
    fetchAllCustomers,
    fetchCustomerInvoices
}

export default customerService

