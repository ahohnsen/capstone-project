import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navigation from './Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import AddWishPage from './pages/AddWishPage.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useLocalStorage('DivingWishlist', []);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const [currentWishId, setCurrentWishId] = useState('');

  return (
    <AppGrid>
      <Header>
        <h1>Diving Wishlist</h1>
      </Header>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <WishlistPage
                diveWishes={diveWishes}
                confirmDeleteWish={confirmDeleteWish}
                cancelDeleteWish={cancelDeleteWish}
                isDialogVisible={isDialogVisible}
                showDeleteDialog={showDeleteDialog}
              />
            }
          />
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
    const id = nanoid();
    setDiveWishes([{ id, destination, notes }, ...diveWishes]);
  }

  function confirmDeleteWish() {
    setIsDialogVisible(false);
    setDiveWishes(diveWishes.filter(diveWish => diveWish.id !== currentWishId));
  }
  function cancelDeleteWish() {
    setIsDialogVisible(false);
  }
  function showDeleteDialog(id) {
    setIsDialogVisible(true);
    setCurrentWishId(id);
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
