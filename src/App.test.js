import { render, screen } from '@testing-library/react';
import App from './App';

test('renders app header', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/Cable Creative Roleplay/i);
  expect(titleElements.length).toBeGreaterThan(0);
});

test('sets proper tab title for home page', () => {
  render(<App />);
  expect(document.title).toBe('Home | Cable Creative Roleplay');
});
