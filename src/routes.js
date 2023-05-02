import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Layout from './common/Layout';
import HomePage from './pages/HomePage';
import Business from './pages/Business';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ScrollToTop from './components/ScrollToTop'

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
                        <Route path='*' element={<NotFound/>}/>
                    </Route>
                    <Route path='*' element={<NotFound/>}/>
                </Routes>
            </ScrollToTop>
        </Router>
    )
}

export default Routers