import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Layout from './common/Layout';
// import HomePage from './pages/HomePage';
import Business from './pages/Business';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop'
import Login from './pages/auth/Login';
import BusinessSignup from './pages/auth/merchant/BusinessSignup';
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
import CustomerSignup from './pages/auth/CustomerSingup';
import ProtectedRoute from './components/ProtectedRoute';
import UserType from './pages/auth/UserType';
import MerchantLogin from './pages/auth/merchant/MerchantLogin';
import MerchantForgotPassword from './pages/auth/merchant/MerchantForgotPassword';
import BusinessNewPassword from './pages/auth/merchant/BusinessNewPassword';
import PersonalInformation from './pages/dashboard/setting/PersonalInformation';
import CustomerInvoiceList from './pages/dashboard/customer/CustomerInvoiceList';
import InvoicePreview from './pages/dashboard/customer/InvoicePreview';
import FormComponent from './pages/dashboard/FormStep'
import SearchVendors from './pages/SearchVendors';
import WebInfo from './pages/dashboard/WebInfo';
// import NewHome from './pages/NewHome'

function Routers (){
    return (
        <Router>
            <ScrollToTop>
                <Routes>
                    <Route path='/' element={<MerchantLogin/>}></Route>
                    <Route path='/select-user-type' element={<UserType/>}></Route>
                    {/* <Route path='/' element={<Login/>}></Route> */}
                    <Route element={<Layout/>}>
                        {/* <Route path='/home' element={<HomePage/>}></Route> */}
                        {/* <Route path='/new-home' element={<NewHome/>}></Route> */}
                        <Route path='/bus' element={<Business/>}></Route>
                        <Route path='/about' element={<About/>}></Route>
                        <Route path='/terms-and-condition' element={<TermsAndConditions/>}></Route>
                        <Route path='/privacy-policy' element={<PrivacyPolicy/>}></Route>
                        <Route path='/search-vendors' element={<SearchVendors/>}></Route>
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='/forgot-password' element={<ForgotPassword/>}></Route>
                    <Route path='/business-forgot-password' element={<MerchantForgotPassword/>}></Route>
                    <Route path='/reset-password' element={<NewPassword/>}></Route>
                    <Route path='/business-reset-password' element={<BusinessNewPassword/>}></Route>
                    <Route path='/reset-password-code' element={<ResetPasswordCode/>}></Route>
                    <Route path='/business-signup' element={<BusinessSignup/>}></Route>
                    <Route path='/customer-signup' element={<CustomerSignup/>}></Route>
                    <Route path='/business-login' element={<MerchantLogin/>}></Route>
                    <Route path='/login' element={<Login/>}></Route>
                    <Route path='*' element={<NotFound/>}/>
                    <Route element={
                        <ProtectedRoute>
                            <Index/>
                        </ProtectedRoute>
                    }>
                        <Route path='/vendor' element={<Vendor/>}></Route>                       
                        <Route path='/dashboard' element={<Dashboard/>}></Route>                       
                        <Route path='/springpay' element={<SpringPay/>}></Route>                       
                        <Route path='/settings/manage-users' element={<ManageUsers/>}></Route>                       
                        <Route path='/settings/user-settings' element={<UserSettings/>}></Route>                       
                        <Route path='/settings/user-roles' element={<UserRoles/>}></Route>                       
                        <Route path='/invoice/generate' element={<NewInvoice/>}></Route>                       
                        <Route path='/invoice' element={<InvoiceIndex/>}></Route>                       
                        <Route path='/invoice/details/:invoiceCode' element={<InvoiceDetails/>}></Route>                       
                        <Route path='/invoice/template' element={<InvoiceTemplate/>}></Route>                       
                        <Route path='/dashboard/customers' element={<RecentCustomers/>}></Route>     
                        <Route path='/dashboard/customers/:customerId' element={<CustomerInvoiceList/>}></Route>     
                        <Route path='/dashboard/customers/invoice/:invoiceCode' element={<InvoicePreview/>}></Route>     
                        <Route path='/settings/personal-information' element={<PersonalInformation/>}></Route>     
                        <Route path='/settings/web-information' element={<WebInfo/>}></Route>     
                        <Route path='/dashboard/payouts' element={<FormComponent/>}></Route>     
                    </Route>
                </Routes>
            </ScrollToTop>
        </Router>
    )
}

export default Routers