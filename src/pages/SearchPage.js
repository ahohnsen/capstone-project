import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import SubHeader from '../components/SubHeader.js';
import Content from '../components/Content.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
import Searchbar from '../components/Searchbar.js';
import RequestsList from '../components/RequestsList.js';
import BuddiesList from '../components/BuddiesList.js';

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
  const { users } = useAuth();
  const [searchValue, setSearchValue] = useState('');
  const [searchCategory, setSearchCategory] = useState('destination');

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
      <Header>
        <Searchbar
          searchValue={searchValue}
          onHandleSearchValue={handleSearchValue}
        />
        <SubHeader
          searchCategory={searchCategory}
          onSwitchSearchCategory={switchSearchCategory}
        />
      </Header>
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
            searchCategory === 'destination' &&
            (notArchivedPosts?.length > 0 ? (
              <RequestsList
                posts={notArchivedPosts}
                searchValue={searchValue}
                onToggleBookmark={onToggleBookmark}
                onToggleCheckmark={onToggleCheckmark}
                onEditPost={onEditPost}
                onDeletePost={onDeletePost}
              />
            ) : (
              <Message>
                There is currently nobody looking for a dive buddy. You can add
                a post to look for a dive buddy yourself.
              </Message>
            ))}
          {!isLoading &&
            !hasError &&
            searchCategory === 'buddies' &&
            users?.length > 0 && (
              <BuddiesList users={users} searchValue={searchValue} />
            )}
        </Grid>
      </Content>
    </>
  );

  function handleSearchValue(event) {
    setSearchValue(event.target.value);
  }

  function switchSearchCategory(category) {
    setSearchCategory(category);
    setSearchValue('');
  }
}

const Header = styled.header`
  width: 100%;
  box-shadow: 0px 4px 4px var(--color-boxshadow);
  z-index: 1;
`;

const Grid = styled.div`
  display: grid;
  gap: 10px;
`;

const Message = styled.span`
  display: inline-block;
  text-align: center;
  padding: 0 15px;
`;
