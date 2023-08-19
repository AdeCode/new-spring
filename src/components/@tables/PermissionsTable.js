import React, {useMemo} from 'react'
import {
    Box,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { mergeData } from '../../@helpers/helperFunctions';

function PermissionsTable({data}) {   

    const newData = mergeData(data)
    
    const columns = useMemo(
        () => [
            {
                accessorKey: 'permission_name',
                header: 'Permission Name',
                size:50,
            },
            {
              accessorKey: 'group_name',
              header: 'Permission Group',
              size:50,
            },
            {
                header: 'View Permission',
                Cell: ({ cell, row }) => {
                    return <Link to={`/settings/user-permissions/${row.original.permission_id}`} className='cursor-pointer text-green-800'>
                    <span className="material-symbols-outlined" >visibility</span>
                </Link>
                },
            }
            // {
            //     accessorKey: 'status',
            //     header: 'Status',
            //     enableClickToCopy: false,
            //     Cell: ({ cell, row }) => {
            //         return <div 
            //         className={`${row.original.status === 'active' ? 'bg-[#34A853]' : 'bg-yellow-600'} rounded-lg text-sm text-center py-1 font-semibold`}
            //         >
            //             {cell.getValue()}
            //         </div>
            //     },
            //     size:50,
            // },
        ],
        [],
    );

 
    return (
        <Section>
            <MaterialReactTable
                state={{ isLoading: false }}
                columns={columns}
                data={newData ?? []}
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

export default PermissionsTable