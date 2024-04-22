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
    const [key,{type,merchantId}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/web/services?merchant_id=${merchantId}&type=${type}`)
    return data
}

async function deleteWebInformation(itemId){
    const {data} = await httpService.secureInstance.delete(`/merchants/web/services?id=${itemId}`)
    return data
}

async function addVat(payload){
    const {data} = await httpService.secureInstance.post('/merchants/invoices/vat', payload)
    return data
}

async function updateVat(payload){
    const {vat_id} = payload
    const {data} = await httpService.secureInstance.patch(`/merchants/invoices/vat?vat_id=${vat_id}`, payload)
    return data
}

async function getVat({queryKey}){
    const [key,{customerCountry}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/vat?country=${customerCountry}`)
    return data
}

export const deleteVat = async (uid) => {
    const {data} = await httpService.secureInstance.delete(`/merchants/invoices/vat?uid=${uid}`)
    return data
}

async function getAllVat(){
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/vat/all`)
    return data
}

async function getReceiverAddress(){
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/addresses/customer`)
    return data
}

async function getMerchantAddress(){
    const {data} = await httpService.secureInstance.get(`/merchants/invoices/addresses/merchant`)
    return data
}

async function createReceiverAddress(payload){
    const {data} = await httpService.secureInstance.post(`/merchants/invoices/addresses/customer`, payload)
    return data
}

async function createSenderAddress(payload){
    const {data} = await httpService.secureInstance.post(`/merchants/invoices/addresses/merchant`, payload)
    return data
}

export const createPermission = async (payload) => {
    const {data} = await httpService.secureInstance.post(`/merchants/auth/accounts/permissions`, payload)
    return data
}

export const createRole = async (payload) => {
    const {data} = await httpService.secureInstance.post(`/merchants/auth/accounts/roles`, payload)
    return data
}

export const createUser = async (payload) => {
    const {data} = await httpService.secureInstance.post(`/merchants/auth/accounts`, payload)
    return data
}

export const getUsers = async () => {
    const {data} = await httpService.secureInstance.get(`/merchants/auth/accounts`)
    return data
}


export const getRoles = async () => {
    const {data} = await httpService.secureInstance.get(`/merchants/auth/accounts/roles`)
    return data
}

export const getGroupPermissions = async () => {
    const {data} = await httpService.secureInstance.get(`/merchants/auth/accounts/permissions/groups`)
    return data
}

export const getPermissions = async () => {
    const {data} = await httpService.secureInstance.get(`/merchants/auth/accounts/permissions`)
    return data
}

export const getPermission = async ({queryKey}) => {
    const [key,{permissionId}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/auth/accounts/permissions?id=${permissionId}`)
    return data
}

export const getSubUser = async ({queryKey}) => {
    const [key,{userId}] = queryKey
    const {data} = await httpService.secureInstance.get(`/merchants/auth/accounts?id=${userId}`)
    return data
}

export const updateUser = async (payload) => {
    const {data} = await httpService.secureInstance.patch(`/merchants/auth/accounts`,payload)
    return data
}


const merchantService = {
    getRoles,
    getMerchantAddress,
    createSenderAddress,
    getReceiverAddress,
    createReceiverAddress,
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
    deleteWebInformation,
    addVat,
    getVat,
    updateVat,
    getAllVat
}

export default merchantService