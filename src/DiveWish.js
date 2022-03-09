import styled from 'styled-components';
import DeleteIcon from './images/DeleteIcon.svg';
import BookmarkIconInactive from './images/BookmarkInactive.svg';
import BookmarkIconActive from './images/BookmarkActive.svg';

export default function DiveWish({
  destination,
  notes,
  isBookmarked,
  showDeleteDialog,
  toggleBookmark,
}) {
  return (
    <Wrapper>
      <Heading>{destination}</Heading>
      <Notes>{notes}</Notes>
      <Bookmark onClick={toggleBookmark}>
        {isBookmarked ? (
          <img src={BookmarkIconActive} alt="is bookmarked" />
        ) : (
          <img src={BookmarkIconInactive} alt="not bookmarked" />
        )}
      </Bookmark>
      <DeleteButton onClick={showDeleteDialog}>
        <img src={DeleteIcon} alt="Delete" />
      </DeleteButton>
    </Wrapper>
  );
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
