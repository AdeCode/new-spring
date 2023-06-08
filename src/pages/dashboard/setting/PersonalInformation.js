import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonaliseProfile from '../../../components/@settings/PersonaliseProfile';
import BusinessProfile from '../../../components/@settings/BusinessProfile';
import AccountBusiness from './AccountBusiness';
import Uploader from '../../../components/@shared/Uploader'
import BankInfo from '../../../components/@settings/BankInfo';
import Kyc from '../../../components/@settings/Kyc';

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

function PersonalInformation() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
    <div>
        <h2 className='mb-2 text-[#334D6E] text-base font-semibold'>Settings</h2>
        <div className=''>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', border:'1px solid green' }}>
                    <Tabs value={value} 
                        onChange={handleChange} 
                        aria-label="basic tabs example"
                        sx={{
                            '&.MuiTab-selected': {
                                background: "green",
                            },
                            '&.Mui-selected': {
                                text:'green'
                            },
                        }}
                    >
                        <Tab 
                            label="Account Profile" {...a11yProps(0)} 
                            sx={{
                                '&.Mui-selected': {
                                    color: "green",
                                    fontSize:'bold',
                                    borderBottom:'2px solid green',
                                },
                            }}
                        />
                        <Tab 
                            sx={{
                                '&.Mui-selected': {
                                    color: "green",
                                    fontSize:'bold',
                                    borderBottom:'2px solid green',
                                },
                            }}
                            label="BUSINESS Profile" {...a11yProps(1)} 
                        />
                        <Tab 
                            sx={{
                                '&.Mui-selected': {
                                    color: "green",
                                    fontSize:'bold',
                                    borderBottom:'2px solid green',
                                },
                            }}
                            label="BANK INFO" {...a11yProps(2)} 
                        />
                        <Tab 
                            sx={{
                                '&.Mui-selected': {
                                    color: "green",
                                    fontSize:'bold',
                                    borderBottom:'2px solid green',
                                },
                            }}
                            label="KYC" {...a11yProps(3)} 
                        />
                        {/* <Tab 
                            sx={{
                                '&.Mui-selected': {
                                    color: "green",
                                    fontSize:'bold',
                                    borderBottom:'2px solid green',
                                },
                            }}
                            label="RESET CARD PIN" {...a11yProps(4)} 
                        />
                        <Tab 
                            sx={{
                                '&.Mui-selected': {
                                    color: "green",
                                    fontSize:'bold',
                                    borderBottom:'2px solid green',
                                },
                            }}
                            label="RESET TRANSACTION PIN" {...a11yProps(5)} 
                        /> */}
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <PersonaliseProfile/>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <BusinessProfile/>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <BankInfo/>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <Kyc/>
                </TabPanel>
                {/* <TabPanel value={value} index={4}>
                    <Uploader/>
                </TabPanel>
                <TabPanel value={value} index={5}>
                    <AccountBusiness/>
                </TabPanel> */}
            </Box>
        </div>
    </div>
  )
}

export default PersonalInformation