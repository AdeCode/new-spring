import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv';
import {
    Box,
} from '@mui/material';

import IosShareIcon from '@mui/icons-material/IosShare';
import helperFunctions from '../../@helpers/helperFunctions'


//nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
        transactionRef: 'T293093506489996',
        transactionDate: '17/12/2022',
        customer:'Adeleke Yussuf',
        method:'Invoice',
        transactionAmount:2345553,
        availableBalanceBefore:2389002,
        availableBalanceAfter:2389002,
    },
    {
        transactionRef: 'T293093506489996',
        transactionDate: '17/12/2022',
        customer:'Kola Daisi',
        method:'Transfer',
        transactionAmount:2345553,
        availableBalanceBefore:2389002,
        availableBalanceAfter:2389002,
    },
    {
        transactionRef: 'T293093506489996',
        transactionDate: '17/12/2022',
        customer:'Lawal Adegoke',
        method:'Transfer',
        transactionAmount:2345553,
        availableBalanceBefore:2389002,
        availableBalanceAfter:2389002,
    },
    {
        transactionRef: 'T293093506489226',
        transactionDate: '17/12/2022',
        customer:'George Bush',
        method:'Transfer',
        transactionAmount:2345553,
        availableBalanceBefore:2389002,
        availableBalanceAfter:2389002,
    },
    {
        transactionRef: 'T293093506489996',
        transactionDate: '17/12/2022',
        customer:'Daniel Amokachi',
        method:'Transfer',
        transactionAmount:2345553,
        availableBalanceBefore:2389002,
        availableBalanceAfter:2389002,
    },
    {
        transactionRef: 'T293093506489996',
        transactionDate: '17/12/2022',
        customer:'Adeleke Yussuf',
        method:'Invoice',
        transactionAmount:2345553,
        availableBalanceBefore:2389002,
        availableBalanceAfter:2389002,
    },
];


const CustomerTransaction = () => {
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
              header: 'Date',
              size:50,
            },
            {
              accessorKey: 'customer',
              header: 'Customer',
              size:50,
            },
            {
                accessorKey: 'method',
                header: 'Method',
                size:50,
            },
            {
                accessorKey: 'transactionAmount',
                header: 'Transaction Amount',
                Cell: ({ cell,row }) => {
                    return <div className="text-sm font-semibold text-[#34A853]">{helperFunctions.dollarFormat(row.original.transactionAmount)}</div>
                },
                size:50,
            },
            {
                accessorKey: 'availableBalanceBefore',
                header: 'Available Balance Before',
                Cell: ({ cell,row }) => {
                    return <div className="text-sm font-semibold">{helperFunctions.dollarFormat(row.original.availableBalanceBefore)}</div>
                },
            },
            {
                accessorKey: 'availableBalanceAfter',
                header: 'Available Balance After',
                Cell: ({ cell,row }) => {
                    return <div className="text-sm font-semibold">{helperFunctions.dollarFormat(row.original.availableBalanceAfter)}</div>
                },
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
            {/* <div className='title bg-white w-full text-[#334D6E] text-base pl-[18px] pt-5'>Recent Customers</div> */}
            {/* <div className='' onClick={handleExportData}>Export</div> */}
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
                        {/* <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',}}>
                            <Typography color="#334D6E" variant="h2" sx={{ fontSize: '16px',paddingLeft:'0px'}}>
                                Transactions History
                            </Typography>
                            <p>List of payouts done by the user</p>
                        </Box> */}
                        <div className=''>
                        <p className='text-[#6A707E] text-xl'>Transactions History</p>
                        {/* <p className='text-[#6A707E] text-[13px]'>List of payouts done by the user</p> */}

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

                muiTableBodyRowProps={({ row }) => ({
                    onClick: (event) => {
                        //console.info(event, row.id);
                        console.log('clicked ' + row.original.address)
                    },
                    sx: {
                        cursor: 'pointer', //you might want to change the cursor too when adding an onClick
                        border: 'none',
                        color: '#273240',
                        paddingLeft: '10px'
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

export default CustomerTransaction;
