import styled from 'styled-components';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';

export default function WishlistPage({
  diveWishes,
  onToggleBookmark,
  onEditDiveWish,
  onDeleteDiveWish,
}) {
  return (
    <>
      <Header>Diving Wishlist</Header>
      <Content>
        <Grid>
          {diveWishes.length > 0 ? (
            diveWishes.map(wish => (
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
              You currently have nothing on your wishlist. Start by adding some
              destinations you would like to dive.
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
