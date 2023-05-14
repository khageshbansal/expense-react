import React, { useRef, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { MyContext as AuthContext } from '../components/AuthContext';

export default function Profile(props) {
  let navigate = useNavigate();
  let objAuth = useContext(AuthContext);
  let passwordFilled = useRef();
  let name = useRef();
  let photoUrl = useRef();

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
    console.log(objAuth.token);
    let bodyload = {
      idToken: objAuth.token,
      password: passwordFilled.current.value,
      returnSecureToken: true,
    };

    await postData(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api}`,
      bodyload
    ).then((data) => {
      // console.log(data);
      if (data.error) alert(data.error.message);
      else {
        alert('Password Reseted Login again');
        objAuth.Logout();
        passwordFilled.current.value = '';
        navigate('/login');
      }
    });
  }

  async function updateProfileHandler() {
    let bodyload = {
      idToken: objAuth.token,
      displayName: name.current.value,
      photoUrl: photoUrl.current.value,
      returnSecureToken: true,
    };

    await postData(
      `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${api}`,
      bodyload
    ).then((data) => {
      // console.log(data);
      if (data.error) alert(data.error.message);
      else {
        alert('User Profile Updated');

        // name.current.value = '';
        // photoUrl.current.value = '';
      }
    });
  }

  async function verifyEmailHandler() {
    let bodyload = {
      idToken: objAuth.token,
      returnSecureToken: true,
    };

    await postData(
      `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${api}`,
      bodyload
    ).then((data) => {
      // console.log(data);
      if (data.error) alert(data.error.message);
      else {
        alert(
          'Verification Email has been sent to your registered Email address.'
        );

        // name.current.value = '';
        // photoUrl.current.value = '';
      }
    });
  }

  return (
    <>
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-2">
          <h1 class="display-4">Your User Profile</h1>
        </div>
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Update Profile</h2>
                <form>
                  <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                      ref={name}
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="photo-url">Photo URL:</label>
                    <input
                      ref={photoUrl}
                      type="text"
                      className="form-control"
                      id="photo-url"
                      placeholder="Enter your photo URL"
                    />
                  </div>
                  <button
                    onClick={updateProfileHandler}
                    type="button"
                    className="btn btn-primary  mt-3"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Verify Email</h2>
                <button
                  onClick={verifyEmailHandler}
                  type="button"
                  className="btn btn-primary  mt-3"
                >
                  Verify Email
                </button>
              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title">Change Password</h2>
                <form className="w-100">
                  <div className="form-group">
                    <label htmlFor="password">New Password</label>
                    <input
                      required
                      minLength="6"
                      ref={passwordFilled}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>

                  <button
                    onClick={submitHandler}
                    type="button"
                    className="btn btn-primary  mt-3"
                  >
                    Change Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
