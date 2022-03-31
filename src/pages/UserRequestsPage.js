import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import Request from '../components/Request.js';
import { IconButton } from '../components/Button.js';
import ArrowBack from '../images/ArrowBack.svg';

export default function UserRequestsPage({
  sortedPosts,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  const navigate = useNavigate();
  const { uid } = useParams();

  const userPostsNotArchived = sortedPosts?.filter(
    post => post.author.userId === uid && post.isArchived === false
  );
  const userPostsArchived = sortedPosts?.filter(
    post => post.author.userId === uid && post.isArchived === true
  );

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate(-1)}>
          <img src={ArrowBack} alt="go back to search page" />
        </BackButton>
        Posts
      </Header>
      <Content>
        <Grid>
          {userPostsNotArchived?.length > 0 && <Heading>CURRENT POSTS</Heading>}
          {userPostsNotArchived?.length > 0 &&
            userPostsNotArchived.map(post => (
              <Request
                key={post._id}
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
          {userPostsArchived?.length > 0 && <Heading>ARCHIVED POSTS</Heading>}
          {userPostsArchived?.length > 0 &&
            userPostsArchived.map(post => (
              <Request
                key={post._id}
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
          {userPostsArchived.length === 0 &&
            userPostsNotArchived.length === 0 &&
            navigate(`/profile/${uid}`)}
        </Grid>
      </Content>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const Heading = styled.h2`
  padding: 0 10px;
  font-size: 1.1rem;
  font-weight: 500;
`;

const BackButton = styled(IconButton)`
  padding: 10px;
  position: absolute;
  top: 5px;
  left: 5px;
`;
