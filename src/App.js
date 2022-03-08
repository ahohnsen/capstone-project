import { useState } from 'react';
import styled from 'styled-components';
import Wishlist from './Wishlist.js';
import AddDiveWish from './AddDiveWish.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useState([]);

  return (
    <>
      <Heading>Diving Wishlist</Heading>
      <AddDiveWish onAddDiveWish={addToWishlist} />
      <Wishlist diveWishes={diveWishes} />
    </>
  );

  function addToWishlist({ destination, notes }) {
    setDiveWishes([{ destination, notes }, ...diveWishes]);
  }
}

const Heading = styled.h1`
  text-align: center;
`;
