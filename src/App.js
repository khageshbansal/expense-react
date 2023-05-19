import React, { useContext } from 'react';
import Navbar from './components/Navbar';
import Shop from './components/Shop';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Forgot from './pages/Forgot';
import Profile from './pages/Profile';
import { Link } from 'react-router-dom';
import { ContextProvider } from './components/CartContext';
import {
  AuthProvider,
  MyContext as AuthContext,
} from './components/AuthContext';


import { Provider } from 'react-redux';
import store from './redux/store';

import { Route, Routes, BrowserRouter } from 'react-router-dom';

export default function App() {
  let authObj = useContext(AuthContext);
  console.log(authObj);

  return (
    <>
     <Provider store={store}>
      <AuthProvider>
        <ContextProvider>
          <main>
            <BrowserRouter>
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<ContactUs />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot" element={<Forgot />} />

                {/* {authObj.isLogged  &&
            <>
            <Route path="/profile" element={<Profile />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/productDetails/:id" element={<ProductDetails />} />
              </>
              } */}

                <Route path="/profile" element={<Profile />} />
                <Route path="/shop" element={<Shop />} />

                <Route path="*" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </main>

          <Footer />
        </ContextProvider>
      </AuthProvider>
      </Provider>
    </>
  );
}
