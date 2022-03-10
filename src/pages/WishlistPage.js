import styled from 'styled-components';
import DiveWish from '../DiveWish.js';
import DeleteDialog from '../DeleteDialog.js';

export default function WishlistPage({
  diveWishes,
  toggleBookmark,
  confirmDeleteWish,
  cancelDeleteWish,
  isDialogVisible,
  showDeleteDialog,
}) {
  return (
    <>
      <header>
        <h1>Diving Wishlist</h1>
      </header>
      <main>
        <Wrapper>
          {diveWishes.length > 0 ? (
            diveWishes.map(wish => (
              <DiveWish
                key={wish.id}
                destination={wish.destination}
                notes={wish.notes}
                isBookmarked={wish.isBookmarked}
                toggleBookmark={() => toggleBookmark(wish.id)}
                showDeleteDialog={() => showDeleteDialog(wish.id)}
              />
            ))
          ) : (
            <Message>
              You currently have nothing on your wishlist. Start by adding some
              destinations you would like to dive.
            </Message>
          )}
          {isDialogVisible && (
            <DeleteDialog
              confirmDeleteWish={confirmDeleteWish}
              cancelDeleteWish={cancelDeleteWish}
            />
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
