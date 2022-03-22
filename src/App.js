import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
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
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const navigate = useNavigate();

  const sortedPosts = posts ? [...posts].reverse() : null;

  const bookmarkedPosts = sortedPosts?.filter(
    post => post.isBookmarked === true
  );

  const archivedPosts = sortedPosts?.filter(post => post.isArchived === true);

  useEffect(() => {
    setIsLoading(true);
    getPosts();
    setTimeout(() => setIsLoading(false), 1500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function getPosts() {
    setHasError(false);
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data);
    } catch (error) {
      console.log('Error:', error.message);
      setHasError(true);
    }
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
                sortedPosts={sortedPosts}
                isLoading={isLoading}
                hasError={hasError}
                onToggleBookmark={toggleBookmark}
                onToggleCheckmark={toggleCheckmark}
                onEditPost={handleEditRedirect}
                onDeletePost={handleDeletePost}
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
                onEditPost={handleEditRedirect}
                onDeletePost={handleDeletePost}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/add-wish"
          element={
            <PrivateRoute>
              <AddWishPage onAddPost={handleAddPost} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-wish"
          element={
            <PrivateRoute>
              <EditWishPage
                onEditPost={handleEditPost}
                postToEdit={postToEdit}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/archive"
          element={
            <PrivateRoute>
              {archivedPosts?.length === 0 ? (
                <Navigate replace to="/" />
              ) : (
                <ArchivePage
                  archivedPosts={archivedPosts}
                  onToggleCheckmark={toggleCheckmark}
                  onEditPost={handleEditRedirect}
                  onDeletePost={handleDeletePost}
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

  async function handleAddPost({ destination, notes }) {
    const newPost = {
      destination: destination,
      notes: notes,
    };
    try {
      await axios.post('/api/posts', newPost);
      getPosts();
    } catch (error) {
      console.log('Error', error.messages);
    }
    navigate('/');
  }

  async function handleEditPost({ destination, notes }) {
    const newPost = {
      _id: postToEdit._id,
      post: {
        destination,
        notes,
      },
    };
    try {
      await axios.put('/api/posts/', newPost);
      getPosts();
    } catch (error) {
      console.log('Error:', error.message);
    }
    setPostToEdit(null);
    navigate(-1);
  }

  function handleEditRedirect(post) {
    setPostToEdit({ ...post });
    navigate('/edit-wish');
  }

  async function handleDeletePost(_id) {
    try {
      await axios.delete('/api/posts/', { data: { _id: _id } });
      getPosts();
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  async function toggleBookmark(_id) {
    const bookmarkStatus = posts.find(post => post._id === _id);
    const toggleBookmarkPost = {
      _id: _id,
      post: {
        isBookmarked: !bookmarkStatus.isBookmarked,
      },
    };
    try {
      await axios.put('/api/posts/', toggleBookmarkPost);
      getPosts();
    } catch (error) {
      console.log('Error:', error.message);
    }
  }

  async function toggleCheckmark(_id) {
    const archiveStatus = posts.find(post => post._id === _id);
    const toggleCheckmarkPost = {
      _id: _id,
      post: {
        isArchived: !archiveStatus.isArchived,
        isBookmarked: false,
      },
    };
    try {
      await axios.put('/api/posts/', toggleCheckmarkPost);
      getPosts();
    } catch (error) {
      console.log('Error:', error.message);
    }
  }
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
`;
