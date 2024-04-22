import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Regions from './setting/WebInformation/Regions';
import Contraband from './setting/WebInformation/Contraband';
import Services from './setting/WebInformation/Services';
import { useQuery } from 'react-query';
import merchantService from '../../@services/merchantService';
import VatSettings from './setting/WebInformation/VatSettings';


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

function WebInfo() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const { data: profile, isLoading: profileLoading } = useQuery(['merchant_profile'], merchantService.getMerchantProfile)

    return (
        <div>
            <h2 className='mb-2 text-[#334D6E] text-base font-semibold'>Web Information settings</h2>
            <div className=''>
                {
                    profileLoading ? 'Loading...' :
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
                                        label="Delivery REgions" {...a11yProps(0)}
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
                                        label="Contraband Items" {...a11yProps(1)}
                                    />
                                    <Tab
                                        sx={{
                                            '&.Mui-selected': {
                                                color: "green",
                                                fontSize: 'bold',
                                                borderBottom: '2px solid green',
                                            },
                                        }}
                                        label="Our Services" {...a11yProps(2)}
                                    />
                                    <Tab
                                        sx={{
                                            '&.Mui-selected': {
                                                color: "green",
                                                fontSize: 'bold',
                                                borderBottom: '2px solid green',
                                            },
                                        }}
                                        label="VAT Settings" {...a11yProps(3)}
                                    />
                                </Tabs>
                            </Box>
                            <>
                                <TabPanel value={value} index={0}>
                                    <Regions
                                        merchantId={profile?.data?.profile?.merchant_id}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Contraband 
                                        merchantId={profile?.data?.profile?.merchant_id}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Services 
                                        merchantId={profile?.data?.profile?.merchant_id}
                                    />
                                </TabPanel>
                                <TabPanel value={value} index={3}>
                                    <VatSettings/>
                                </TabPanel>
                            </>
                        </Box>
                }

            </div>
        </div>
    )
}

export default WebInfo