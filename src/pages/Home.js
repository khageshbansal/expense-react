import React from 'react';
import { Link } from 'react-router-dom';

export default function Home(props) {
  return (
    <>
      <div class="p-5 text-center bg-light">
        <h1 class="mb-3">Heading</h1>
        <h4 class="mb-3">Subheading</h4>

        <>
                <Link class="btn btn-primary m-2" to="/login">
                  Login
                </Link>
                <Link class="btn btn-primary" to="signup">
         SignUp
        </Link>
              </>
        
      </div>
    </>
  );
}
