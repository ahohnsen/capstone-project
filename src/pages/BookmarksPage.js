import styled from 'styled-components';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';

export default function BookmarksPage({
  bookmarkedWishes,
  onToggleBookmark,
  onEditDiveWish,
  onDeleteDiveWish,
}) {
  return (
    <>
      <Header>Your favorites</Header>
      <Content>
        <Grid>
          {bookmarkedWishes.length > 0 ? (
            bookmarkedWishes.map(wish => (
              <DiveWish
                key={wish.id}
                destination={wish.destination}
                notes={wish.notes}
                isBookmarked={wish.isBookmarked}
                onToggleBookmark={() => onToggleBookmark(wish.id)}
                onEditDiveWish={() => onEditDiveWish(wish)}
                onDeleteDiveWish={() => onDeleteDiveWish(wish.id)}
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
