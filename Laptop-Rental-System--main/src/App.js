import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Errror from './components/Errror';
import {Routes,Route} from "react-router-dom"
import MyCart from './pages/MyCart';
import Home from './pages/Home';
import Admin from './components/admin';
import Location from './components/location';
import Additem  from './components/additem';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login />} />
           {/* <Route path='/details' element={<Details />} /> */}
      <Route path='*' element={<Errror />} />
      <Route path="/login/Home" element={<Home />} />
        <Route path="/login/Home/mycart" element={<MyCart />} />

        <Route path="/login/admin"  element ={ <Admin/>} />
        <Route path="/login/admin/additem"  element ={ <Additem/>} />


        <Route path="/login/admin" element={<Admin/>} />
        <Route path="/login/admin/location" element={<Location/>} />

    </Routes>
 
  );
}

export default App;
