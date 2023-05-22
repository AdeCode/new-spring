import httpService from "./httpService";

async function login(payload){
    const {data} = await httpService.guestInstance.post('/customers/auth', payload)
    return data
}

async function adminLogin(payload){
    const {data} = await httpService.guestInstance.post('/admin/auth', payload)
    return data
}

async function customerLogin(payload){
    const {data} = await httpService.guestInstance.post('/admin/auth', payload)
    return data
}

async function registerCustomer(payload){
    const {data} = await httpService.guestInstance.put('/customers/auth', payload)
    return data
}

async function forgotPassword(payload){
    const {data} = await httpService.guestInstance.post('/customers/auth/password', payload)
    return data
}

async function verifyToken(payload){
    const {data} = await httpService.guestInstance.post('/verify-token', payload)
    return data
}

async function resetPassword(payload){
    const {data} = await httpService.guestInstance.patch('/customers/auth/password', payload)
    return data
}

async function logout(){
    const {data} = await httpService.secureInstance.post('/logout')
    return data
}

const authService = {
    login,
    registerCustomer,
    logout,
    forgotPassword,
    verifyToken,
    resetPassword,
    adminLogin,
    customerLogin,
}

export default authService