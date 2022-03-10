import styled from 'styled-components';
import { nanoid } from 'nanoid';
import { Route, Routes } from 'react-router-dom';
import useLocalStorage from './hooks/useLocalStorage.js';
import Navigation from './Navigation.js';
import WishlistPage from './pages/WishlistPage.js';
import BookmarksPage from './pages/BookmarksPage.js';
import AddWishPage from './pages/AddWishPage.js';

export default function App() {
  const [diveWishes, setDiveWishes] = useLocalStorage('DivingWishlist', []);

  return (
    <AppGrid>
      <Routes>
        <Route
          path="/"
          element={
            <WishlistPage
              diveWishes={diveWishes}
              onToggleBookmark={toggleBookmark}
              onDeleteDiveWish={handleDeleteWish}
            />
          }
        />
        <Route
          path="/favorites"
          element={
            <BookmarksPage
              bookmarkedWishes={diveWishes.filter(
                diveWish => diveWish.isBookmarked === true
              )}
              onToggleBookmark={toggleBookmark}
              onDeleteDiveWish={handleDeleteWish}
            />
          }
        />
        <Route
          path="/add-wish"
          element={<AddWishPage onAddDiveWish={handleAddWish} />}
        />
      </Routes>
      <Navigation />
    </AppGrid>
  );

  function handleAddWish({ destination, notes }) {
    const id = nanoid();
    setDiveWishes([{ id, destination, notes }, ...diveWishes]);
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
`;
