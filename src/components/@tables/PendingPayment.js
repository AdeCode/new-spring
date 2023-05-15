import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import {
    Box,
} from '@mui/material';



//nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
        transactionRef: 'T293093506',
        transactionDate: '17/12/2022',
        customer:'Adewale Fashion Limited',
        method: 'invoice',
        transactionAmount:40899,
        status: 'Unpaid',
    },
    {
        transactionRef: 'T293093506',
        transactionDate: '17/12/2022',
        customer:'Motion Mobility Limited',
        method: 'invoice',
        transactionAmount:2345553,
        status: 'Unpaid',
    },
    {
        transactionRef: 'T293093506',
        transactionDate: '17/12/2022',
        customer:'Motion Mobility Limited',
        method: 'invoice',
        transactionAmount:63377,
        status: 'Unpaid',
    },
];


const PendingPayment = () => {
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'transactionRef', //normal accessorKey
                header: 'Transaction Ref',
                Cell: ({ cell }) => {
                    return <div className="text-[#171F4C] text-sm font-semibold">{cell.getValue()}</div>
                },
                size:80,
            },
            {
              accessorKey: 'transactionDate',
              header: 'Transaction Date',
              size:80,
            },
            {
                accessorKey: 'customer',
                header: 'Customer',
            },
            {
                accessorKey: 'method',
                header: 'Method',
                size:80,
            },
            {
                accessorKey: 'transactionAmount',
                header: 'Transaction Amount',
                size:80,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                enableClickToCopy: false,
                Cell: ({ cell, row }) => {
                    return <div className="text-[#34A853] text-sm font-semibold" onClick={()=>console.log(row.original.transactionAmount)}>{cell.getValue()}</div>
                },
                size:80,
            },
           
        ],
        [],
    );

 
    return (
        <Section>
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
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display:'flex',paddingTop: '20px', alignItems:'center', gap:'10px',paddingLeft: '12px' }}>
                        <div className=''>
                        <p className='text-[#6A707E] text-xl'>Transactions History</p>
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

                // muiTableBodyRowProps={({ row }) => ({
                //     onClick: (event) => {
                //         console.log('clicked ' + row.original.status)
                //     },
                //     sx: {
                //         cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                //         border: 'none',
                //         color: '#273240',
                //         paddingLeft: '10px'
                //     },
                // })}
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

export default PendingPayment;
