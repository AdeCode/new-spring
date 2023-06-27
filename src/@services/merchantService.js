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
    const {data} = await httpService.secureInstance.patch('/merchants/profile', payload)
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

async function updateAccountDetails(payload){
    const {data} = await httpService.secureInstance.patch('/merchants/business/account',payload)
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

async function confirmBankDetails(payload){
    const {data} = await httpService.secureInstance.post('/merchants/bank/look-up',payload)
    return data
}

async function getBusinessCategories(){
    const {data} = await httpService.secureInstance.get('/merchants/business/category')
    return data
}

async function getVendors({queryKey}){
    const [_key, {businessName}] = queryKey
    const {data} = await httpService.guestInstance.get(`/merchants/business/list?business_name=${businessName}`)
    return data
}

async function getVendor({queryKey}){
    const [_key, {hash}] = queryKey
    const {data} = await httpService.guestInstance.get(`/merchants/business/list?merchant_hash=${hash}`)
    return data
}

async function getMerchantProfile(){
    const {data} = await httpService.secureInstance.get('/merchants/profile')
    return data
}

async function getBankList(){
    const {data} = await httpService.guestInstance.get('/merchants/bank/list')
    return data
}

async function addMerchantService(payload){
    const {data} = await httpService.secureInstance.post('/merchants/web/services',payload)
    return data
}

async function addMerchantDeliveryRegion(payload){
    const {data} = await httpService.secureInstance.post('/merchants/web/services',payload)
    return data
}

async function deleteMerchantService(payload){
    const {data} = await httpService.secureInstance.post(`/merchants/web/services?id=2`)
    return data
}

async function getMerchantService({queryKey}){
    const [_key, {selectedMerchantId}] = queryKey
    const {data} = await httpService.guestInstance.get(`/merchants/web/services?merchant_id=${selectedMerchantId}`)
    return data
}

async function getWebInformation({queryKey}){
    const [_key, {type,merchantId}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/web/services?merchant_id=${merchantId}&type=${type}`)
    return data
}

async function deleteWebInformation(itemId){
    const {data} = await httpService.secureInstance.delete(`/merchants/web/services?id=${itemId}`)
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
    saveAccountProfile,
    getBankList,
    confirmBankDetails,
    getVendors,
    updateAccountDetails,
    getVendor,
    addMerchantService,
    deleteMerchantService,
    getMerchantService,
    addMerchantDeliveryRegion,
    getWebInformation,
    deleteWebInformation
}

export default merchantService