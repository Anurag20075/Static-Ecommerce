import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from "./Component/Main";
import Navbar from "./Component/Navbar";
import Footer from "./Component/Footer";
import Contact from "./Component/Contact";
import CartCheckout from "./Component/CartCheckout";
import DetailPage from "./Component/DetailedPage";
// import MensCategories from "./Component/MensCategories";
import Categories from "./Component/Categories";
function App() {
    return (
        <Router>
            <Navbar />

            <CartCheckout />

            <Routes>
                <Route path="/" element={<Main />} />

                <Route path="/categories" element={<Categories />} />
                <Route path="/product/:id" element={<DetailPage />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>

            <Footer />
        </Router>
     

    );
}

export default App;

