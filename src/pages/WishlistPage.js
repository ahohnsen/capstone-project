import styled from 'styled-components';
import Heading from '../Heading.js';
import Content from '../Content.js';
import DiveWish from '../DiveWish.js';

export default function WishlistPage({
  diveWishes,
  onToggleBookmark,
  onDeleteDiveWish,
}) {
  return (
    <>
      <Heading>Diving Wishlist</Heading>
      <Grid>
        {diveWishes.length > 0 ? (
          diveWishes.map(wish => (
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
            You currently have nothing on your wishlist. Start by adding some
            destinations you would like to dive.
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
