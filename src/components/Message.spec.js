import { render, screen } from '@testing-library/react';
import Message from './Message';

describe('Message', () => {
  it('renders the message "You currently have nothing bookmarked."', () => {
    render(<Message children="You currently have nothing bookmarked." />);

    const message = screen.getByText('You currently have nothing bookmarked.');

    expect(message).toBeInTheDocument();
  });
});
