import React, { useMemo, useState } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv';
import {
    Box,
    ListItemIcon,
    MenuItem,
} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom'
import IosShareIcon from '@mui/icons-material/IosShare';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';


//nested data is ok, see accessorKeys in ColumnDef below
// let data = [
//     {
//         id:1,
//         status: 'success',
//         invoiceNumber: '1752AF',
//         customer:'Spring Finance',
//         dateCreated: '2023/04/20',
//         amount:2345553,
//         dueDate:'2023/05/20',
//     },
//     {
//         id:2,
//         status: 'pending',
//         invoiceNumber: '001KK',
//         customer:'Forte Oil',
//         dateCreated: '2023/04/20',
//         amount:29933000,
//         dueDate:'2023/05/20',
//     },
//     {
//         id:3,
//         status: 'success',
//         invoiceNumber: '00252AF',
//         customer:'Apex Constructors',
//         dateCreated: '2023/04/20',
//         amount:2345553,
//         dueDate:'2023/05/20',
//     },
//     {
//         id:4,
//         status: 'pending',
//         invoiceNumber: '1752AF',
//         customer:'Spring Finance',
//         dateCreated: '2023/04/20',
//         amount:2345553,
//         dueDate:'2023/05/20',
//     },
    
// ];

const invoiceData = [
    {
        id:1,
        status:'paid',
        invoiceNum:98830,
        customer:'Forte Oil',
        createdAt: '2023/05/20',
        amount:'26632.00',
        dueDate: '2023/05/20'
    },
    {
        id:2,
        status:'paid',
        invoiceNum:100830,
        customer:'Spring Finance',
        createdAt: '2023/05/20',
        amount:'26632.00',
        dueDate: '2023/05/20'
    },
    {
        id:3,
        status:'unpaid',
        invoiceNum:278830,
        customer:'Apex Constructors',
        createdAt: '2023/05/20',
        amount:'26632.00',
        dueDate: '2023/05/20'
    },
    {
        id:4,
        status:'unpaid',
        invoiceNum:10830,
        customer:'Tesla',
        createdAt: '2023/05/20',
        amount:'26632.00',
        dueDate: '2023/05/20'
    },
]


const InvoiceTable = () => {
    //should be memoized or stable
    const [toggle, setToggle] = useState(false)
    const navigate = useNavigate()

    const ToggleButton = styled(Switch)({
        "&.Mui-selected, &.Mui-selected:hover": {
          color: "white",
          backgroundColor: 'green'
        }
      });

    const [data, setData] = useState([
        {
            id:1,
            status: 'paid',
            invoiceNumber: '1752AF',
            customer:'Spring Finance',
            dateCreated: '2023/04/20',
            amount:2345553,
            dueDate:'2023/05/20',
            checked:true
        },
        {
            id:2,
            status: 'unpaid',
            invoiceNumber: '001KK',
            customer:'Forte Oil',
            dateCreated: '2023/04/20',
            amount:29933000,
            dueDate:'2023/05/20',
            checked:false
        },
        {
            id:3,
            status: 'paid',
            invoiceNumber: '00252AF',
            customer:'Apex Constructors',
            dateCreated: '2023/04/20',
            amount:2345553,
            dueDate:'2023/05/20',
            checked:true
        },
        {
            id:4,
            status: 'unpaid',
            invoiceNumber: '1752AF',
            customer:'Spring Finance',
            dateCreated: '2023/04/20',
            amount:2345553,
            dueDate:'2023/05/20',
            checked:false
        },
        
    ])

    const handleToggleChange = (id) => {
        //console.log(id)
        const newData = data.map(invoice => {
            if(invoice.id === id){
                if(invoice.status === 'unpaid'){
                    return {...invoice, status:'paid',checked:true }
                }
                if(invoice.status === 'paid'){
                    return {...invoice, status:'paid',checked:true }
                }
            }
            return invoice
        })
        console.log(newData)
        setData(newData)
    }

    const columns = useMemo(
        () => [
            {
                accessorKey: 'status', //normal accessorKey
                header: 'Status',
                Cell: ({ renderedCellValue, row }) => {
                    return <div className={`${row.original.status === 'paid' ? 'text-green-700' : 'text-yellow-600'} `}>
                            <h3 className=''>{renderedCellValue}</h3>
                        </div>
                }, 
                size:80,
            },
            {
              accessorKey: 'invoiceNumber',
              header: 'Invoice #',
              size:50,
            },
            {
                accessorKey: 'customer',
                header: 'Customer',
                size:100,
            },
            {
                accessorKey: 'dateCreated',
                header: 'Created On',
                size:50,
            },
            {
                accessorKey: 'amount',
                header: 'Amount',
                Cell: ({ cell }) => {
                    return <div className="text-sm font-semibold">$ {cell.getValue()}</div>
                },
                size:50,
            },
            {
                accessorKey: 'dueDate',
                header: 'Due Date',
            },
            {
                accessorKey: 'action',
                header: 'View',
                Cell: ({ cell, row }) => {
                    return <Link to='/invoice/details' className='cursor-pointer text-green-800'>
                            <span class="material-symbols-outlined" >visibility</span>
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
                            color:'green',
                            '&.Mui-checked': {
                                color: "green",
                                //backgroundClip:"green",
                            },
                            '&.MuiSwitch-thumb-checked': {
                                color: "#404042",
                                backgroundColor:"#404042",
                            },

                            }}
                            control={
                            <Switch
                                checked={row.original.checked}
                                onChange={() => handleToggleChange(row.original.id)}
                                name="toggle"
                                color="primary"
                                sx={{
                                    color:'#404042',
                                    '&.Mui-checked': {
                                        color: "#404042",
                                        backgroundColor:"#404042",
                                    },
                                    '&.MuiSwitch-thumb-checked': {
                                        color: "#404042",
                                        backgroundColor:"#404042",
                                    },
                                }}
                            />
                            }
                            // label="Approve"
                        />
                    </div>
                }, 
                size:50,
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


    return (
        <Section>
            <MaterialReactTable
                state={{ isLoading: false }}
                columns={columns}
                data={data ?? []}
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
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display:'flex',paddingTop: '20px', alignItems:'center', gap:'10px',paddingLeft: '12px' }}>
                        <div className=''>
                            <p className='text-[#6A707E] text-xl'>Invoices</p>
                                {/* <FormControlLabel
                                    sx={{
                                    display: 'block',
                                    }}
                                    control={
                                    <ToggleButton
                                        checked={toggle}
                                        onChange={() => {setToggle(true)}}
                                        name="toggle"
                                        color="primary"
                                    />
                                    }
                                    label="Approve"
                                /> */}
                        </div>
                        
                        <span className='bg-[#EFF0F2] py-1 px-3 cursor-pointer text-[13px] flex items-center gap-2' onClick={handleExportData}>
                            <IosShareIcon sx={{ fontSize: 14 }}/> Export
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
                        fontWeight:'600'
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
