import DiveWishForm from './DiveWishForm';

export default {
  title: 'Component/DiveWishForm',
  component: DiveWishForm,
};

const Template = args => <DiveWishForm {...args} />;

export const AddWishForm = Template.bind({});
AddWishForm.args = {
  formName: 'Add a new dive destination to your wishlist',
  buttonName: 'Add to list',
  preloadedValues: null,
};

export const EditWishForm = Template.bind({});
EditWishForm.args = {
  formName: 'Edit your dive wish',
  buttonName: 'Save changes',
  preloadedValues: {
    destination: 'Maldives',
    notes: 'It was so beautiful. Cannot wait to go again!',
  },
};
