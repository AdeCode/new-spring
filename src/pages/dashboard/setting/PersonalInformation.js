import React from 'react'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PersonaliseProfile from '../../../components/@settings/PersonaliseProfile';

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
        <h2 className='mb-2'>Settings</h2>
        <div className=''>
            <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', border:'1px solid green' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Account Profile" {...a11yProps(0)} />
                <Tab label="BUSINESS Profile" {...a11yProps(1)} />
                <Tab label="KYC" {...a11yProps(2)} />
                <Tab label="RESET CARD PIN" {...a11yProps(3)} />
                <Tab label="RESET TRANSACTION PIN" {...a11yProps(4)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <PersonaliseProfile/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                Business Profile
            </TabPanel>
            <TabPanel value={value} index={2}>
                KYC
            </TabPanel>
            <TabPanel value={value} index={3}>
                Reset your card pin
            </TabPanel>
            <TabPanel value={value} index={4}>
                Reset your transaction pin
            </TabPanel>
            </Box>
        </div>
    </div>
  )
}

export default PersonalInformation