import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BuddiesList from './BuddiesList';

describe('BuddiesList', () => {
  it('renders two users with avatar, fullname, and a button to go to the users profile', () => {
    render(
      <MemoryRouter>
        <BuddiesList
          users={[
            { fullname: 'John Doe', userId: '1' },
            { fullname: 'Jane Doe', userId: '2' },
          ]}
          searchValue=""
        />
      </MemoryRouter>
    );

    const userNames = screen.getAllByText(/Doe/i);
    const userAvatars = screen.getAllByTestId('user avatar');
    const buttons = screen.getAllByRole('button');

    expect(userNames).toHaveLength(2);
    expect(userAvatars).toHaveLength(2);
    expect(buttons).toHaveLength(2);
  });
});
