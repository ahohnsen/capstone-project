import RequestForm from './RequestForm';

export default {
  title: 'Component/RequestForm',
  component: RequestForm,
};

const Template = args => <RequestForm {...args} />;

export const AddRequestForm = Template.bind({});
AddRequestForm.args = {
  formName: 'Add a new dive destination to your wishlist',
  buttonName: 'Add to list',
  preloadedValues: null,
};

export const EditRequestForm = Template.bind({});
EditRequestForm.args = {
  formName: 'Edit your dive wish',
  buttonName: 'Save changes',
  preloadedValues: {
    destination: 'Maldives',
    notes: 'It was so beautiful. Cannot wait to go again!',
  },
};
