
import React from 'react';


export default function ContactUs(props) {
  return (
    <>
      


  <div class="container my-5">
  <div class="row justify-content-center">
      <div class="col-md-8">
          <h2 class="text-center mb-4">Contact Us</h2>
          <form action="" method="POST">
              <div class="form-group">
                  <label for="name">Name</label>
                  <input type="text" class="form-control" id="name" name="name" required/>
              </div>
              <div class="form-group">
                  <label for="email">Email</label>
                  <input type="email" class="form-control" id="email" name="email" required/>
              </div>
              <div class="form-group">
                  <label for="message">Message</label>
                  <textarea class="form-control" id="message" name="message" rows="5" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-block">Send Message</button>
          </form>
      </div>
  </div>
</div>

    </>
  );
}






