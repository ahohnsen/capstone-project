import EditWishPage from './EditWishPage';

export default {
  title: 'Pages/EditWishPage',
  component: EditWishPage,
};

const Template = args => <EditWishPage {...args} />;

export const EditWishPageDefault = Template.bind({});
EditWishPageDefault.args = {
  postToEdit: {
    destination: 'Maldives',
    notes: 'It was so beautiful. Cannot wait to go again!',
  },
};
