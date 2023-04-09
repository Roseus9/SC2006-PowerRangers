import "./App.css";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//components & screens
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./screens/Home";
import ProductScreen from "./screens/ProductScreen";
import ReviewScreen from "./screens/ReviewScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import CreateListing from "./screens/CreateListing";
import ProfileScreen from "./screens/ProfileScreen";
import CreateOffer from "./screens/CreateOffer";

import OffersScreen from "./screens/OffersScreen";
import EditListing from "./screens/EditListing";
import EditOffer from "./screens/EditOffer";

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<Home />} end />
            <Route path="/login" element={<LoginScreen />} />
            <Route path="/product/:itemId" element={<ProductScreen />} />
            <Route path="/review/:offerID" element={<ReviewScreen />} />
            <Route path="/register" element={<RegisterScreen />} />
            <Route path="/create" element={<CreateListing />} />
            <Route path="/profile/:username" element={<ProfileScreen />} />
            <Route path="/offer/product/:productID" element={<CreateOffer />} />
            <Route path="/edit/product/:productID" element={<EditListing />} />
            <Route path="/offers/:username" element={<OffersScreen />} />
            <Route path="/edit/offer/:oid" element={<EditOffer />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
