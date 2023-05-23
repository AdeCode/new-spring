import httpService from "./httpService";

async function fetchCustomerByPhoneNumber({phoneNumber}){
    const {data} = await httpService.secureInstance.get(`/customers/user?phone_number=${phoneNumber}`)
    return data
}

const customerService = {
    fetchCustomerByPhoneNumber
}

export default customerService

