import { render, screen } from '@testing-library/react';
import App from './App';

test('renders form heading', () => {
  render(<App />);
  const heading = screen.getByText(/User Form/i);
  expect(heading).toBeInTheDocument();
});
