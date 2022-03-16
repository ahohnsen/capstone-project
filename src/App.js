import styled from 'styled-components';
import { useState } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import { nanoid } from 'nanoid';
import { useAuth } from './contexts/AuthContext.js';
import useLocalStorage from './hooks/useLocalStorage.js';
import PrivateRoute from './PrivateRoute.js';
import Navigation from './components/Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import BookmarksPage from './pages/BookmarksPage.js';
import AddWishPage from './pages/AddWishPage.js';
import EditWishPage from './pages/EditWishPage.js';
import ArchivePage from './pages/ArchivePage.js';
import StartScreen from './pages/StartScreen.js';

export default function App() {
  const { currentUser } = useAuth();
  const [diveWishes, setDiveWishes] = useLocalStorage(currentUser?.uid, []);
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
        <Route path="/:login" element={<StartScreen />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <WishlistPage
                diveWishes={diveWishes}
                onToggleBookmark={toggleBookmark}
                onToggleCheckmark={toggleCheckmark}
                onEditDiveWish={handleEditRedirect}
                onDeleteDiveWish={handleDeleteWish}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <BookmarksPage
                bookmarkedWishes={bookmarkedWishes}
                onToggleBookmark={toggleBookmark}
                onToggleCheckmark={toggleCheckmark}
                onEditDiveWish={handleEditRedirect}
                onDeleteDiveWish={handleDeleteWish}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-wish"
          element={
            <PrivateRoute>
              <AddWishPage onAddDiveWish={handleAddWish} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-wish"
          element={
            <PrivateRoute>
              <EditWishPage
                onEditDiveWish={handleEditWish}
                diveWishToEdit={diveWishToEdit}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <PrivateRoute>
              {archivedWishes.length === 0 ? (
                <Navigate replace to="/" />
              ) : (
                <ArchivePage
                  archivedWishes={archivedWishes}
                  onToggleCheckmark={toggleCheckmark}
                  onEditDiveWish={handleEditRedirect}
                  onDeleteDiveWish={handleDeleteWish}
                />
              )}
            </PrivateRoute>
          }
        />
      </Routes>
      {currentUser && <Navigation />}
    </AppGrid>
  );
  // }

  function handleAddWish({ destination, notes }) {
    const id = nanoid();
    setDiveWishes([
      { id, destination, notes, isArchived: false },
      ...diveWishes,
    ]);
    navigate('/');
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
    navigate(-1);
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
