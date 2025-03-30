import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

describe('App Component', () => {
  it('renders without crashing', () => {
    render(<App />);
    // Test passes if render doesn't throw
  });
});