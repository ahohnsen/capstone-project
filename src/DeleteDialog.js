import styled from 'styled-components';
import Button from './Button.js';

export default function DeleteDialog({ confirmDeleteWish, cancelDeleteWish }) {
  return (
    <Dialog>
      Do you really want to delete this item from your wishlist?
      <Wrapper>
        <Button onClick={cancelDeleteWish}>Cancel</Button>
        <Button onClick={confirmDeleteWish}>Yes, delete</Button>
      </Wrapper>
    </Dialog>
  );
}

const Dialog = styled.div`
  width: 300px;
  height: 160px;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top: -80px;
  margin-left: -150px;
  padding: 20px;
  background-color: var(--bg-color-section);
  box-shadow: 2px 2px 4px var(--color-boxshadow);
  text-align: center;
`;

const Wrapper = styled.div`
  display: flex;
  gap: 15px;
  padding-top: 25px;
`;
