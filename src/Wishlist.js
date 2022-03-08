import styled from 'styled-components';
import { nanoid } from 'nanoid';
import DiveWish from './DiveWish.js';

export default function Wishlist({ diveWishes }) {
  return (
    <Wrapper>
      {diveWishes.length > 0 ? (
        diveWishes.map(wish => (
          <DiveWish
            key={nanoid()}
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

const Wrapper = styled.section`
  display: grid;
  gap: 15px;
`;

const Message = styled.p`
  text-align: center;
`;
