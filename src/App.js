import { useState } from 'react';
import styled from 'styled-components';
import Wishlist from './Wishlist.js';
import AddListItem from './AddListItem.js';

export default function App() {
  const [listItems, setListItems] = useState([]);

  return (
    <>
      <Heading>Diving Wishlist</Heading>
      <AddListItem onAddItem={AddItem} />
      <Wishlist listItems={listItems} />
    </>
  );

  function AddItem(destination, notes) {
    setListItems([{ destination: destination, notes: notes }, ...listItems]);
  }
}

const Heading = styled.h1`
  text-align: center;
`;
