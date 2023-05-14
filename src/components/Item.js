import React, { useState, useContext, useEffect } from 'react';
import { MyContext } from './CartContext';
import { MyContext as AuthContext } from './AuthContext';
import { Link } from 'react-router-dom';
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export default function Item(prop) {
  let authObj = useContext(AuthContext);
  let itemObj = useContext(MyContext);

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

  async function HadleAddToCartButton() {
    try {
      let curitem = prop.item;
      // itemObj.addItem(curitem);

      let emailData = await postData(
        `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBG0YW4TEX79NL8kcrR_BDKVCOocGXULcY   `,
        { idToken: authObj.token }
      );

      let currentEmail = emailData.users[0].email;
      let removeSpecialChracters = currentEmail.replace(/[^a-zA-Z0-9]/g, '');
      //     regular expression [^a-zA-Z0-9] means "match any character that is not a letter or a number".
      // The g flag at the end of the regular expression means that the replacement should be done globally

      let dbInsert = await postData(
        `https://crudcrud.com/api/7e4ada29e534416f81856109ee2471d3/ecom${removeSpecialChracters}`,
        curitem
      );

      // console.log(dbInsert);

      let res = await fetch(
        `https://crudcrud.com/api/7e4ada29e534416f81856109ee2471d3/ecom${removeSpecialChracters}`
      );

      if (!res.ok) throw new Error('Sothing went wrong');
      let data = await res.json();

    
      itemObj.addItem(data);
    } catch (er) {
      console.log(er);
    }
  }

  return (
    <>
      <div class="card m-2" id={prop.item.id}>
        <img
          style={{ height: '250px', width: '250px' }}
          src={prop.item.imageUrl}
          class="card-img-top"
          alt=""
        />

        {/* <img src={prop.item.imageUrl} class="card-img-top" alt="" /> */}
        <div class="card-body">
          <h5 class="card-title">{prop.item.title}</h5>
          <h4 class="card-title price">
            Price: <span class="price">{prop.item.price}</span>
          </h4>

          <div class="d-flex flex-wrap justify-content-around">
            <a class="btn btn-primary" onClick={HadleAddToCartButton}>
              Add to Cart
            </a>

            <Link
              class="btn btn-primary"
              to={`/productDetails/${prop.item.id}`}
            >
              {' '}
              View <i class="fas fa-search"></i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
