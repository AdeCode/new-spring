import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'


function formatCurrency(currency, price){
    switch(currency){
        case 'NGN':
            return (new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
              })).format(price)

        case 'Naira':
            return (new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
              })).format(price)

        case 'USD':
            return (new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'narrowSymbol',
              })).format(price)
        default:
            return price
    }
}

export const currencyFormatter = (currency, price) => {
    switch(currency){
        case 'NGN':
            return (new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
              })).format(price)

        case 'Naira':
            return (new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'NGN'
              })).format(price)

        case 'USD':
            return (new Intl.NumberFormat('en-NG', {
                style: 'currency',
                currency: 'USD',
                currencyDisplay: 'narrowSymbol',
              })).format(price)
        default:
            return price
    }
}

export const mergeData = (data) => {
    const newData = []
    if(data?.length > 0) {
        for (let i=0; i<data?.length; i++) {
            for(let k=0; k<data[i].length; k++) {
                newData.push(data[i][k])
            }
        }
    }
    
    return newData
}

function nairaFormat(price){
    return (new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'NGN'
      })).format(price)
}

function dollarFormat(price){
    return (new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'narrowSymbol',
      })).format(price)
}

function euroFormat(price){
    return (new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'EUR'
      })).format(price)
}

function poundFormat(price){
    return (new Intl.NumberFormat('en-NG', {
        style: 'currency',
        currency: 'GBP'
      })).format(price)
}

function filterWallet(data){
    const filtered = []
    data.map(item =>filtered.push(item.amount))
    return filtered
}

function filterCard(data){
    const filtered = []
    data.map(item =>filtered.push(item.amount))
    return filtered
}


const getCountries = async() => {
    let data = null
    let loading = false
    try{
        loading = true
        const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
        data = res.data.data
        loading = false
        return res.data.data
    }catch(error){
        toast.error('Unable to load countries',{
            theme: "colored",
        })
    }
}


export const getTaxRate = (rate) => {
    if(!!rate){
        return rate
    }else{
        return 0
    }
}

export const pageStatus = (accountDetails, accountProfile, dataProfile) => {
    if(!accountDetails || !accountProfile || !dataProfile){
        return true
    }else{
        return false
    }
}

export const calculateSubTotal = (data) => {
    const sum = data.reduce((accumulator, curr) => {
        return accumulator += +curr.price
    }, 0)
    sum.toFixed(2)
    return sum
}

export const calculateTax=(data, taxRate)=>{
    const total = calculateSubTotal(data)
    const sendTotal = ((total * taxRate) / 100).toFixed(2)
    return +sendTotal
}

export const calculateInvoiceTotal = (data,taxRate)=>{
    return (calculateSubTotal(data)+calculateTax(data,taxRate)).toFixed(2)
}



const helperFunctions = {
    nairaFormat,
    dollarFormat,
    euroFormat,
    poundFormat,
    filterCard,
    filterWallet,
    formatCurrency,
    getCountries,
    getTaxRate
}



export default helperFunctions