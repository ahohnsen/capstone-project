import styled from 'styled-components';
import Heading from '../Heading.js';
import Content from '../Content.js';
import DiveWish from '../DiveWish.js';

export default function BookmarksPage({
  bookmarkedWishes,
  onToggleBookmark,
  onDeleteDiveWish,
}) {
  return (
    <>
      <Heading>Your favorites</Heading>
      <Grid>
        {bookmarkedWishes.length > 0 ? (
          bookmarkedWishes.map(wish => (
            <DiveWish
              key={wish.id}
              destination={wish.destination}
              notes={wish.notes}
              isBookmarked={wish.isBookmarked}
              onToggleBookmark={() => onToggleBookmark(wish.id)}
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
    </>
  );
}

const Grid = styled(Content)`
  display: grid;
  gap: 15px;
`;

const Message = styled.p`
  text-align: center;
  padding: 0 15px;
`;
