import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';
import LoginContainer from './LoginContainer';

describe('LoginContainer', () => {
  const dispatch = jest.fn();

  beforeEach(() => {
    dispatch.mockClear();
  });

  context('with accessToken', () => {
    it('renders Log out button', () => {
      useSelector.mockImplementation((selector) => selector({
        accessToken: 'token',
      }));

      render(<LoginContainer />);

      expect(screen.getByRole('button', { name: 'Log out' })).toBeInTheDocument();
    });
  });

  context('without accessToken', () => {
    it('renders Log in button', () => {
      useSelector.mockImplementation((selector) => selector({
        email: '', password: '',
      }));

      render(<LoginContainer />);

      expect(screen.getByRole('button', { name: 'Log In' })).toBeInTheDocument();
    });
  });

  context('when change fields', () => {
    beforeEach(() => {
      useDispatch.mockImplementation(() => dispatch);
      useSelector.mockImplementation((selector) => selector({
        email: '', password: '',
      }));
    });

    it('calls action setEmail', () => {
      render(<LoginContainer />);

      fireEvent.change(
        screen.getByPlaceholderText('EMAIL'),
        { target: { value: 'test@test.com' } },
      );

      expect(dispatch).toBeCalled();
    });

    it('calls action setPassword', () => {
      render(<LoginContainer />);

      fireEvent.change(
        screen.getByPlaceholderText('PASSWORD'),
        { target: { value: 'password' } },
      );

      expect(dispatch).toBeCalled();
    });
  });

  context('when click button', () => {
    beforeEach(() => {
      useDispatch.mockImplementation(() => dispatch);
    });

    it('calls action setUser', () => {
      useSelector.mockImplementation((selector) => selector({
        email: 'email', password: 'password',
      }));

      render(<LoginContainer />);

      fireEvent.click(screen.getByRole('button'));

      expect(dispatch).toBeCalled();
    });

    it('calls action deleteAccessToken', () => {
      useSelector.mockImplementation((selector) => selector({
        accessToken: 'token',
      }));

      render(<LoginContainer />);

      fireEvent.click(screen.getByRole('button'));

      expect(dispatch).toBeCalled();
    });
  });
});