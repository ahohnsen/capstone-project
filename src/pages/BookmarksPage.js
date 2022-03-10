import styled from 'styled-components';
import DiveWish from '../DiveWish.js';
import DeleteDialog from '../DeleteDialog.js';

export default function BookmarksPage({
  bookmarkedWishes,
  toggleBookmark,
  confirmDeleteWish,
  cancelDeleteWish,
  isDialogVisible,
  showDeleteDialog,
}) {
  return (
    <Wrapper>
      {bookmarkedWishes.length > 0 ? (
        bookmarkedWishes.map(wish => (
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
          You currently have nothing bookmarked. Start by marking your favorite
          dive destinations.
        </Message>
      )}
      {isDialogVisible && (
        <DeleteDialog
          confirmDeleteWish={confirmDeleteWish}
          cancelDeleteWish={cancelDeleteWish}
        />
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
