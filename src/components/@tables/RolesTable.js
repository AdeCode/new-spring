import React, {useMemo} from 'react'
import {
    Box,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';


function RolesTable({data}) {
    const columns = useMemo(
        () => [
            {
                accessorKey: 'role_name',
                header: 'Role Name',
                size:50,
            },
            {
              accessorKey: 'permission_count',
              header: 'Permissions Count',
              size:50,
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
    }
    
    .MuiTableCell-root .MuiTableCell-head{
        color: #002333 !important;
        opacity: 0.5 !important;
    }
  
`

export default RolesTable