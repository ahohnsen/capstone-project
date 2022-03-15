import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header.js';
import Content from '../components/Content.js';
import DiveWish from '../components/DiveWish.js';
import IconButton from '../components/IconButton.js';
import ArrowBack from '../images/ArrowBack.svg';

export default function ArchivePage({
  archivedWishes,
  onToggleCheckmark,
  onEditDiveWish,
  onDeleteDiveWish,
}) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <BackButton onClick={() => navigate('/')}>
          <img src={ArrowBack} alt="go back to wishlist" />
        </BackButton>
        Archive
      </Header>
      <Content>
        <Grid>
          {archivedWishes.length > 0 &&
            archivedWishes.map(wish => (
              <DiveWish
                key={wish.id}
                destination={wish.destination}
                notes={wish.notes}
                isBookmarked={wish.isBookmarked}
                isArchived={wish.isArchived}
                onToggleCheckmark={() => onToggleCheckmark(wish.id)}
                onEditDiveWish={() => onEditDiveWish(wish)}
                onDeleteDiveWish={() => onDeleteDiveWish(wish.id)}
              />
            ))}
        </Grid>
      </Content>
    </>
  );
}

const Grid = styled.div`
  display: grid;
  gap: 15px;
`;

const BackButton = styled(IconButton)`
  padding: 5px 10px;
  top: 5px;
  left: 5px;
`;
