import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';
import IconButton from '../components/IconButton.js';
import ArrowBack from '../images/ArrowBack.svg';

export default function ArchivePage({
  archivedPosts,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <img src={ArrowBack} alt="go back to wishlist" />
        </BackButton>
        Archive
      </Header>
      <Content>
        <Grid>
          {archivedPosts.length > 0 &&
            archivedPosts.map(post => (
              <DiveWish
                key={post._id}
                destination={post.destination}
                notes={post.notes}
                isBookmarked={post.isBookmarked}
                isArchived={post.isArchived}
                onToggleCheckmark={() => onToggleCheckmark(post._id)}
                onEditPost={() => onEditPost(post)}
                onDeletePost={() => onDeletePost(post._id)}
              />
            ))}
        </Grid>
      </Content>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const BackButton = styled(IconButton)`
  padding: 5px 10px;
  top: 2px;
  left: 5px;
`;
