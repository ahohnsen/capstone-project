import IconButton from './IconButton';

export default {
  title: 'Component/IconButton',
  component: IconButton,
};

const Template = args => <IconButton></IconButton>;

export const Default = Template.bind({});
Default.args = { children: 'Icon' };
