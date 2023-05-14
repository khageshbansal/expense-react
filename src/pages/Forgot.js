import React, { useRef, useState, useContext } from 'react';
import { Link ,useNavigate} from 'react-router-dom';


export default function Forgot(props) {
  let navigate=useNavigate();
  let emailFilled = useRef();

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
      requestType: 'PASSWORD_RESET',
    };

    await postData(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api}`,
      bodyload
    ).then((data) => {
      // console.log(data);
      if (data.error) alert(data.error.message);
      else {
        alert('Password Reset Link has been set to your emaail address');
      }
    });

    emailFilled.current.value = '';
  }

  return (
    <>
      <h1>Forgot Password</h1>

      <div class="container">
        <div class="d-flex justify-content-center align-items-center vh-100">
          <form class="w-25">
            <div class="form-group">
              <label for="email">Enter Your Registered Email address</label>
              <input
                ref={emailFilled}
                type="email"
                class="form-control"
                id="email"
                placeholder="Enter email"
              />
            </div>

            <button
              onClick={submitHandler}
              type="button"
              class="btn btn-primary"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
