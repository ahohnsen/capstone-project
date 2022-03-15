import Button from './Button';

export default {
  title: 'Component/Button',
  component: Button,
};

const Template = args => <Button {...args} />;

export const ButtonDefault = Template.bind({});
ButtonDefault.args = { children: 'POST' };
