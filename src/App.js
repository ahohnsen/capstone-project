import styled from 'styled-components';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navigation from './components/Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import BookmarksPage from './pages/BookmarksPage.js';
import AddWishPage from './pages/AddWishPage.js';
import EditWishPage from './pages/EditWishPage.js';
import ArchivePage from './pages/ArchivePage.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useLocalStorage('DivingWishlist', []);
  const [diveWishToEdit, setDiveWishToEdit] = useState(null);

  const navigate = useNavigate();
  const bookmarkedWishes = diveWishes.filter(
    diveWish => diveWish.isBookmarked === true
  );

  const archivedWishes = diveWishes.filter(
    diveWish => diveWish.isArchived === true
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
              onToggleCheckmark={toggleCheckmark}
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
              onToggleCheckmark={toggleCheckmark}
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
        <Route
          path="/archive"
          element={
            <ArchivePage
              archivedWishes={archivedWishes}
              onToggleCheckmark={toggleCheckmark}
              onEditDiveWish={handleEditRedirect}
              onDeleteDiveWish={handleDeleteWish}
            />
          }
        />
      </Routes>
      <Navigation />
    </AppGrid>
  );

  function handleAddWish({ destination, notes }) {
    const id = nanoid();
    setDiveWishes([
      { id, destination, notes, isArchived: false },
      ...diveWishes,
    ]);
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

  function toggleCheckmark(id) {
    setDiveWishes(
      diveWishes.map(diveWish => {
        if (id === diveWish.id) {
          return {
            ...diveWish,
            isArchived: !diveWish.isArchived,
            isBookmarked: false,
          };
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
