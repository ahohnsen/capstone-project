import styled from 'styled-components';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';
import IconButton from '../components/IconButton.js';
import ArrowForward from '../images/ArrowForward.svg';
import { useNavigate } from 'react-router';

export default function WishlistPage({
  diveWishes,
  onToggleBookmark,
  onToggleCheckmark,
  onEditDiveWish,
  onDeleteDiveWish,
}) {
  const navigate = useNavigate();
  const notArchivedWishes = diveWishes.filter(
    diveWish => diveWish.isArchived === false
  );

  const archivedWishes = diveWishes.filter(
    diveWish => diveWish.isArchived === true
  );

  return (
    <>
      <Header>Diving Wishlist</Header>
      <Content>
        <Grid>
          {notArchivedWishes.length > 0 ? (
            notArchivedWishes.map(wish => (
              <DiveWish
                key={wish.id}
                destination={wish.destination}
                notes={wish.notes}
                isBookmarked={wish.isBookmarked}
                isArchived={wish.isArchived}
                onToggleBookmark={() => onToggleBookmark(wish.id)}
                onToggleCheckmark={() => onToggleCheckmark(wish.id)}
                onEditDiveWish={() => onEditDiveWish(wish)}
                onDeleteDiveWish={() => onDeleteDiveWish(wish.id)}
              />
            ))
          ) : (
            <Message>
              You currently have nothing on your wishlist. Start by adding some
              destinations you would like to dive.
            </Message>
          )}
          {archivedWishes.length > 0 && (
            <Container>
              <Heading>Archive</Heading>
              <ArrowIcon onClick={() => navigate('/archive')}>
                <img src={ArrowForward} alt="go to archive" />
              </ArrowIcon>
            </Container>
          )}
        </Grid>
      </Content>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const Message = styled.p`
  text-align: center;
  padding: 0 15px;
`;

const Container = styled.div`
  position: relative;
  padding: 15px 15px;
  margin-top: 20px;
  background-color: var(--bg-color-section);
`;

const Heading = styled.h2`
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--font-color-heading);
`;

const ArrowIcon = styled(IconButton)`
  padding: 5px 10px;
  top: 11px;
  right: 0px;
`;
