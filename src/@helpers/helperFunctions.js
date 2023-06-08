import axios from 'axios'

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
    try{
        const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
        //console.log(res.data.data);
        return res.data.data
    }catch(error){
        console.log(error)
    }
}

const helperFunctions = {
    nairaFormat,
    dollarFormat,
    euroFormat,
    poundFormat,
    filterCard,
    filterWallet,
    formatCurrency,
    getCountries
}



export default helperFunctions