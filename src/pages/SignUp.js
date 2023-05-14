import React, { useRef, useState } from 'react';
import { Link ,useNavigate} from 'react-router-dom';


export default function SignUp(props) {
  let history=useNavigate();

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
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${api}`,
      bodyload
    ).then((data) => {
      setisLoading(false);
      if (data.error) alert(data.error.message);
      // console.log(data);
      history('/login');
    });

    emailFilled.current.value = '';
    passwordFilled.current.value = '';
  }

  return (
    <>
      <h1>Sign-Up Page</h1>

      <div class="container">
        <div class="d-flex justify-content-center align-items-center vh-100 ">
          <form>
            {/* <div class="form-group">
            <label for="name">Name</label>
            <input required="required" type="name" class="form-control" id="name" placeholder="Name"/>
          </div> */}

            <div class="form-group">
              <label for="email">Email address</label>
              <input
               required
                type="email"
                class="form-control"
                id="email"
                ref={emailFilled}
                placeholder="Enter email"
              />
            </div>
            <div class="form-group">
              <label for="password">Password</label>
              <input
              required
              minLength='6'
                type="password"
                class="form-control"
                id="password"
                ref={passwordFilled}
                placeholder="Password"
              />
            </div>

            {!isLoading && (
              <button
                onClick={submitHandler}
                type="button"
                class="btn btn-primary"
              >
                Sign-Up
              </button>
            )}
            {isLoading && <p>Sending request</p>}
            <small>
              <Link to="/login">Existing User Login</Link>
            </small>
          </form>
        </div>
      </div>
    </>
  );
}
