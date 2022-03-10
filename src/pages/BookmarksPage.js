import styled from 'styled-components';
import DiveWish from '../DiveWish.js';

export default function BookmarksPage({
  bookmarkedWishes,
  onToggleBookmark,
  onDeleteDiveWish,
}) {
  return (
    <>
      <header>
        <h1>Your favorites</h1>
      </header>
      <main>
        <Wrapper>
          {bookmarkedWishes.length > 0 ? (
            bookmarkedWishes.map(wish => (
              <DiveWish
                key={wish.id}
                id={wish.id}
                destination={wish.destination}
                notes={wish.notes}
                isBookmarked={wish.isBookmarked}
                onToggleBookmark={() => onToggleBookmark(wish.id)}
                onDeleteDiveWish={onDeleteDiveWish}
              />
            ))
          ) : (
            <Message>
              You currently have nothing bookmarked. Start by marking your
              favorite dive destinations.
            </Message>
          )}
        </Wrapper>
      </main>
    </>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
`;

const Message = styled.p`
  text-align: center;
  padding: 0 15px;
`;
