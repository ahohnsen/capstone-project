import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.js';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Request from '../components/Request.js';
import IconButton from '../components/IconButton.js';
import ArrowForward from '../images/ArrowForward.svg';
import LogoutIcon from '../images/LogoutIcon.svg';

export default function SearchPage({
  sortedPosts,
  archivedPosts,
  currentUserData,
  onGetPosts,
  isLoading,
  setIsLoading,
  hasError,
  onToggleBookmark,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
  onLogout,
}) {
  const { logout } = useAuth();
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  const notArchivedPosts = sortedPosts?.filter(
    post => post.isArchived === false
  );

  useEffect(() => {
    setIsLoading(true);
    onGetPosts();
    setTimeout(() => setIsLoading(false), 800);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>
        Find a dive buddy
        <LogoutButton onClick={handleLogout}>
          <img src={LogoutIcon} alt="logout" />
        </LogoutButton>
      </Header>
      <Content>
        {isLoading && <LoadingSpinner />}
        {logoutError && <p>{logoutError}</p>}
        {hasError && (
          <p>Unfortunately, something went wrong. Please refresh this page.</p>
        )}
        <Grid>
          {!isLoading &&
            !hasError &&
            notArchivedPosts?.length > 0 &&
            notArchivedPosts.map(post => (
              <Request
                key={post._id}
                currentUserData={currentUserData}
                createdDate={post.createdAt}
                startDate={post.startDate}
                endDate={post.endDate}
                destination={post.destination}
                description={post.description}
                isBookmarked={post.isBookmarked}
                isArchived={post.isArchived}
                author={post.author}
                onToggleBookmark={() => onToggleBookmark(post._id)}
                onToggleCheckmark={() => onToggleCheckmark(post._id)}
                onEditPost={() => onEditPost(post)}
                onDeletePost={() => onDeletePost(post._id)}
              />
            ))}
          {!isLoading && !hasError && notArchivedPosts?.length === 0 && (
            <Message>
              There is currently nobody looking for a dive buddy. You can add a
              post to look for a dive buddy yourself.
            </Message>
          )}
          {!isLoading && !hasError && archivedPosts?.length > 0 && (
            <Container>
              <Heading>Archive</Heading>
              <ArrowButton onClick={() => navigate('/archive')}>
                <img src={ArrowForward} alt="go to archive" />
              </ArrowButton>
            </Container>
          )}
        </Grid>
      </Content>
    </>
  );

  async function handleLogout() {
    setLogoutError('');

    try {
      await logout();
      onLogout();
      navigate('/login');
    } catch {
      setLogoutError('Failed to log out');
    }
  }
}

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const Message = styled.p`
  text-align: center;
  padding: 0 15px;
`;

const Container = styled.div`
  position: relative;
  padding: 15px 15px;
  margin-top: 20px;
  background-color: var(--bg-color-section);
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--font-color-heading);
`;

const ArrowButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 11px;
  right: 0;
`;

const LogoutButton = styled(IconButton)`
  position: absolute;
  padding: 5px 10px;
  top: 0;
  right: 0;
`;