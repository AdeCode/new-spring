import axios from "axios";
import { useField, useFormikContext } from "formik";
import { useEffect } from "react";
import { useMutation, useQuery } from "react-query";
import customerService from "../../@services/customerService";
import merchantService from "../../@services/merchantService";
import { toast } from 'react-toastify'

export const useNameField = (props,setCustomerExists,vatRate) => {
    const {
        values: { customer_phone, }, setFieldValue,
    } = useFormikContext();

    const [field, meta] = useField(props)

    useEffect(() => {
        setFieldValue('vat',vatRate?.data[0]?.vat_value ? vatRate?.data[0]?.vat_value : 0)
        let isCurrent = true;
        if (customer_phone && customer_phone.length > 10) {
            //make API call
            const phoneNumber = customer_phone
            customerService.fetchCustomerByPhoneNumber(phoneNumber)
                .then(res => {
                    //console.log(res)
                    if (!!isCurrent && res.data) {
                        setFieldValue(props.name, res.data.name);
                        setFieldValue('customer_email', res.data.email);
                        setCustomerExists(true)
                    }else{
                        setCustomerExists(false)
                    }
                },
                    (err) => {
                        console.log('customer doesnt exists')
                        setFieldValue(props.name, '');
                        setFieldValue('customer_email', '');
                        setCustomerExists(false)
                        //console.log(err)
                    }
                )
        }

        return () => {
            isCurrent = false;
        };
    }, [props.name, customer_phone, setFieldValue])
    

    return (
        <div className='flex flex-col'>
            <label htmlFor='name' className='font-medium text-base text-label mb-[6px]'>Receiver Name</label>
            <input {...props} {...field} className='h-10 py-2 px-[14px] text-input_text text-sm font-[450] rounded-lg' />
            {!!meta.touched && !!meta.error && <div className='text-red-500'>{meta.error}</div>}
        </div>
    );
}

export const useCountriesQuery = () => {
    const countryQuery = useQuery(
        ['countries'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        }
    )
    // const {data,isLoading,error} = countryQuery
    return {...countryQuery}
}

export const useStatesQuery = (payload) => {
    console.log(payload)
    const stateQuery = useQuery(
        ['states'],
        async () => {
            try {
                const res = await axios.get(`https://countriesnow.space/api/v0.1/countries/states`,payload);
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        { enabled: !!payload.country }
    )
    // const {data,isLoading,error} = stateQuery
    return {...stateQuery}
}



export const useGetCountryVat = (customerCountry) => {
    const countryVat = useQuery(['vat',{customerCountry}], merchantService.getVat)
    return {...countryVat}
}

export const useGetReceiverAddress = () => {
    const receiverAddress = useQuery(['receiverAddress'], merchantService.getReceiverAddress)
    return {...receiverAddress}
}

export const useCreateReceiverAddress = payload => {
    return useMutation({
        mutationFn: merchantService.createReceiverAddress(payload),
        onSuccess: response => {
            toast.success(response.message, {
                theme: "colored",
            })
            return response;
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    });
};