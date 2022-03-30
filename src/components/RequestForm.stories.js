import RequestForm from './RequestForm';

export default {
  title: 'Component/RequestForm',
  component: RequestForm,
};

const Template = args => <RequestForm {...args} />;

export const AddRequestForm = Template.bind({});
AddRequestForm.args = {
  formName: 'Add a request for a buddy',
  buttonName: 'POST',
  preloadedValues: null,
};

export const EditRequestForm = Template.bind({});
EditRequestForm.args = {
  formName: 'Edit your post',
  buttonName: 'SAVE CHANGES',
  preloadedValues: {
    destination: 'Maldives',
    description: 'It was so beautiful. Cannot wait to go again!',
    startDate: '2022-03-28T00:00:00.000+00:00',
    endDate: '2022-04-09T00:00:00.000+00:00',
  },
};
