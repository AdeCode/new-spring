import logo from './logo.svg';
import './App.css';
import Routers from './routes';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AuthContextProvider from './contexts/AuthContexts';


function App() {
  return (
    <div className="App">
      <AuthContextProvider>
        <Routers/>
        <ToastContainer/>
      </AuthContextProvider>
    </div>
  );
}

export default App;
