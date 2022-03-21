import styled from 'styled-components';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';

export default function BookmarksPage({
  bookmarkedPosts,
  onToggleBookmark,
  onToggleCheckmark,
  onEditDiveWish,
  onDeletePost,
}) {
  return (
    <>
      <Header>Your favorites</Header>
      <Content>
        <Grid>
          {bookmarkedPosts.length > 0 ? (
            bookmarkedPosts.map(post => (
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
              You currently have nothing bookmarked. Start by marking your
              favorite dive destinations.
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

const Message = styled.p`
  text-align: center;
  padding: 0 15px;
`;
