import AddListItem from './AddListItem';

export default {
  title: 'Component/AddListItem',
  component: AddListItem,
};

const Template = args => <AddListItem {...args} />;

export const Default = Template.bind({});
Default.args = {};
