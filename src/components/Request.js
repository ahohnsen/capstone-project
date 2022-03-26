import styled from 'styled-components';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.js';
import DeleteDialog from './DeleteDialog.js';
import IconButton from './IconButton.js';
import DeleteIcon from '../images/DeleteIcon.svg';
import EditIcon from '../images/EditIcon.svg';
import EmailIcon from '../images/Email.svg';
import CalendarIcon from '../images/Calendar.svg';
import LocationIcon from '../images/Location.svg';
import CheckActiveIcon from '../images/CheckActive.svg';
import CheckInactiveIcon from '../images/CheckInactive.svg';
import BookmarkIconInactive from '../images/BookmarkInactive.svg';
import BookmarkIconActive from '../images/BookmarkActive.svg';

export default function Request({
  createdDate,
  startDate,
  endDate,
  destination,
  description,
  isBookmarked,
  isArchived,
  author,
  onToggleBookmark,
  onToggleCheckmark,
  onDeletePost,
  onEditPost,
}) {
  const { currentUserData } = useAuth();
  const [showDialog, setShowDialog] = useState(false);

  const formatedDate = formatDate(createdDate);
  const formatedTime = new Date(createdDate).toLocaleTimeString('en-us', {
    hour: 'numeric',
    minute: 'numeric',
  });
  const travelStartDate = formatDate(startDate);
  const travelEndDate = formatDate(endDate);

  return (
    <Container>
      <Header>
        <TextWrapper>
          <Name>{author.fullname}</Name>
          <Text>
            {formatedDate} at {formatedTime}
          </Text>
        </TextWrapper>
        {author._id === currentUserData?._id ? (
          <>
            <IconButton onClick={onEditPost}>
              <img src={EditIcon} alt="edit" />
            </IconButton>
            <IconButton onClick={() => setShowDialog(true)}>
              <img src={DeleteIcon} alt="delete" />
            </IconButton>
          </>
        ) : (
          <>
            <Email href={`mailto:${author._id}`}>
              <img src={EmailIcon} alt="send email" />
            </Email>
            <IconButton onClick={onToggleBookmark}>
              {isBookmarked ? (
                <img src={BookmarkIconActive} alt="is bookmarked" />
              ) : (
                <img src={BookmarkIconInactive} alt="not bookmarked" />
              )}
            </IconButton>
          </>
        )}
      </Header>

      <Description>{description}</Description>
      {author._id === currentUserData?._id && (
        <CheckButton onClick={onToggleCheckmark}>
          {isArchived ? (
            <img src={CheckActiveIcon} alt="is archived" />
          ) : (
            <img src={CheckInactiveIcon} alt="not archived" />
          )}
        </CheckButton>
      )}

      <Footer>
        <Calendar src={CalendarIcon} alt="calendar icon" />
        <Text>
          {travelStartDate} - {travelEndDate}
        </Text>
        <img src={LocationIcon} alt="location icon" />
        <Text>{destination}</Text>
      </Footer>
      {showDialog && (
        <DeleteDialog
          onConfirmDeletePost={handleDelete}
          onCancelDeletePost={() => setShowDialog(false)}
        />
      )}
    </Container>
  );

  function formatDate(date) {
    const formatedDate = new Date(date).toLocaleDateString('en-us', {
      day: 'numeric',
      year: 'numeric',
      month: 'short',
    });
    return formatedDate;
  }

  function handleDelete() {
    setShowDialog(false);
    onDeletePost();
  }
}

const Container = styled.section`
  position: relative;
  background-color: var(--bg-color-section);
  padding: 10px 15px;
`;

const Header = styled.header`
  display: grid;
  grid-template-columns: 1fr auto auto;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Name = styled.span`
  font-size: 1rem;
  font-weight: 600;
  color: var(--font-color-heading);
`;

const Text = styled.div`
  font-size: 0.9rem;
  color: var(--font-color-label);
  padding: 2px 0;
`;

const Description = styled.p`
  padding: 10px 0 40px 0;
  color: var(--font-color-content);
`;

const Footer = styled.footer`
  display: grid;
  grid-template-columns: 35px 1fr;
  grid-template-rows: 1fr 1fr;
`;

const CheckButton = styled(IconButton)`
  position: absolute;
  right: 20px;
  bottom: 5px;
`;

const Email = styled.a`
  margin: auto 3px;

  img {
    width: 30px;
    height: 30px;
  }
`;
const Calendar = styled.img`
  margin: auto 3px;
`;
