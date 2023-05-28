import httpService from "./httpService";

// async function fetchCustomerByPhoneNumber({queryKey}){
//     const [_key, {phoneNumber}] = queryKey
//     const {data} = await httpService.secureInstance.get(`/customers/user?phone_number=${phoneNumber}`)
//     return data
// }
async function fetchCustomerByPhoneNumber(phoneNumber){
    //const [_key, {phoneNumber}] = queryKey
    const {data} = await httpService.secureInstance.get(`/customers/user?phone_number=${phoneNumber}`)
    return data
}

const customerService = {
    fetchCustomerByPhoneNumber
}

export default customerService

