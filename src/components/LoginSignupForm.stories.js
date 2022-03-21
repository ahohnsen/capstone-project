import LoginSignupForm from './LoginSignupForm';

export default {
  title: 'Component/LoginSignupForm',
  component: LoginSignupForm,
};

const Template = args => <LoginSignupForm {...args} />;

export const LoginForm = Template.bind({});
LoginForm.args = {
  status: 'login',
};

export const SignupForm = Template.bind({});
SignupForm.args = {
  status: 'signup',
};
