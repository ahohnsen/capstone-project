import Message from './Message';

export default {
  title: 'Component/Message',
  component: Message,
};

const Template = args => <Message {...args} />;

export const Default = Template.bind({});
Default.args = { children: 'You currently have nothing bookmarked.' };
