import styled from 'styled-components';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import RequestsList from '../components/RequestsList.js';

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
            <RequestsList
              posts={bookmarkedPosts}
              searchValue={''}
              onToggleBookmark={onToggleBookmark}
              onToggleCheckmark={onToggleCheckmark}
              onEditPost={onEditPost}
              onDeletePost={onDeletePost}
            />
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
  padding: 0 15px;
  text-align: center;
`;
