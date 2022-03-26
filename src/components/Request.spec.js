import { render, screen } from '@testing-library/react';
import { AuthProvider } from '../contexts/AuthContext.js';
import { MemoryRouter } from 'react-router-dom';
import { userEvent } from '@storybook/testing-library';
import Request from './Request';

jest.mock('firebase/compat/auth');
jest.mock('firebase/compat/app', () => ({
  initializeApp: jest.fn().mockReturnValue({
    auth: jest.fn().mockReturnValue({
      onAuthStateChanged: jest.fn().mockImplementation(callback => callback()),
    }),
  }),
}));

describe('Request', () => {
  const author = { fullname: 'John Doe', _id: 'john@doe.com' };

  it('renders a post with the name of the author, date the post was created, a destination, description and travel start and end dates as well as a bookmark and email icon', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Request
            destination="Maldives"
            description="I want to go there for my next diving holiday"
            author={{ ...author }}
            startDate="2022-03-23T00:00:00.000Z"
            endDate="2022-03-29T00:00:00.000Z"
            createdDate="2022-02-02T00:00:00.000Z"
          />
        </AuthProvider>
      </MemoryRouter>
    );

    const nameAuthor = screen.getByText('John Doe');
    const createdDate = screen.getByText(/Feb 2, 2022/);
    const destination = screen.getByText('Maldives');
    const description = screen.getByText(
      'I want to go there for my next diving holiday'
    );
    const startDate = screen.getByText(/Mar 23, 2022/);
    const endDate = screen.getByText(/Mar 29, 2022/);
    const buttonBookmark = screen.getByRole('button', {
      name: 'not bookmarked',
    });
    const buttonEmail = screen.getByRole('img', { name: 'send email' });

    expect(nameAuthor).toBeInTheDocument();
    expect(createdDate).toBeInTheDocument();
    expect(destination).toBeInTheDocument();
    expect(description).toBeInTheDocument();
    expect(startDate).toBeInTheDocument();
    expect(endDate).toBeInTheDocument();
    expect(buttonBookmark).toBeInTheDocument();
    expect(buttonEmail).toBeInTheDocument();
  });

  it('calls the function to toggle the bookmark when the bookmark button is clicked', () => {
    const toggleBookmark = jest.fn();
    render(
      <MemoryRouter>
        <AuthProvider>
          <Request onToggleBookmark={toggleBookmark} author={{ ...author }} />
        </AuthProvider>
      </MemoryRouter>
    );

    const buttonBookmark = screen.getByRole('button', { name: /bookmark/i });
    userEvent.click(buttonBookmark);

    expect(toggleBookmark).toHaveBeenCalled();
  });
});
