import httpService from "./httpService";

async function login(payload){
    const {data} = await httpService.guestInstance.post('/merchants/auth', payload)
    return data
}

async function adminLogin(payload){
    const {data} = await httpService.guestInstance.post('/admin/auth', payload)
    return data
}

async function updateProfile(payload){
    const {data} = await httpService.secureInstance.post('/merchants/profile', payload)
    return data
}


async function registerBusiness(payload){
    const {data} = await httpService.guestInstance.put('/merchants/auth', payload)
    return data
}

async function verifyEmail(payload){
    const {data} = await httpService.guestInstance.post('/merchants/auth/pin', payload)
    return data
}

async function createInvoice(payload){
    const {data} = await httpService.secureInstance.post('/merchants/invoices/invoice', payload)
    return data
}



async function resetPassword(payload){
    const {data} = await httpService.guestInstance.patch('/merchants/auth/password', payload)
    return data
}

async function logout(){
    const {data} = await httpService.secureInstance.post('/logout')
    return data
}

async function saveAccountDetails(payload){
    const {data} = await httpService.secureInstance.post('/merchants/business/account',payload)
    return data
}

async function saveKycIdentity(payload){
    const {data} = await httpService.secureInstance.post('/merchants/profile/kyc',payload)
    return data
}

async function saveKycOccupation(payload){
    const {data} = await httpService.secureInstance.post('/merchants/profile/kyc/occupation',payload)
    return data
}

async function saveAccountProfile(payload){
    const {data} = await httpService.secureInstance.post('/merchants/profile/account-profile',payload)
    return data
}

async function getBusinessCategories(){
    const {data} = await httpService.secureInstance.get('/merchants/business/category')
    return data
}

async function getMerchantProfile(){
    const {data} = await httpService.secureInstance.get('/merchants/profile')
    return data
}

const merchantService = {
    login,
    registerBusiness,
    logout,
    verifyEmail,
    createInvoice,
    resetPassword,
    adminLogin,
    updateProfile,
    getBusinessCategories,
    saveAccountDetails,
    saveKycIdentity,
    saveKycOccupation,
    getMerchantProfile,
    saveAccountProfile
}

export default merchantService