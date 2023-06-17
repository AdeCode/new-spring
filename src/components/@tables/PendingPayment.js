import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import {
    Box,
} from '@mui/material';
import helperFunctions from '../../@helpers/helperFunctions'


//nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
        transactionRef: 'T293093506',
        status: 'Unpaid',
        transactionDate: '17/12/2022',
        customer:'Adewale Fashion Limited',
        method: 'invoice',
        transactionAmount:40899,
    },
    {
        transactionRef: 'T293093506',
        status: 'Unpaid',
        transactionDate: '17/12/2022',
        customer:'Motion Mobility Limited',
        method: 'invoice',
        transactionAmount:2345553,
    },
    {
        transactionRef: 'T293093506',
        status: 'Unpaid',
        transactionDate: '17/12/2022',
        customer:'Motion Mobility Limited',
        method: 'invoice',
        transactionAmount:63377,
    },
];


const PendingPayment = ({data}) => {
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'invoice_code', //normal accessorKey
                header: 'Invoice Code',
                Cell: ({ cell }) => {
                    return <div className="text-[#171F4C] text-sm font-semibold">{cell.getValue()}</div>
                },
                size:50,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                enableClickToCopy: false,
                Cell: ({ cell, row }) => {
                    return <div className={`${row.original.status === 'UNPAID' ? 'text-yellow-600' : 'text-[#34A853]'} text-sm font-semibold`}>{cell.getValue()}</div>
                },
                size:50,
            },
            {
              accessorKey: 'creation_date',
              header: 'Date Created',
              size:50,
            },
            {
                accessorKey: 'name',
                header: 'Customer',
            },
            {
                accessorKey: 'total_cost',
                header: 'Grand Total',
                Cell: ({ cell,row }) => {
                    return <div className="text-sm font-semibold">{helperFunctions.formatCurrency(row.original.currency,(row.original.total_cost).toFixed(2))}</div>
                },
                size:50,
            },
            {
                accessorKey: 'email',
                header: 'Customer Email',
            },
           
        ],
        [],
    );

 
    return (
        <Section>
            <Box sx={{display:'flex',padding: '20px 0px', alignItems:'center', gap:'10px',paddingLeft: '12px' }}>
                <div className=''>
                    <p className='text-[#6A707E] text-xl'>Your Pending Payment</p>
                </div>
            </Box>
            <MaterialReactTable
                state={{ isLoading: false }}
                columns={columns}
                data={data ?? []}
                enableColumnActions={true}
                enableRowNumbers
                enableTopToolbar={false}
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
                        <p className='text-[#6A707E] text-xl'>Your Pending Payment</p>
                        </div>
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

export default PendingPayment;
