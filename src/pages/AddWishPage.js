import Header from '../components/Header.js';
import Content from '../components/Content.js';
import RequestForm from '../components/RequestForm.js';

export default function AddWishPage({ onAddPost }) {
  return (
    <>
      <Header>Where do you want to dive?</Header>
      <Content>
        <RequestForm
          formName={'Add a new dive destination to your wishlist'}
          buttonName={'Add to list'}
          handlePost={onAddPost}
        />
      </Content>
    </>
  );
}
