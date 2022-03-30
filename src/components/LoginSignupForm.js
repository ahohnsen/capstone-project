import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.js';
import { useForm } from 'react-hook-form';
import { DefaultButton } from './Button.js';

export default function LoginSignupForm({ status }) {
  const { login, signup, error, isButtonDeactivated } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  return (
    <>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {status === 'signup' && errors.password && (
        <ErrorMessage>{errors.password.message}</ErrorMessage>
      )}
      <Form
        onSubmit={handleSubmit(data => {
          status === 'signup' ? signup(data) : login(data);
        })}
      >
        {status === 'signup' && (
          <Label>
            FULL NAME
            <Input type="text" {...register('fullname', { required: true })} />
          </Label>
        )}
        <Label>
          E-MAIL
          <Input type="email" {...register('email', { required: true })} />
        </Label>
        <Label>
          PASSWORD
          <Input
            type="password"
            {...register('password', {
              required: true,
              minLength: {
                value: 6,
                message: 'The password needs to be at least 6 characters long.',
              },
            })}
          />
        </Label>
        {status === 'signup' && (
          <Label>
            PASSWORD CONFIRMATION
            <Input
              type="password"
              {...register('passwordConfirmation', { required: true })}
            />
          </Label>
        )}
        <SubmitButton disabled={isButtonDeactivated}>
          {status === 'signup' ? 'SIGN UP' : 'LOGIN'}
        </SubmitButton>
        {status === 'signup' ? (
          <StyledText>
            Already have an account?
            <StyledLink to="/login"> Log in.</StyledLink>
          </StyledText>
        ) : (
          <>
            <StyledText>
              Need an account?
              <StyledLink to="/signup"> Create one.</StyledLink>
            </StyledText>
            <StyledLink to="/forgot-password">Forgot password?</StyledLink>
          </>
        )}
      </Form>
    </>
  );
}

const Form = styled.form`
  display: grid;
  gap: 4px;
  width: 80%;
  padding: 15px;
  background-color: var(--bg-color-form);
  box-shadow: 2px 2px 4px var(--bg-color-boxshadow);
  border-radius: 4px;
`;

const Label = styled.label`
  color: var(--font-color-action);
  font-weight: 400;
`;

const Input = styled.input`
  width: 100%;
  padding: 7px;
  border: 0;
  border-radius: 4px;
`;

const SubmitButton = styled(DefaultButton)`
  width: 100%;
  margin-top: 10px;
`;

const StyledLink = styled(Link)`
  color: var(--font-color-action);
  text-align: center;
`;

const StyledText = styled.span`
  color: var(--font-color-action);
  text-align: center;
`;

const ErrorMessage = styled.div`
  padding: 4px;
  width: 80%;
  background-color: rgba(255, 255, 255, 70%);
  color: red;
  font-size: 1rem;
  font-weight: 500;
  text-align: center;
  border-radius: 4px;
`;
