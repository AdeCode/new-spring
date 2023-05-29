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
import cus1 from '../../images/dashboard/cus1.png'
import cus2 from '../../images/dashboard/cus2.png'
import cus3 from '../../images/dashboard/cus3.png'



//nested data is ok, see accessorKeys in ColumnDef below
// const data = [
//     {
//         name:'Omoyele Sowore',
//         email:'yele@gmail.com',
//         phone:'08023339922',
//         created_on:'11/05/2023',
//         invoice_number:'001',
//         amount:308899,
//         due_date:'25/05/2023',
//         avatar:cus1
//     },
//     {
//         name:'Adewale Olowookere',
//         email:'yele@gmail.com',
//         phone:'08023339922',
//         created_on:'11/05/2023',
//         invoice_number:'001',
//         amount:308899,
//         due_date:'25/05/2023',
//         avatar:cus2
//     },
//     {
//         name:'Adebayo John',
//         email:'john@gmail.com',
//         phone:'08023339922',
//         created_on:'11/05/2023',
//         invoice_number:'001',
//         amount:308899,
//         due_date:'25/05/2023',
//         avatar:cus3
//     },
//     {
//         name:'Adewale Olowookere',
//         email:'john@gmail.com',
//         phone:'08023339922',
//         created_on:'11/05/2023',
//         invoice_number:'001',
//         amount:308899,
//         due_date:'25/05/2023',
//         avatar:cus1
//     },
//   {
//     name:'Efe Adegoke',
//     email:'efe@gmail.com',
//     phone:'08022889922',
//     created_on:'11/05/2023',
//     invoice_number:'0099J',
//     amount:238899,
//     due_date:'15/05/2023',
//     avatar:cus3
//   },
// ];


const CustomerTable = ({data}) => {
  //should be memoized or stable
  const [currency, setCurrency] = useState('USD')

  const navigate = useNavigate()
  const gotoCustomer=()=>{
    navigate('/dashboard/customer')
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', //normal accessorKey
        header: 'Full Name',
        Cell: ({cell, row}) => {
          return <div className="text-[#273240] font-semibold flex gap-2 items-center w-[200px]">
                  {
                    row.original.avatar ? 
                    <img
                      alt="avatar"
                      height={30}
                      src={row.original.avatar}
                      loading="lazy"
                      style={{ borderRadius: '50%'}}
                    />
                    :
                    <span class="material-symbols-outlined">account_circle</span>
                  }
                  
                <h2 className='text-start'>{row.original.name}</h2>
            </div>
        },
      },
    //   {
    //     accessorKey: 'name', //normal accessorKey
    //     header: 'Name',
    //   },
      {
        accessorKey: 'email', //normal accessorKey
        header: 'Email address',
      },
      {
        accessorKey: 'phone', //normal accessorKey
        header: 'Phone',
        size:50,
      },
      {
        accessorKey: 'created_on', //normal accessorKey
        header: 'Created on',
        size:50,
      },
      {
        accessorKey: 'invoice_number', //normal accessorKey
        header: 'Invoice #',
        size:50,
      },
      {
        accessorKey: 'amount', //normal accessorKey
        header: 'Amount',
        size:50,
      },
      {
        accessorKey: 'due_date', //normal accessorKey
        header: 'Due date',
        size:50,
      },
      {
        accessorKey: 'view_invoice', 
        header: 'View Invoice',
        Cell: ({cell, row}) => {
            return <Link to='/invoice/template' className="flex items-center bg-[#55BA6A] rounded-[5px] py-[6px] px-2 text-white w-fit">
                    {/* <span class="material-symbols-outlined">visibility</span> */}
                    View Invoice
                  </Link>
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

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value)
    console.log(currency)
}


  return (
        <Section>
            {/* <div className='title bg-white w-full text-[#334D6E] text-base pl-[18px] pt-5'>Recent Customers</div> */}
            {/* <div className='' onClick={handleExportData}>Export</div> */}
            <MaterialReactTable 
                state={{ isLoading: false }}
                columns={columns} 
                data={data.data ?? []} 
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
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display:'flex', justifyContent:'space-between', width:'100%'}}>
                        <Typography color="#334D6E" variant="h2" sx={{fontSize:'16px', paddingLeft:'12px',paddingTop:'20px'}}>
                            Recent Customers
                        </Typography>
                        <Typography variant="h5" sx={{fontSize:'16px'}}>
                            Select Invoice Currency
                            <select name='currency' onChange={handleCurrencyChange} className='py-3 px-3 ml-1 rounded-md text-blue_text border border-gray'>
                                <option value='USD' defaultValue>USD</option>
                                <option value='Naira' >Naira</option>
                            </select>
                        </Typography>
                    </Box>
                  
                )}
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
                      console.log('clicked '+row.original.userName)
                    },
                    sx: {
                      cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                      border: 'none',
                      color:'#273240',
                      paddingLeft:'10px'
                    },
                  })}
                // renderDetailPanel={({ row }) => (
                //     <div>
                //       <span>First Name: {row.original.name.firstName}</span>
                //       <span>Last Name: {row.original.name.lastName}</span>
                //       <span>Address: {row.original.address}</span>
                //     </div>
                //   )}
                
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

export default CustomerTable;
