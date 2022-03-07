import styled from 'styled-components';
import ListItem from './ListItem.js';

export default function Wishlist({ listItems }) {
  return (
    <Wrapper>
      {listItems.length > 0
        ? listItems.map((listItem, index) => (
            <ListItem
              key={index}
              destination={listItem.destination}
              notes={listItem.notes}
            />
          ))
        : 'You currently have nothing on your wishlist. Start by adding some destinations you would like to dive.'}
    </Wrapper>
  );
}

const Wrapper = styled.section`
  display: grid;
  gap: 15px;
  text-align: center;
`;
