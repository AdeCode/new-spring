import logo from './logo.svg';
import './App.css';
import Routers from './routes';
import 'react-toastify/dist/ReactToastify.css';
// import AuthContextProvider from "./contexts/AuthContext";
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
      {/* <AuthContextProvider> */}
        <Routers/>
        <ToastContainer/>
      {/* </AuthContextProvider> */}
    </div>
  );
}

export default App;
