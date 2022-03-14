import styled from 'styled-components';
import { useNavigate } from 'react-router';
import Header from '../Header.js';
import Content from '../Content.js';
import DiveWishForm from '../DiveWishForm.js';
import IconButton from '../IconButton.js';
import AbortIcon from '../images/Abort.svg';

export default function EditWishPage({ onEditDiveWish, diveWishToEdit }) {
  const navigate = useNavigate();

  return (
    <>
      <Header>
        <AbortButton onClick={() => navigate('/')}>
          <img src={AbortIcon} alt="abort editing" />
        </AbortButton>
        Edit dive destination
      </Header>
      <Content>
        <DiveWishForm
          formName={'Edit your dive wish'}
          buttonName={'Save changes'}
          handleDiveWish={onEditDiveWish}
          preloadedValues={diveWishToEdit}
        />
      </Content>
    </>
  );
}

const AbortButton = styled(IconButton)`
  top: 10px;
  left: 20px;
  z-index: 2;
`;
