import styled from 'styled-components';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navigation from './Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import BookmarksPage from './pages/BookmarksPage.js';
import AddWishPage from './pages/AddWishPage.js';
import EditWishPage from './pages/EditWishPage.js';

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
              onEditDiveWish={handleEditRedirect}
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
              onEditDiveWish={handleEditRedirect}
              onDeleteDiveWish={handleDeleteWish}
            />
          }
        />
        <Route
          path="/add-wish"
          element={<AddWishPage onAddDiveWish={handleAddWish} />}
        />
        <Route
          path="/edit-wish"
          element={
            <EditWishPage
              onEditDiveWish={handleEditWish}
              diveWishToEdit={diveWishToEdit}
            />
          }
        />
      </Routes>
      <Navigation />
    </AppGrid>
  );

  function handleAddWish({ destination, notes }) {
    const id = nanoid();
    setDiveWishes([{ id, destination, notes }, ...diveWishes]);
  }

  function handleEditWish({ destination, notes }) {
    setDiveWishes(
      diveWishes.map(diveWish =>
        diveWish.id === diveWishToEdit.id
          ? { ...diveWish, id: diveWishToEdit.id, destination, notes }
          : diveWish
      )
    );
    setDiveWishToEdit(null);
  }

  function handleEditRedirect(wish) {
    setDiveWishToEdit({ ...wish });
    navigate('/edit-wish');
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
