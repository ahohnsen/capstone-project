import styled from 'styled-components';
import { useState } from 'react';
import DeleteIcon from './images/DeleteIcon.svg';
import DeleteDialog from './DeleteDialog.js';
import BookmarkIconInactive from './images/BookmarkInactive.svg';
import BookmarkIconActive from './images/BookmarkActive.svg';

export default function DiveWish({
  id,
  destination,
  notes,
  isBookmarked,
  onToggleBookmark,
  onDeleteDiveWish,
}) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Wrapper>
      <Heading>{destination}</Heading>
      <Notes>{notes}</Notes>
      <Bookmark onClick={onToggleBookmark}>
        {isBookmarked ? (
          <img src={BookmarkIconActive} alt="is bookmarked" />
        ) : (
          <img src={BookmarkIconInactive} alt="not bookmarked" />
        )}
      </Bookmark>
      <DeleteButton onClick={() => setShowDialog(true)}>
        <img src={DeleteIcon} alt="delete" />
      </DeleteButton>
      {showDialog && (
        <DeleteDialog
          onConfirmDeleteWish={() => handleDelete(id)}
          onCancelDeleteWish={() => setShowDialog(false)}
        />
      )}
    </Wrapper>
  );

  function handleDelete(id) {
    setShowDialog(false);
    onDeleteDiveWish(id);
  }
}

const Wrapper = styled.section`
  position: relative;
  background-color: var(--bg-color-section);
  padding: 10px 15px;
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--font-color-heading);
`;

const Notes = styled.p`
  padding: 10px 0;
  color: var(--font-color-content);
`;

const DeleteButton = styled.button`
  position: absolute;
  border: none;
  background-color: var(--bg-color-section);
  right: 15px;
  bottom: 5px;
`;

const Bookmark = styled.button`
  position: absolute;
  border: none;
  background-color: var(--bg-color-section);
  top: 0px;
  right: 0px;
`;
