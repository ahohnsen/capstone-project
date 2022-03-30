import { render, screen } from '@testing-library/react';
import SubHeader from './SubHeader';

describe('SubHeader', () => {
  it('renders two buttons to switch between searching for destination or buddies', () => {
    render(<SubHeader />);

    const buttons = screen.getAllByRole('button');

    expect(buttons).toHaveLength(2);
  });
});
