import styled from 'styled-components';
import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navigation from './Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import BookmarksPage from './pages/BookmarksPage.js';
import AddWishPage from './pages/AddWishPage.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useLocalStorage('DivingWishlist', []);
  const [diveWishToEdit, setDiveWishToEdit] = useState(null);

  const navigate = useNavigate();
  const bookmarkedWishes = diveWishes.filter(
    diveWish => diveWish.isBookmarked === true
  );

  return (
    <AppGrid>
      <Routes>
        <Route
          path="/"
          element={
            <WishlistPage
              diveWishes={diveWishes}
              onToggleBookmark={toggleBookmark}
              onEditDiveWish={handleEditWish}
              onDeleteDiveWish={handleDeleteWish}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <BookmarksPage
              bookmarkedWishes={bookmarkedWishes}
              onToggleBookmark={toggleBookmark}
              onEditDiveWish={handleEditWish}
              onDeleteDiveWish={handleDeleteWish}
            />
          }
        />
        <Route
          path="/add-wish/:status"
          element={
            <AddWishPage
              onAddDiveWish={handleAddWish}
              diveWishToEdit={diveWishToEdit}
            />
          }
        />
      </Routes>
      <Navigation />
    </AppGrid>
  );

  function handleAddWish({ id, destination, notes }) {
    if (diveWishToEdit) {
      setDiveWishes(
        diveWishes.map(diveWish =>
          diveWish.id === id ? { ...diveWish, destination, notes } : diveWish
        )
      );
      setDiveWishToEdit(null);
    } else {
      setDiveWishes([{ id, destination, notes }, ...diveWishes]);
    }
  }

  function handleEditWish(wish) {
    setDiveWishToEdit({ ...wish });
    navigate('/add-wish/edit');
  }

  function handleDeleteWish(id) {
    setDiveWishes(diveWishes.filter(diveWish => diveWish.id !== id));
  }

  function toggleBookmark(id) {
    setDiveWishes(
      diveWishes.map(diveWish => {
        if (id === diveWish.id) {
          return { ...diveWish, isBookmarked: !diveWish.isBookmarked };
        } else {
          return diveWish;
        }
      })
    );
  }
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
`;
