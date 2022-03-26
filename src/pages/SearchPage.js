import styled from 'styled-components';
import { useEffect } from 'react';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Request from '../components/Request.js';

export default function SearchPage({
  sortedPosts,
  onGetPosts,
  isLoading,
  setIsLoading,
  hasError,
  onToggleBookmark,
  onToggleCheckmark,
  onEditPost,
  onDeletePost,
}) {
  const notArchivedPosts = sortedPosts?.filter(
    post => post.isArchived === false
  );

  useEffect(() => {
    setIsLoading(true);
    onGetPosts().then(() => setIsLoading(false));

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Header>Find a dive buddy</Header>
      <Content>
        {isLoading && <LoadingSpinner />}
        {hasError && (
          <Message>
            Unfortunately, something went wrong. Please refresh this page.
          </Message>
        )}
        <Grid>
          {!isLoading &&
            !hasError &&
            notArchivedPosts?.length > 0 &&
            notArchivedPosts.map(post => (
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
            ))}
          {!isLoading && !hasError && notArchivedPosts?.length === 0 && (
            <Message>
              There is currently nobody looking for a dive buddy. You can add a
              post to look for a dive buddy yourself.
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
  display: inline-block;
  text-align: center;
  padding: 0 15px;
`;
