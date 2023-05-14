import React from 'react';
import { Link } from 'react-router-dom';

export default function About(props) {
  return (
    <>
    <div class="container my-5">
  <div class="row">
    <div class="col-md-6">
      <img src="https://via.placeholder.com/500x350" alt="Our Team" class="img-fluid"/>
    </div>
    <div class="col-md-6">
      <h1>About Us</h1>
      <h2>Our Vision</h2>
      <p class="lead">Our vision is to become the most trusted and reliable ecommerce website, offering a wide range of high-quality products at affordable prices and delivering exceptional customer service.</p>
      
      <h2>Our Mission</h2>
      <p class="lead">Our mission is to make online shopping easy, convenient, and enjoyable for our customers by providing a user-friendly website, fast and reliable shipping, easy returns, and exceptional customer service.</p>
      </div>
      <h2>Our Values</h2>
      <ul>
        <li><strong>Integrity:</strong> We believe in being honest and transparent in all our dealings, both with our customers and our suppliers.</li>
        <li><strong>Quality:</strong> We are committed to providing only the highest-quality products to our customers.</li>
        <li><strong>Customer Service:</strong> We strive to provide exceptional customer service by being responsive to our customers' needs and providing timely and helpful support.</li>
        <li><strong>Innovation:</strong> We are constantly seeking new and innovative ways to improve our products, services, and customer experience.</li>
        <li><strong>Community:</strong> We believe in giving back to the communities we serve by supporting local businesses and charitable organizations.</li>
      </ul>
    
  </div>
</div>


    </>
  );
}
