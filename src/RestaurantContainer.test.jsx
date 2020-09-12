import React from 'react';

import { render, fireEvent } from '@testing-library/react';

import { useDispatch, useSelector } from 'react-redux';

import RestaurantContainer from './RestaurantContainer';

import restaurant from '../fixtures/restaurants';

describe('RestaurantContainer', () => {
  const reviewFields = {
    score: '',
    describe: '',
  };

  const dispatch = jest.fn();

  function renderRestaurantContainer() {
    return render(<RestaurantContainer restaurantId="1" />);
  }

  beforeEach(() => {
    dispatch.mockClear();
    useDispatch.mockImplementation(() => dispatch);

    useSelector.mockImplementation((selector) => selector({
      restaurant: given.restaurant,
      reviewFields,
      accessToken: given.accessToken,
    }));
  });

  it('dispatches action', () => {
    renderRestaurantContainer();

    expect(dispatch).toBeCalled();
  });

  context('with restaurant and logged in', () => {
    given('accessToken', () => 'ACCESS_TOKEN');
    given('restaurant', () => ({
      id: 1,
      name: '마법사주방',
      address: '서울시 강남구',
    }));

    it('renders name and address', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('마법사주방');
      expect(container).toHaveTextContent('서울시');
    });

    it('renders review form', () => {
      const { getByLabelText } = renderRestaurantContainer();

      expect(getByLabelText('평점')).toHaveAttribute('type', 'number');
      expect(getByLabelText('리뷰 내용')).toHaveAttribute('type', 'text');
    });
  });

  context('without restaurant', () => {
    given('restaurant', () => null);

    it('renders loading', () => {
      const { container } = renderRestaurantContainer();

      expect(container).toHaveTextContent('Loading');
    });
  });

  context('when review input changes', () => {
    given('accessToken', () => 'ACCCES_TOKEN');
    given('restaurant', () => (restaurant));

    it('changes score, description', () => {
      const { getByLabelText } = renderRestaurantContainer();

      const controls = [
        { label: '평점', name: 'score', value: '3' },
        { label: '리뷰 내용', name: 'description', value: '맛 좋' },
      ];

      controls.forEach(({ label, name, value }) => {
        fireEvent.change(getByLabelText(label), {
          target: { value },
        });

        expect(dispatch).toBeCalledWith({
          type: 'changeReviewField',
          payload: { name, value },
        });
      });
    });
  });

  context('when logged in', () => {
    given('accessToken', () => 'ACCCES_TOKEN');
    given('restaurant', () => (restaurant));

    it('click post review button', () => {
      const { getByText } = renderRestaurantContainer();

      fireEvent.click(getByText('리뷰 남기기'));

      expect(dispatch).toBeCalledTimes(2);
    });
  });

  context('without logging in', () => {
    given('restaurant', () => (restaurant));
    given('accessToken', () => '');

    it('renders no review form', () => {
      const { container } = renderRestaurantContainer();

      expect(container).not.toHaveTextContent('평점');
      expect(container).not.toHaveTextContent('리뷰 내용');
    });
  });
});