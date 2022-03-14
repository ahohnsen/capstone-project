import EditWishPage from './EditWishPage';

export default {
  title: 'Pages/EditWishPage',
  component: EditWishPage,
};

const Template = args => <EditWishPage {...args} />;

export const Default = Template.bind({});
Default.args = {
  diveWishToEdit: {
    destination: 'Maldives',
    notes: 'It was so beautiful. Cannot wait to go again!',
  },
};
