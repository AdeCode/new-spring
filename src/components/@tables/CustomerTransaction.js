import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv';
import {
    Box,
} from '@mui/material';

import IosShareIcon from '@mui/icons-material/IosShare';
import helperFunctions from '../../@helpers/helperFunctions'


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
    const columns = useMemo(
        () => [
            {
                accessorKey: 'transactionRef', 
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
                        fontWeight:'600'
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
                        color: '#273240',
                        paddingLeft: '10px'
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

export default CustomerTransaction;
