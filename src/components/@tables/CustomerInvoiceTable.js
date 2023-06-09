import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv';
import {
    Typography,
    TextField,
    Box
  } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { QueryClient, useMutation, useQueryClient } from 'react-query';
import invoiceService from '../../@services/invoiceService';
import { toast } from 'react-toastify';


// nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
        creation_date: "2023-05-26 15:50:41",
        currency:"NGN",
        invoice_code: "133976904",
        status: "PAID",
        sub_total: 33000,
        total_cost:0,
        name:'Omoyele Sowore',
        email:'yele@gmail.com',
        phone:'08023339922',
        created_on:'11/05/2023',
        invoice_number:'001',
        amount:308899,
        due_date:'25/05/2023',
    },
    {
        name:'Adewale Olowookere',
        email:'yele@gmail.com',
        phone:'08023339922',
        created_on:'11/05/2023',
        invoice_code: "133971114",
        amount:308899,
        due_date:'25/05/2023',
        currency:"NGN",
    },
    {
        name:'Adebayo John',
        email:'john@gmail.com',
        phone:'08023339922',
        created_on:'11/05/2023',
        invoice_number:'001',
        amount:308899,
        due_date:'25/05/2023',
    },
    {
        name:'Adewale Olowookere',
        email:'john@gmail.com',
        phone:'08023339922',
        created_on:'11/05/2023',
        invoice_number:'001',
        amount:308899,
        due_date:'25/05/2023',
    },
  {
    name:'Efe Adegoke',
    email:'efe@gmail.com',
    phone:'08022889922',
    created_on:'11/05/2023',
    invoice_number:'0099J',
    amount:238899,
    due_date:'15/05/2023'
  },
];




function CustomerInvoiceTable({data}) {
  // console.log('customer invoice',data)
    const [currency, setCurrency] = useState('USD')
    const queryClient = useQueryClient()

  const navigate = useNavigate()

  const toggleInvoiceMutation = useMutation(invoiceService.toggleInvoiceStatus, {
    onSuccess: res => {
        console.log(res)
        //dispatch({ type: 'LOGIN', payload: res.data })
        toast.success(res.message, {
            theme: "colored",
        })
        queryClient.invalidateQueries('customerInvoices')

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
   
    toggleInvoiceMutation.mutate(values)
}

  const gotoCustomer=()=>{
    navigate('/dashboard/customer')
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: 'invoice_code', //normal accessorKey
        header: 'Invoice Number',
        size:50,
      },
      {
        accessorKey: 'created_at', //normal accessorKey
        header: 'Date Created',
        size:50,
      },
      {
        accessorKey: 'currency', //normal accessorKey
        header: 'Currency',
        size:50,
      },
      {
        accessorKey: 'status', //normal accessorKey
        header: 'Status',
        Cell: ({ renderedCellValue, row }) => {
          return <div className={`${row.original.status === 'PAID' ? 'text-green-700' : 'text-yellow-600'} `}>
              <h3 className=''>{renderedCellValue}</h3>
          </div>
        },
        size:50,
      },
      {
        accessorKey: 'total_cost', //normal accessorKey
        header: 'Total Cost',
        size:50,
      },
      {
        accessorKey: 'due_date', //normal accessorKey
        header: 'Due Date',
        size:50,
      },
     
      {
        accessorKey: 'view_invoice', 
        header: 'View Invoice',
        Cell: ({cell, row}) => {
            return <Link to={`/dashboard/customers/invoice/${row.original.invoice_code}`} className="flex items-center bg-[#55BA6A] rounded-[5px] py-[6px] px-2 text-white w-fit">
                    Preview
                  </Link>
        },
        size:50,
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
                                }); 
                              console.log(row.original.invoice_code) 
                            }
                                // handleToggleChange(row.original.id)
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
    csvExporter.generateCsv(data);
  };

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
    console.log(currency)
}

  return (
    <Section>
             <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBotton:'10px' }}>
                <Typography color="#334D6E" variant="h2" sx={{ fontSize: '16px', paddingLeft: '12px', paddingTop: '20px' }}>
                    Customer Invoice List
                </Typography>
            </Box>
            <MaterialReactTable 
                state={{ isLoading: false }}
                columns={columns} 
                data={data ?? []} 
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
                muiTableHeadProps={{
                    sx:{
                        backgroundColor:'red',
                    }
                }}
                muiTableBodyProps={{
                    sx: {
                      //stripe the rows, make odd rows a darker color
                      '& tr:nth-of-type(odd)': {
                        //backgroundColor: '#f5f5f5',
                        borderBottom:'2px solid green',
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
                      color:'#273240',
                      fontSize:'13px',
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

                muiTableBodyRowProps={({ row }) => ({
                    onClick: (event) => {
                      //console.info(event, row.id);
                      // console.log('clicked '+row.original.userName)
                    },
                    sx: {
                      cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                      border: 'none',
                      color:'#273240',
                      paddingLeft:'10px'
                    },
                  })}
            />
        </Section>
  )
}

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

export default CustomerInvoiceTable
