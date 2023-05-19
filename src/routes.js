import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Layout from './common/Layout';
import HomePage from './pages/HomePage';
import Business from './pages/Business';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/auth/Login';
import BusinessSignup from './pages/auth/BusinessSignup';
import ForgotPassword from './pages/auth/ForgotPassword';
import NewPassword from './pages/auth/NewPassword';
import ResetPasswordCode from './pages/auth/ResetPasswordCode';
import Index from './pages/dashboard/Index';
import Vendor from './pages/Vendor';
import Dashboard from './pages/dashboard/Dashboard';
import SpringPay from './pages/dashboard/SpringPay';
import ManageUsers from './pages/dashboard/ManageUsers';
import UserSettings from './pages/dashboard/UserSettings';
import UserRoles from './pages/dashboard/UserRoles';
import NewInvoice from './pages/dashboard/Invoice/NewInvoice';
import InvoiceIndex from './pages/dashboard/Invoice/Index';
import InvoiceDetails from './pages/dashboard/Invoice/InvoiceDetails';
import InvoiceTemplate from './components/@shared/InvoiceTemplate';
import RecentCustomers from './pages/dashboard/RecentCustomers';

function Routers (){
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route element={<Layout/>}>
                        <Route path='/' element={<HomePage/>}></Route>
                        <Route path='/bus' element={<Business/>}></Route>
                        <Route path='/about' element={<About/>}></Route>
                        <Route path='/terms-and-condition' element={<TermsAndConditions/>}></Route>
                        <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
                        <Route path='/login' element={<Login/>}></Route>
                        <Route path='/business-signup' element={<BusinessSignup/>}></Route>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
                    <Route path='/reset-password' element={<NewPassword/>}></Route>
                    <Route path='/reset-password-code' element={<ResetPasswordCode/>}></Route>
                    <Route path='*' element={<NotFound/>}/>
                    <Route element={<Index/>}>
                        <Route path='/vendor' element={<Vendor/>}></Route>                       
                        <Route path='/dashboard' element={<Dashboard/>}></Route>                       
                        <Route path='/springpay' element={<SpringPay/>}></Route>                       
                        <Route path='/settings/manage-users' element={<ManageUsers/>}></Route>                       
                        <Route path='/settings/user-settings' element={<UserSettings/>}></Route>                       
                        <Route path='/settings/user-roles' element={<UserRoles/>}></Route>                       
                        <Route path='/invoice/generate' element={<NewInvoice/>}></Route>                       
                        <Route path='/invoice' element={<InvoiceIndex/>}></Route>                       
                        <Route path='/invoice/details' element={<InvoiceDetails/>}></Route>                       
                        <Route path='/invoice/template' element={<InvoiceTemplate/>}></Route>                       
                        <Route path='/dashboard/customers' element={<RecentCustomers/>}></Route>                       
                    </Route>
                </Routes>
            </ScrollToTop>
        </Router>
    )
}

export default Routers