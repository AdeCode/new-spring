import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv';
import {
    Box,
    ListItemIcon,
    MenuItem,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom'
import IosShareIcon from '@mui/icons-material/IosShare';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { useMutation, useQueryClient } from 'react-query';
import invoiceService from '../../@services/invoiceService';
import { toast } from 'react-toastify';
import helperFunctions from '../../@helpers/helperFunctions';



const InvoiceTable = ({ data, currency }) => {

    const queryClient = useQueryClient()

    console.log(data)

    //should be memoized or stable
    // console.log(currency)
    // console.log('from table ',data)
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    const ToggleButton = styled(Switch)({
        "&.Mui-selected, &.Mui-selected:hover": {
            color: "white",
            backgroundColor: 'green'
        }
    });

    const toggleInvoiceMutation = useMutation(invoiceService.toggleInvoiceStatus, {
        onSuccess: res => {
            console.log(res)
            //dispatch({ type: 'LOGIN', payload: res.data })
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('invoices')
        },
        onError: err => {
            console.log(err)
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onToggle = (values) => {
        //console.log(values)
        // values = {
        //     ...values,
        //     payload: {
        //         "status": "PAID"
        //     }
        // }
        toggleInvoiceMutation.mutate(values)
    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'status', //normal accessorKey
                header: 'Status',
                Cell: ({ renderedCellValue, row }) => {
                    return <div className={`${row.original.status === 'PAID' ? 'text-green-700' : 'text-yellow-600'} `}>
                        <h3 className=''>{renderedCellValue}</h3>
                    </div>
                },
                size: 80,
            },
            {
                accessorKey: 'invoice_code',
                header: 'Invoice #',
                size: 50,
            },
            {
                accessorKey: 'name',
                header: 'Customer',
            },
            {
                accessorKey: 'creation_date',
                header: 'Created On',
            },
            {
                accessorKey: 'total_cost',
                header: 'Amount',
                Cell: ({ cell,row }) => {
                    return <div className="text-sm font-semibold flex gap-1">
                        {/* {currency === 'USD' ? <span>&#65284;</span> : <span>&#8358;</span>} */}
                        {helperFunctions.formatCurrency(row.original.currency,cell.getValue())}
                    </div>
                },
                size: 50,
            },
            {
                accessorKey: 'due_date',
                header: 'Due Date',
            },
            {
                accessorKey: 'view',
                header: 'View',
                Cell: ({ cell, row }) => {
                    return <Link to={`/invoice/details/${row.original.invoice_code}`} className='cursor-pointer text-green-800'>
                        <span className="material-symbols-outlined" >visibility</span>
                    </Link>
                },
                size: 50,
            },
            {
                accessorKey: 'action',
                header: 'Action',
                Cell: ({ cell, row }) => {
                    return <div>
                        <FormControlLabel
                            sx={{
                                display: 'block',
                                color: 'green',
                                '&.Mui-checked': {
                                    color: "green",
                                    //backgroundClip:"green",
                                },
                                '&.MuiSwitch-thumb-checked': {
                                    color: "#404042",
                                    backgroundColor: "#404042",
                                },

                            }}
                            control={
                                <Switch
                                    checked={row.original.status==='PAID'}
                                    onChange={() => { 
                                        const payloadStatus = (row.original.status==='PAID') ? "UNPAID" : "PAID"
                                        onToggle(
                                            { 
                                                invoice_code: row.original.invoice_code,
                                                payload: {status: payloadStatus}
                                            }
                                        ); 
                                        console.log(row.original.invoice_code) 
                                    }
                                    }
                                    name="toggle"
                                    // disabled={row.original.status==='PAID'}
                                    color="primary"
                                    sx={{
                                        color: '#404042',
                                        '&.Mui-checked': {
                                            color: "#404042",
                                            backgroundColor: "#404042",
                                        },
                                        '&.MuiSwitch-thumb-checked': {
                                            color: "#404042",
                                            backgroundColor: "#404042",
                                        },
                                    }}
                                />
                            }
                        // label="Approve"
                        />
                    </div>
                },
                size: 50,
            },
        ],
        [],
    );

    const csvOptions = {
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: columns.map((c) => c.header),
    };

    const csvExporter = new ExportToCsv(csvOptions);

    const handleExportData = () => {
        csvExporter.generateCsv(data.invoices);
    };


    return (
        <Section>
            <Box sx={{ display: 'flex', paddingTop: '20px', alignItems: 'center', gap: '10px', paddingLeft: '12px',marginBottom:'10px' }}>
                <div className=''>
                    <p className='text-[#6A707E] text-xl'>Invoices</p>
                </div>
                <span className='bg-[#EFF0F2] py-1 px-3 cursor-pointer text-[13px] flex items-center gap-2' onClick={handleExportData}>
                    <IosShareIcon sx={{ fontSize: 14 }} /> Export
                </span>
            </Box>
            <MaterialReactTable
                state={{ isLoading: false }}
                columns={columns}
                data={data.invoices ?? []}
                enableColumnActions={true}
                enableRowNumbers
                // enableRowActions
                rowNumberMode="original"
                muiTablePaperProps={{
                    elevation: 0,
                    sx: {
                        borderRadius: '0',
                        border: 'none',
                    },
                }}
                enableTopToolbar={false}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{ display: 'flex', paddingTop: '20px', alignItems: 'center', gap: '10px', paddingLeft: '12px' }}>
                        <div className=''>
                            <p className='text-[#6A707E] text-xl'>Invoices</p>
                        </div>
                        <span className='bg-[#EFF0F2] py-1 px-3 cursor-pointer text-[13px] flex items-center gap-2' onClick={handleExportData}>
                            <IosShareIcon sx={{ fontSize: 14 }} /> Export
                        </span>
                    </Box>

                )}
                muiTableHeadProps={{
                    sx: {
                        backgroundColor: 'red',
                    }
                }}
                muiTableBodyProps={{
                    sx: {
                        //stripe the rows, make odd rows a darker color
                        '& tr:nth-of-type(odd)': {
                            //backgroundColor: '#f5f5f5',
                            borderBottom: '2px solid green',
                            borderColor: 'green',
                        },
                        '& thead': {
                            backgroundColor: '#ffffff',
                        },

                        border: '2px solid blue',
                    },
                }}
                muiTableBodyCellProps={{
                    sx: {
                        color: '#171F4C',
                        fontSize: '14px',
                        fontWeight: '600'
                    },
                }}

                muiTableHeadCellProps={{
                    //simple styling with the `sx` prop, works just like a style prop in this example
                    sx: {
                        fontWeight: 'normal',
                        fontSize: '12px',
                        color: '#002333',
                        opacity: '0.5',
                    },
                }}


            // renderRowActionMenuItems={({ closeMenu, row }) => [

            //     row.original.status === 'pending' ?
            //         <MenuItem
            //             key={1}
            //             onClick={() => {
            //                 console.log(row.original.id)
            //                 //approvePaymentMutation.mutate({order_ref:row.original.order_ref})
            //                 closeMenu();
            //             }}
            //             sx={{ m: 0,color:'green' }}
            //         >
            //             <ListItemIcon>
            //             <span className="material-symbols-outlined text-green-700">task_alt</span>
            //             </ListItemIcon>
            //             Approve
            //         </MenuItem>
            //     :
            //     null
            //     ,
            //     <MenuItem
            //       key={0}
            //       onClick={() => {
            //         // View profile logic...
            //         console.log(row.original.id)
            //         //navigate(`/dashboard/payment/${row.original.reference}`)
            //         navigate('/invoice/details')
            //         closeMenu();
            //       }}
            //       sx={{ m: 0 }}
            //     >
            //       <ListItemIcon>
            //         <span className="material-symbols-outlined">info</span>
            //       </ListItemIcon>
            //       View Details
            //     </MenuItem>,

            //   ]}

            />
        </Section>

    );
};

const Section = styled.section`
    .MuiTableRow-root{
        background-image: linear-gradient(128.03deg, rgba(97, 153, 219, 0.04) -0.78%, rgba(75, 202, 105, 0.04) 90.56%);
        border: 4px solid white !important;
        margin-bottom: 4px !important;
        padding-left: 20px !important;
    }
    .MuiTableRow-root:hover{
        //background-color: green;
    }
    
    .MuiTableCell-root .MuiTableCell-head{
        color: #002333 !important;
        opacity: 0.5 !important;
    }
  
`

export default InvoiceTable;
