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



const CustomerTable = ({data}) => {
  const [currency, setCurrency] = useState('USD')

  const navigate = useNavigate()
  const gotoCustomer=()=>{
    navigate('/dashboard/customer')
  }
  const columns = useMemo(
    () => [
      {
        accessorKey: 'name', 
        header: 'Full Name',
        Cell: ({cell, row}) => {
          return <div className="text-[#273240] font-semibold flex gap-2 items-center">
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
                    <span className="material-symbols-outlined">account_circle</span>
                  }
                  
                <h2 className='text-start'>{row.original.name}</h2>
            </div>
        },
        size:50,

      },
      {
        accessorKey: 'phone', 
        header: 'Phone',
        size:50,
      },
      {
        accessorKey: 'country', 
        header: 'Country',
        size:50,
      },
      {
        accessorKey: 'view_invoice', 
        header: 'Action',
        Cell: ({cell, row}) => {
            return <Link to={`/dashboard/customers/${row.original.id}`} className="flex items-center bg-[#55BA6A] rounded-[5px] py-[6px] px-2 text-white w-fit">
                    View Invoices
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
}


  return (
        <Section>
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
                enableTopToolbar={false}
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
                      '& tr:nth-of-type(odd)': {
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
                    sx: {
                      fontWeight: 'normal',
                      fontSize: '12px',
                      color: '#002333',
                      opacity: '0.5',
                    },
                  }}

                muiTableBodyRowProps={({ row }) => ({
                    onClick: (event) => {
                    },
                    sx: {
                      cursor: 'pointer',
                      border: 'none',
                      color:'#273240',
                      paddingLeft:'10px'
                    },
                  })}
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

export default CustomerTable;
