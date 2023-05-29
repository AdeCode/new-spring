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

const customerService = {
    fetchCustomerByPhoneNumber,
    fetchMerchantCustomers,
    fetchAllCustomers
}

export default customerService

