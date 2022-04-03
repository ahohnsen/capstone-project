import { render, screen } from '@testing-library/react';
import ProfileHeader from './ProfileHeader';

describe('ProfileHeader', () => {
  it('renders a header with a background image', () => {
    render(<ProfileHeader />);

    const header = screen.getByTestId('1');
    const backgroundImage = screen.getByTestId('2');

    expect(header).toBeInTheDocument();
    expect(backgroundImage).toBeInTheDocument();
  });
});
