import React, { useContext } from 'react';
import { MyContext } from './CartContext';
import { MyContext as AuthContext } from './AuthContext';
import { Outlet } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { makePremium } from '../redux/reducers';

import CartModal from './CartModal';
export default function Navbar(props) {
  let isPremium = useSelector((state) => state.user.isPremium);
  const dispatch = useDispatch();

  console.log(isPremium);

  let navigate = useNavigate();
  let itemObj = useContext(MyContext);
  let itemArray = itemObj.items;

  let isLogged = useContext(AuthContext).isLogged;
  let objAuth = useContext(AuthContext);
  // console.log(isLogged);
  return (
    <>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <Link class="navbar-brand" to="/">
            Ecom-Shop
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <button
                onClick={() => {
                  dispatch(makePremium());
                  console.log(isPremium);
                }}
                type="button"
                class="btn btn-primary"
              >
                Activate Premium
              </button>
              <li class="nav-item">
                <Link class="nav-link" to="/">
                  Home
                </Link>
              </li>
              {isLogged && (
                <li class="nav-item">
                  <Link class="nav-link" to="shop">
                    Shop
                  </Link>
                </li>
              )}
              {!isLogged && (
                <li class="nav-item">
                  <Link class="nav-link" to="about">
                    About
                  </Link>
                </li>
              )}
              {isLogged && (
                <li class="nav-item">
                  <Link class="nav-link" to="orders">
                    Orders
                  </Link>
                </li>
              )}
              {!isLogged && (
                <li class="nav-item">
                  <Link class="nav-link" to="contact">
                    Contact Us
                  </Link>
                </li>
              )}
            </ul>

            {/* Button trigger modal */}

            {isLogged ? (
              <>
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                  <li class="nav-item">
                    <Link class="nav-link" to="profile">
                      Profile
                    </Link>
                  </li>
                </ul>

                <button
                  type="button"
                  class="btn btn-primary"
                  data-toggle="modal"
                  data-target="#exampleModalCenter"
                >
                  Cart {itemArray.length}
                </button>

                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    objAuth.Logout();
                    navigate('/');
                  }}
                >
                  LogOut
                </button>
              </>
            ) : (
              <>
                <Link class="btn btn-primary m-2" to="/login">
                  Login
                </Link>
                <Link class="btn btn-primary" to="/signup">
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
      <CartModal />

      <Outlet />
    </>
  );
}
