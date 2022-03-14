import Header from '../Header.js';
import Content from '../Content.js';
import DiveWishForm from '../DiveWishForm.js';

export default function AddWishPage({ onAddDiveWish }) {
  return (
    <>
      <Header>Where do you want to dive?</Header>
      <Content>
        <DiveWishForm
          formName={'Add a new dive destination to your wishlist'}
          buttonName={'Add to list'}
          handleDiveWish={onAddDiveWish}
        />
      </Content>
    </>
  );
}
