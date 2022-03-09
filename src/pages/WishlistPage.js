import styled from 'styled-components';
import DiveWish from '../DiveWish.js';

export default function WishlistPage({ diveWishes }) {
  return (
    <Wrapper>
      {diveWishes.length > 0 ? (
        diveWishes.map(wish => (
          <DiveWish
            key={wish.id}
            destination={wish.destination}
            notes={wish.notes}
          />
        ))
      ) : (
        <Message>
          You currently have nothing on your wishlist. Start by adding some
          destinations you would like to dive.
        </Message>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: grid;
  gap: 15px;
`;

const Message = styled.p`
  text-align: center;
`;
