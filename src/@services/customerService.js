import httpService from "./httpService";

async function fetchCustomerByPhoneNumber(phoneNumber){
    const {data} = await httpService.secureInstance.get(`/customers/user?phone_number=${phoneNumber}`)
    return data
}

async function fetchMerchantCustomers({queryKey}){
    const [_key, {selectedCountry}] = queryKey
    const {data} = await httpService.secureInstance.get(`/customers/user?country=${selectedCountry}`)
    return data
}

async function fetchAllCustomers(country){
    const {data} = await httpService.secureInstance.get(`/merchants/customers/list?${country}`)
    return data
}

async function searchCustomers(){
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
    fetchCustomerInvoices,
    searchCustomers
}

export default customerService

