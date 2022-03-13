import { render, screen } from '@testing-library/react';
import Header from './Header';

describe('Header', () => {
  it('renders header with a level-1 heading', () => {
    render(<Header children={'Diving Wishlist'} />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toBeInTheDocument();
  });
});
