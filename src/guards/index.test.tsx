import React from 'react';
import { render, screen } from '@testing-library/react';
import Guard from './index';
import useAuthStore from 'stores/auth.store';
import { BrowserRouter, Redirect } from 'react-router-dom';
import { RoutesString } from 'routes/routesString';

// jest.mock('stores/auth.store');

test('renders guard children', () => {
  render(<Guard>test</Guard>);
  const linkElement = screen.getByText(/test/i);
  expect(linkElement).toBeInTheDocument();
});

// const mocUseAuth = useAuthStore;

test('should redirect to access denied page when do not have permission', () => {
  useAuthStore.setState({
    tokens: {
      accessToken: 'test',
      refreshToken: 'test',
    },
  });
  render(
    <BrowserRouter>
      <Guard>test</Guard>
    </BrowserRouter>
  );
  expect(global.window.location.pathname).toEqual(RoutesString.AccessDenied);
  const { logoutAction } = useAuthStore.getState();
  logoutAction();
  expect(useAuthStore.getState().tokens.accessToken).toBeFalsy();
});
