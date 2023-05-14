import React, { useState, useEffect, useCallback } from 'react';
import Item from './Item';

export default function List() {
  // let dummy = [
  //   {
  //     id: 1,
  //     title: 'Colors',

  //     price: 100,

  //     imageUrl:
  //       'https://prasadyash2411.github.io/ecom-website/img/Album%201.png',
  //   },

  //   {
  //     id: 2,
  //     title: 'Black and white Colors',

  //     price: 50,

  //     imageUrl:
  //       'https://prasadyash2411.github.io/ecom-website/img/Album%202.png',
  //   },

  //   {
  //     id: 3,
  //     title: 'Yellow and Black Colors',

  //     price: 70,

  //     imageUrl:
  //       'https://prasadyash2411.github.io/ecom-website/img/Album%203.png',
  //   },

  //   {
  //     id: 4,
  //     title: 'Blue Color',

  //     price: 100,

  //     imageUrl:
  //       'https://prasadyash2411.github.io/ecom-website/img/Album%204.png',
  //   },
  // ];

  let [products, setProducts] = useState([]);
  let [isLoading, setIsLoading] = useState(false);
  let [error, setError] = useState(null);

  React.useEffect(() => {
    async function fetchProducts() {
      setIsLoading(true);
      setError(null);

      try {
        let res = await fetch(
          'https://dummyjson.com/products?limit=10&select=title,price,thumbnail'
        );

        if (!res.ok) throw new Error('Sothing went wrong');
        let data = await res.json();
        var newDummy = data.products.map((item) => {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            imageUrl: item.thumbnail,
          };
        });
        await setProducts(newDummy);
        // console.log(newDummy);
      } catch (er) {
        setError(er.message);
      }
      setIsLoading(false);
    }
    fetchProducts();
  }, []);

  let content = <p>No products Found</p>;
  if (products.length > 0)
    content = products.map((item) => {
      return <Item item={item} />;
    });
  if (error) content = <p>{error}</p>;
  if (isLoading) content = <p>.......Loading Pls wait</p>;
  return (
    <>
      <div class="container">
        <div class="d-flex flex-wrap justify-content-around">{content}</div>
      </div>
    </>
  );
}
