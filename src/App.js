import styled from 'styled-components';
import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './contexts/AuthContext.js';
import PrivateRoute from './PrivateRoute.js';
import Navigation from './components/Navigation.js';
import SearchPage from './pages/SearchPage.js';
import BookmarksPage from './pages/BookmarksPage.js';
import AddRequestPage from './pages/AddRequestPage.js';
import EditRequestPage from './pages/EditRequestPage.js';
import UserRequestsPage from './pages/UserRequestsPage.js';
import StartScreen from './pages/StartScreen.js';
import ProfilePage from './pages/ProfilePage.js';
import EditProfilePage from './pages/EditProfilePage.js';

export default function App() {
  const { currentUserData, setCurrentUserData } = useAuth();
  const [posts, setPosts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);
  const navigate = useNavigate();

  const sortedPosts = posts ? [...posts].reverse() : null;

  const bookmarkedPosts = sortedPosts?.filter(
    post => post.isBookmarked === true
  );

  return (
    <AppGrid>
      <Routes>
        <Route path="/:signin" element={<StartScreen />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <SearchPage
                sortedPosts={sortedPosts}
                onGetPosts={getPosts}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
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
          path="/add-request"
          element={
            <PrivateRoute>
              <AddRequestPage onAddPost={handleAddPost} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-request"
          element={
            <PrivateRoute>
              <EditRequestPage
                onEditPost={handleEditPost}
                postToEdit={postToEdit}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile/:uid"
          element={
            <PrivateRoute>
              <ProfilePage sortedPosts={sortedPosts} />
            </PrivateRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <PrivateRoute>
              <EditProfilePage
                currentUserData={currentUserData}
                onUpdateProfile={handleUpdateProfile}
              />
            </PrivateRoute>
          }
        />
        <Route
          path="/user-requests/:uid"
          element={
            <PrivateRoute>
              <UserRequestsPage
                sortedPosts={sortedPosts}
                onToggleCheckmark={toggleCheckmark}
                onEditPost={handleEditRedirect}
                onDeletePost={handleDeletePost}
              />
            </PrivateRoute>
          }
        />
      </Routes>
      {currentUserData && <Navigation />}
    </AppGrid>
  );

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

  async function handleAddPost({
    destination,
    description,
    startDate,
    endDate,
  }) {
    const newPost = {
      destination: destination,
      description: description,
      startDate: startDate,
      endDate: endDate,
      author: currentUserData._id,
    };
    try {
      await axios.post('/api/posts', newPost);
      getPosts();
    } catch (error) {
      console.log('Error', error.messages);
    }
    navigate('/');
  }

  async function handleEditPost({
    destination,
    description,
    startDate,
    endDate,
  }) {
    const newPost = {
      _id: postToEdit._id,
      post: {
        destination,
        description,
        startDate,
        endDate,
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
    navigate('/edit-request');
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
    const postToToggle = posts.find(post => post._id === _id);
    const updatedPost = {
      _id: _id,
      post: {
        isBookmarked: !postToToggle.isBookmarked,
      },
    };
    try {
      await axios.put('/api/posts/', updatedPost);
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

  async function handleUpdateProfile(profileData) {
    const updatedProfileData = {
      _id: currentUserData._id,
      user: { ...profileData },
    };
    try {
      const response = await axios.put('/api/users/', updatedProfileData);
      setCurrentUserData(response.data);
    } catch (error) {
      console.log('Error:', error.message);
    }
    navigate(-1);
  }
}

const AppGrid = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: auto 1fr auto;
  justify-items: center;
`;
