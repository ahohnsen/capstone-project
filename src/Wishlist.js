import styled from 'styled-components';
import ListItem from './ListItem.js';

export default function Wishlist({ listItems }) {
  return (
    <Wrapper>
      {listItems.length > 0 ? (
        listItems.map((listItem, index) => (
          <ListItem
            key={index}
            destination={listItem.destination}
            notes={listItem.notes}
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
