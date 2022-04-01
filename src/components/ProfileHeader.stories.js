import ProfileHeader from './ProfileHeader';

export default {
  title: 'Component/ProfileHeader',
  component: ProfileHeader,
};

const Template = args => (
  <div style={{ width: '500px' }}>
    <ProfileHeader {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {};
