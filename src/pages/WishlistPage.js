import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.js';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import DiveWish from '../components/DiveWish.js';
import IconButton from '../components/IconButton.js';
import ArrowForward from '../images/ArrowForward.svg';
import LogoutIcon from '../images/LogoutIcon.svg';

export default function WishlistPage({
  posts,
  isLoading,
  hasError,
  onToggleBookmark,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  const { logout } = useAuth();
  const [logoutError, setLogoutError] = useState('');
  const navigate = useNavigate();

  const notArchivedPosts = posts.filter(post => post.isArchived === false);

  const archivedPosts = posts.filter(post => post.isArchived === true);

  return (
    <>
      <Header>
        Diving Wishlist
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
            (notArchivedPosts.length > 0 ? (
              notArchivedPosts
                .reverse()
                .map(post => (
                  <DiveWish
                    key={post._id}
                    destination={post.destination}
                    notes={post.notes}
                    isBookmarked={post.isBookmarked}
                    isArchived={post.isArchived}
                    onToggleBookmark={() => onToggleBookmark(post._id)}
                    onToggleCheckmark={() => onToggleCheckmark(post._id)}
                    onEditPost={() => onEditPost(post)}
                    onDeletePost={() => onDeletePost(post._id)}
                  />
                ))
            ) : (
              <Message>
                You currently have nothing on your wishlist. Start by adding
                some destinations you would like to dive.
              </Message>
            ))}
          {!isLoading && !hasError && archivedPosts.length > 0 && (
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
  padding: 5px 10px;
  top: 11px;
  right: 0;
`;

const LogoutButton = styled(IconButton)`
  padding: 5px 10px;
  top: 0;
  right: 0;
`;
