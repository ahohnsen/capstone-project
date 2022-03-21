import styled from 'styled-components';
import { useState } from 'react';
import DeleteDialog from './DeleteDialog.js';
import IconButton from './IconButton.js';
import DeleteIcon from '../images/DeleteIcon.svg';
import EditIcon from '../images/EditIcon.svg';
import CheckActiveIcon from '../images/CheckActive.svg';
import CheckInactiveIcon from '../images/CheckInactive.svg';
import BookmarkIconInactive from '../images/BookmarkInactive.svg';
import BookmarkIconActive from '../images/BookmarkActive.svg';

export default function DiveWish({
  destination,
  notes,
  isBookmarked,
  isArchived,
  onToggleBookmark,
  onToggleCheckmark,
  onDeletePost,
  onEditPost,
}) {
  const [showDialog, setShowDialog] = useState(false);

  return (
    <Wrapper>
      <Heading>{destination}</Heading>
      <Notes>{notes}</Notes>
      {!isArchived && (
        <Bookmark onClick={onToggleBookmark}>
          {isBookmarked ? (
            <img src={BookmarkIconActive} alt="is bookmarked" />
          ) : (
            <img src={BookmarkIconInactive} alt="not bookmarked" />
          )}
        </Bookmark>
      )}
      <CheckButton onClick={onToggleCheckmark}>
        {isArchived ? (
          <img src={CheckActiveIcon} alt="is archived" />
        ) : (
          <img src={CheckInactiveIcon} alt="not archived" />
        )}
      </CheckButton>
      <EditButton onClick={onEditPost}>
        <img src={EditIcon} alt="edit" />
      </EditButton>
      <DeleteButton onClick={() => setShowDialog(true)}>
        <img src={DeleteIcon} alt="delete" />
      </DeleteButton>
      {showDialog && (
        <DeleteDialog
          onConfirmDeleteWish={handleDelete}
          onCancelDeleteWish={() => setShowDialog(false)}
        />
      )}
    </Wrapper>
  );

  function handleDelete() {
    setShowDialog(false);
    onDeletePost();
  }
}

const Wrapper = styled.section`
  position: relative;
  background-color: var(--bg-color-section);
  padding: 10px 15px;
`;

const Heading = styled.h2`
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--font-color-heading);
`;

const Notes = styled.p`
  padding: 10px 0 40px 0;
  color: var(--font-color-content);
`;

const CheckButton = styled(IconButton)`
  right: 70px;
  bottom: 0px;
`;

const EditButton = styled(IconButton)`
  right: 40px;
  bottom: 0px;
`;

const DeleteButton = styled(IconButton)`
  right: 10px;
  bottom: 0px;
`;

const Bookmark = styled(IconButton)`
  top: -5px;
  right: -5px;
`;
