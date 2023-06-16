import React, { useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { ExportToCsv } from 'export-to-csv';
import {
    Box,
} from '@mui/material';
import {Link} from 'react-router-dom'
import IosShareIcon from '@mui/icons-material/IosShare';
import helperFunctions from '../../@helpers/helperFunctions';


//nested data is ok, see accessorKeys in ColumnDef below
const data = [
    {
        items: 'Air conditioner',
        quantity: 10,
        cbm:1,
        price:20000,
        subTotal: 200000,
    },
    {
        items: 'iPhone',
        quantity: 5,
        cbm:3,
        price:200000,
        subTotal: 100000,
    },
    {
        items: 'MacBook Laptops',
        quantity: 10,
        cbm:2,
        price:200000,
        subTotal: 2000000,
    },
    {
        items: 'PS5',
        quantity: 10,
        cbm:1,
        price:20000,
        subTotal: 200000,
    },
    
];


const OrderItemsTable = ({data,currency}) => {
    //console.log(data)
    //should be memoized or stable
    const columns = useMemo(
        () => [
            {
                accessorKey: 'item_name', //normal accessorKey
                header: 'Items',
                size:50,
            },
            {
              accessorKey: 'quantity',
              header: 'Quantity (kg)',
              Cell: ({ cell }) => {
                return <div className="text-sm font-semibold">{cell.getValue()} kg</div>
            },
              size:50,
            },
            {
              accessorKey: 'cbm',
              header: 'CBM',
              Cell: ({ cell }) => {
                return <div className="text-sm font-semibold">{cell.getValue()}</div>
            },
              size:50,
            },
            {
                accessorKey: 'price',
                header: 'Price',
                Cell: ({ cell }) => {
                    return <div className="text-sm font-semibold">{helperFunctions.formatCurrency(currency,cell.getValue())}</div>
                },
                size:50,
            },
            {
                accessorKey: 'sub_total',
                header: 'Sub-Total',
                Cell: ({ cell,row }) => {
                    return <div className="text-sm font-semibold">{helperFunctions.formatCurrency(currency,row.original.price)}</div>
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
            <Box sx={{display:'flex',paddingTop: '20px', alignItems:'center', gap:'10px',paddingLeft: '12px' }}>
                        <div className=''>
                            <p className='text-[#6A707E] text-lg'>Invoice Items</p>
                        </div>
                        
                        <span className='bg-[#EFF0F2] py-1 px-3 cursor-pointer text-[13px] flex items-center gap-2' onClick={handleExportData}>
                            <IosShareIcon sx={{ fontSize: 14 }}/> Export
                        </span>
                    </Box>
            {/* <div className='title bg-white w-full text-[#334D6E] text-base pl-[18px] pt-5'>Invoice Items</div>
            <div className='' onClick={handleExportData}>Export</div> */}
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
                renderTopToolbarCustomActions={() => (
                    <Box sx={{display:'flex',paddingTop: '20px', alignItems:'center', gap:'10px',paddingLeft: '12px' }}>
                        <div className=''>
                            <p className='text-[#6A707E] text-xl'>Invoices</p>
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

export default OrderItemsTable;
