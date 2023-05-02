import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import NotFound from './pages/NotFound';
import Layout from './common/Layout';
import HomePage from './pages/HomePage';
import Business from './pages/Business';
import About from './pages/About';
import TermsAndConditions from './pages/TermsAndConditions';

function Routers (){
    return (
        <Router>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path='/' element={<HomePage/>}></Route>
                    <Route path='/bus' element={<Business/>}></Route>
                    <Route path='/about' element={<About/>}></Route>
                    <Route path='/terms-and-condition' element={<TermsAndConditions/>}></Route>
                    <Route path='*' element={<NotFound/>}/>
                </Route>
            </Routes>
        </Router>
    )
}

export default Routers