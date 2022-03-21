import styled from 'styled-components';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../contexts/AuthContext.js';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';
import IconButton from '../components/IconButton.js';
import ArrowForward from '../images/ArrowForward.svg';
import LogoutIcon from '../images/LogoutIcon.svg';

export default function WishlistPage({
  posts,
  onToggleBookmark,
  onToggleCheckmark,
  onEditDiveWish,
  onDeletePost,
}) {
  const { logout } = useAuth();
  const [error, setError] = useState('');
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
        {error && <p>{error}</p>}
        <Grid>
          {notArchivedPosts.length > 0 ? (
            notArchivedPosts.map(post => (
              <DiveWish
                key={post._id}
                destination={post.destination}
                notes={post.notes}
                isBookmarked={post.isBookmarked}
                isArchived={post.isArchived}
                onToggleBookmark={() => onToggleBookmark(post._id)}
                onToggleCheckmark={() => onToggleCheckmark(post._id)}
                onEditDiveWish={() => onEditDiveWish(post)}
                onDeletePost={() => onDeletePost(post._id)}
              />
            ))
          ) : (
            <Message>
              You currently have nothing on your wishlist. Start by adding some
              destinations you would like to dive.
            </Message>
          )}
          {archivedPosts.length > 0 && (
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
    setError('');

    try {
      await logout();
      navigate('/login');
    } catch {
      setError('Failed to log out');
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
  right: 0px;
`;

const LogoutButton = styled(IconButton)`
  padding: 5px 10px;
  top: 0px;
  right: -10px;
`;
