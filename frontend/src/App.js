import './App.css';
import {Container} from 'react-bootstrap';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './screens/Home';
import ProductScreen from './screens/ProductScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  
import CreateListing from './screens/CreateListing';
import ReviewScreen from './screens/ReviewScreen';
import Login from './screens/Login';
import Register from './screens/Register';
import ForgotPassword from './screens/ForgotPassword';
import Logout from './screens/Logout';

function App() {
  return (
    <Router>
      <Header />
          <main className='py-3'>
            <Container>
              <Routes>
                <Route path='/' element={<Home />} end />
                <Route path='/product/:itemId' element={<ProductScreen />} />
                <Route path='/createListing' element={<CreateListing/>} />
                <Route path='/review' element={<ReviewScreen />} />
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot' element={<ForgotPassword />} />
                <Route path='/logout' element={<Logout />} />
              </Routes>
            </Container>
          </main>
          <Footer />
    </Router>
  );
}

export default App;
