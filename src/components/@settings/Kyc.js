import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IdentityVerification from './IdentityVerification';
import OccupationStatus from './OccupationStatus';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function Kyc() {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <div>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider', border: '1px solid green' }}>
                        <Tabs value={value}
                            onChange={handleChange}
                            aria-label="basic tabs example"
                            sx={{
                                '&.MuiTab-selected': {
                                    background: "green",
                                },
                                '&.Mui-selected': {
                                    text: 'green'
                                },
                            }}
                        >
                            <Tab
                                label="Email Verification" {...a11yProps(0)}
                                sx={{
                                    '&.Mui-selected': {
                                        color: "green",
                                        fontSize: 'bold',
                                        borderBottom: '2px solid green',
                                    },
                                }}
                            />
                            <Tab
                                sx={{
                                    '&.Mui-selected': {
                                        color: "green",
                                        fontSize: 'bold',
                                        borderBottom: '2px solid green',
                                    },
                                }}
                                label="Identity Verification" {...a11yProps(1)}
                            />
                            <Tab
                                sx={{
                                    '&.Mui-selected': {
                                        color: "green",
                                        fontSize: 'bold',
                                        borderBottom: '2px solid green',
                                    },
                                }}
                                label="Occupation Status" {...a11yProps(2)}
                            />
                        </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                        <div className='flex gap-[100px]'>
                            <h2 className=''>Email verification</h2>
                            <div className='text-white bg-green-700 py-4 w-[200px] rounded-lg text-center'>Verified</div>
                        </div>
                        
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <IdentityVerification/>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <OccupationStatus/>
                    </TabPanel>
                </Box>
            </div>
        </div>
    )
}

export default Kyc