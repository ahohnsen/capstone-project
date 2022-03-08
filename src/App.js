import styled from 'styled-components';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navigation from './Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import AddWishPage from './pages/AddWishPage.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useState([]);

  return (
    <AppGrid>
      <Header>
        <h1>Diving Wishlist</h1>
      </Header>
      <main>
        <Routes>
          <Route path="/" element={<WishlistPage diveWishes={diveWishes} />} />
          <Route
            path="/add-wish"
            element={<AddWishPage onAddDiveWish={addToWishlist} />}
          />
        </Routes>
      </main>
      <Navigation />
    </AppGrid>
  );

  function addToWishlist({ destination, notes }) {
    setDiveWishes([{ destination, notes }, ...diveWishes]);
  }
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
`;

const Header = styled.header`
  background-color: var(--bg-color-header);
`;
