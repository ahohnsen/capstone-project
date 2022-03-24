import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import Request from '../components/Request.js';
import IconButton from '../components/IconButton.js';
import ArrowBack from '../images/ArrowBack.svg';

export default function ArchivePage({
  archivedPosts,
  currentUserData,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <img src={ArrowBack} alt="go back to search page" />
        </BackButton>
        Archive
      </Header>
      <Content>
        <Grid>
          {archivedPosts?.length > 0 &&
            archivedPosts.map(post => (
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
  position: absolute;
  padding: 5px 10px;
  top: 2px;
  left: 5px;
`;
