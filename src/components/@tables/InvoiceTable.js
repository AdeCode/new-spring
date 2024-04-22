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
            toast.success(res.message, {
                theme: "colored",
            })
            queryClient.invalidateQueries('invoices')
        },
        onError: err => {
            toast.error(err.response.data.error, {
                theme: "colored",
            })
        }
    })

    const onToggle = (values) => {
        toggleInvoiceMutation.mutate(values)
    }


    const columns = useMemo(
        () => [
            {
                accessorKey: 'status', 
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
                                    }
                                    }
                                    name="toggle"
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
                data={data?.invoices || []}
                enableColumnActions={true}
                enableRowNumbers
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
                        '& tr:nth-of-type(odd)': {
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
                    sx: {
                        fontWeight: 'normal',
                        fontSize: '12px',
                        color: '#002333',
                        opacity: '0.5',
                    },
                }}
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
    }
    
    .MuiTableCell-root .MuiTableCell-head{
        color: #002333 !important;
        opacity: 0.5 !important;
    }
  
`

export default InvoiceTable;
