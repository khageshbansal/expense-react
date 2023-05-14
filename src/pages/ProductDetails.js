import React, { useEffect, useState } from 'react';
import { useParams,Link } from 'react-router-dom';

export default function ProductDetails(props) {
  const { id } = useParams();
  let [data, setData] = useState([]);
  async function fetchProducts() {
    let res = await fetch(`https://dummyjson.com/products/${id}`);
    setData(await res.json());
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  console.log(data);

  return (
    <>
      <div class="container my-5">
        <div class="card">
          <div class="row no-gutters">
            <div class="col-md-6">
              <img src={data.thumbnail} alt="Product Image" class="card-img" />
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h1 class="card-title">{data.title}</h1>
                <p class="card-text lead">{data.brand}</p>

                <h2 class="card-title">Product Description</h2>
                <p class="card-text lead">{data.description}</p>


                {/* <h2 class="card-title">Product Rating</h2>
                <p class="card-text lead">
                  {console.log(convertToStars(data.rating))}
                  
                </p> */}

                <p class="card-text price lead">${data.price}</p>
                <Link class="btn btn-primary" to="./shop">
          Go back to Shop
        </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
