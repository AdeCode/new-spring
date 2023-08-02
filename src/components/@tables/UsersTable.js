import React, {useMemo, useState} from 'react'
import {
    Box, Modal,
} from '@mui/material';
import MaterialReactTable from 'material-react-table';
import styled from 'styled-components';
import UpdateUserModal from '../@shared/UpdateUserModal';

const data = [
    {
        fullName: 'Hakeem Ibrahim',
        email: 'hakeem@springcash.co',
        dateCreated: '17/12/2022',
        role: 'Backend Engineer',
        status: 'active'
    },
    {
        fullName: 'Ayodeji Oyenekan',
        email: 'ayodeji@springcash.co',
        dateCreated: '17/12/2022',
        // role: ['Super Admin', 'Chief Technology Officer'],
        role: 'Chief Technology Officer',
        status: 'active'
    },
    {
        fullName: 'Funso Folorunso',
        email: 'funso@springcash.co',
        dateCreated: '17/12/2022',
        role: 'Super Admin',
        status: 'active'
    },
   
];

function UsersTable() {
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const columns = useMemo(
        () => [
            {
                accessorKey: 'fullName',
                header: 'Full Name',
                size:50,
            },
            {
                accessorKey: 'email',
                header: 'Email',
                size:50,
            },
            {
              accessorKey: 'dateCreated',
              header: 'Date Created',
              size:50,
            },
            {
                accessorKey: 'role',
                header: 'Role',
            },
            {
                header: 'Edit',
                enableClickToCopy: false,
                Cell: ({ cell, row }) => {
                    return <div>
                        <span 
                            className="material-symbols-outlined text-lg cursor-pointer"
                            onClick={()=>setOpen(true)}    
                        >
                            edit
                        </span>
                    </div>
                },
                size:50,
            },
            {
                accessorKey: 'status',
                header: 'Status',
                enableClickToCopy: false,
                Cell: ({ cell, row }) => {
                    return <div 
                    className='bg-red-600 rounded-md text-white text-sm text-center py-1 font-semibold'
                    >
                        De-activate
                    </div>
                },
                size:50,
            },
        ],
        [],
    );

 
    return (
        <Section>
             <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ffffff' }}
            >
                <UpdateUserModal
                    handleClose={handleClose}
                    // data={modalData}
                />
            </Modal>
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

export default UsersTable