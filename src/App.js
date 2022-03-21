import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { nanoid } from 'nanoid';
import { useAuth } from './contexts/AuthContext.js';
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
  const [posts, setPosts] = useState([]);
  const [postToEdit, setPostToEdit] = useState(null);
  const navigate = useNavigate();

  const bookmarkedPosts = posts.filter(post => post.isBookmarked === true);

  const archivedPosts = posts.filter(post => post.isArchived === true);

  useEffect(() => {
    getPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getPosts() {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    }
    console.log(posts);
  }

  return (
    <AppGrid>
      <Routes>
        <Route path="/:signin" element={<StartScreen />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <WishlistPage
                posts={posts}
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
                bookmarkedPosts={bookmarkedPosts}
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
                diveWishToEdit={postToEdit}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <PrivateRoute>
              {archivedPosts.length === 0 ? (
                <Navigate replace to="/" />
              ) : (
                <ArchivePage
                  archivedWishes={archivedPosts}
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
    setPosts([{ id, destination, notes, isArchived: false }, ...posts]);
    navigate('/');
  }

  function handleEditWish({ destination, notes }) {
    setPosts(
      posts.map(post =>
        post.id === postToEdit.id
          ? { ...post, id: post.id, destination, notes }
          : post
      )
    );
    setPostToEdit(null);
    navigate(-1);
  }

  function handleEditRedirect(post) {
    setPostToEdit({ ...post });
    navigate('/edit-wish');
  }

  function handleDeleteWish(id) {
    setPosts(posts.filter(post => post.id !== id));
  }

  function toggleBookmark(id) {
    setPosts(
      posts.map(post => {
        if (id === post.id) {
          return { ...post, isBookmarked: !post.isBookmarked };
        } else {
          return post;
        }
      })
    );
  }

  function toggleCheckmark(id) {
    setPosts(
      posts.map(post => {
        if (id === post.id) {
          return {
            ...post,
            isArchived: !post.isArchived,
            isBookmarked: false,
          };
        } else {
          return post;
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
