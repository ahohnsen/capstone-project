import { useState } from 'react';
import styled from 'styled-components';
import Wishlist from './Wishlist.js';
import AddDiveWish from './AddDiveWish.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useState([]);

  return (
    <>
      <Heading>Diving Wishlist</Heading>
      <AddDiveWish onAddDiveWish={AddToWishlist} />
      <Wishlist diveWishes={diveWishes} />
    </>
  );

  function AddToWishlist(destination, notes) {
    setDiveWishes([{ destination: destination, notes: notes }, ...diveWishes]);
  }
}

const Heading = styled.h1`
  text-align: center;
`;
