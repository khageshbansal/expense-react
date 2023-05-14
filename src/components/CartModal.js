import React from 'react';
import CartContent from './CartContent';
export default function CartModal(props) {
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="exampleModalCenter"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div
          class="modal-dialog modal-dialog-centered modal-lg"
          role="document"
        >
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLongTitle">
                My Cart
              </h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Item</th>
                    <th scope="col">Price</th>
                    {/* <th scope="col">Quantity</th>
              <th scope="col">Subtotal</th> */}
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  <CartContent />
                </tbody>
              </table>

              <h4 class="text-center">
                TOTAL : <span id="total"></span>
              </h4>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-dismiss="modal"
              >
                Close
              </button>
              <button class="btn btn-primary" onclick="order()">
                Order Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
