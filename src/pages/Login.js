import React, { useRef, useState, useContext } from 'react';
import { MyContext as AuthContext } from '../components/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function Login(props) {
  let history = useNavigate();

  let authobj = useContext(AuthContext);
  let [isLoading, setisLoading] = useState(false);
  let emailFilled = useRef();
  let passwordFilled = useRef();
  let api = 'AIzaSyBG0YW4TEX79NL8kcrR_BDKVCOocGXULcY';

  async function postData(url = '', data = {}) {
    const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      headers: {
        'Content-Type': 'application/json',
      },

      body: JSON.stringify(data),
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  async function submitHandler() {
    let bodyload = {
      email: emailFilled.current.value,
      password: passwordFilled.current.value,
      returnSecureToken: true,
    };

    setisLoading(true);
    await postData(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${api}`,
      bodyload
    ).then((data) => {
      setisLoading(false);
      if (data.error) alert(data.error.message);
      else {
        // console.log(data);
        authobj.Login(data.idToken);
        history('/shop');
      }
    });

    emailFilled.current.value = '';
    passwordFilled.current.value = '';
  }

  return (
    <>
      <h1>Login Page</h1>

      <div class="container">
        <div class="d-flex justify-content-center align-items-center vh-100">
          <form class="w-25" onclick="login(event)">
            <div class="form-group">
              <label for="email">Email address</label>
              <input
                required
                ref={emailFilled}
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
                required
                minLength="6"
                ref={passwordFilled}
                type="password"
                class="form-control"
                id="password"
                placeholder="Password"
              />
            </div>

            {!isLoading && (
              <button
                onClick={submitHandler}
                type="button"
                class="btn btn-primary"
              >
                Login
              </button>
            )}
            {isLoading && <p>Sending request</p>}
            <small>
              <Link to="/signup">New User Signup</Link>
            </small>
            <Link to="/forgot" class="btn btn-primary m-3 ml-5">
              Forgot Password
            </Link>
          </form>
        </div>
      </div>
    </>
  );
}
