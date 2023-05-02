export const validate = (field) => {
    if (field === ''){
        return false;
    }else{
        return true;
    }
}

export const checkMail = (field) => {
    if (field === ''){
        return false;
    }else{
        return true;
    }
}


const service = {
    validate,
    checkMail,
}

export default service