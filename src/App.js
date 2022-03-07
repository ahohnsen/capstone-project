import { useState } from 'react';
import styled from 'styled-components';
import Wishlist from './Wishlist.js';

export default function App() {
  const [listItems, setListItems] = useState([]);

  return (
    <>
      <Heading>Diving Wishlist</Heading>
      <Wishlist listItems={listItems} />
    </>
  );
}

const Heading = styled.h1`
  text-align: center;
`;
