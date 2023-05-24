import httpService from "./httpService";

async function login(payload){
    const {data} = await httpService.guestInstance.post('/merchants/auth', payload)
    return data
}

async function adminLogin(payload){
    const {data} = await httpService.guestInstance.post('/admin/auth', payload)
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

const merchantService = {
    login,
    registerBusiness,
    logout,
    verifyEmail,
    createInvoice,
    resetPassword,
    adminLogin,
}

export default merchantService