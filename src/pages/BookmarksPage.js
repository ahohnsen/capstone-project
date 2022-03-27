import styled from 'styled-components';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import Request from '../components/Request.js';

export default function BookmarksPage({
  bookmarkedPosts,
  onToggleBookmark,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  return (
    <>
      <Header>Your favorites</Header>
      <Content>
        <Grid>
          {bookmarkedPosts?.length > 0 ? (
            bookmarkedPosts.map(post => (
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
                onToggleBookmark={() => onToggleBookmark(post._id)}
                onToggleCheckmark={() => onToggleCheckmark(post._id)}
                onEditPost={() => onEditPost(post)}
                onDeletePost={() => onDeletePost(post._id)}
              />
            ))
          ) : (
            <Message>
              You currently have nothing bookmarked. Start by marking your
              favorite posts.
            </Message>
          )}
        </Grid>
      </Content>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const Message = styled.span`
  text-align: center;
  padding: 0 15px;
`;
