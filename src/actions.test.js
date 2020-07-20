import thunk from 'redux-thunk';

import configureStore from 'redux-mock-store';

import {
  loadInitialData,
  setRegions,
  setCategories,
  loadRestaurants,
  loadRestaurant,
  requestLogin,
  sendReview,
  setAccessToken,
  setRestaurants,
  setRestaurant,
} from './actions';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('./services/api');

describe('actions', () => {
  let store;

  describe('loadInitialData', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('runs setRegions and setCategories', async () => {
      await store.dispatch(loadInitialData());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRegions([]));
      expect(actions[1]).toEqual(setCategories([]));
    });
  });

  describe('loadRestaurants', () => {
    context('with selectedRegion and selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('runs setRestaurants', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurants([]));
      });
    });

    context('without selectedRegion', () => {
      beforeEach(() => {
        store = mockStore({
          selectedCategory: { id: 1, name: '한식' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });

    context('without selectedCategory', () => {
      beforeEach(() => {
        store = mockStore({
          selectedRegion: { id: 1, name: '서울' },
        });
      });

      it('does\'nt run any actions', async () => {
        await store.dispatch(loadRestaurants());

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });

  describe('loadRestaurant', () => {
    beforeEach(() => {
      store = mockStore({});
    });

    it('dispatchs setRestaurant', async () => {
      await store.dispatch(loadRestaurant({ restaurantId: 1 }));

      const actions = store.getActions();

      expect(actions[0]).toEqual(setRestaurant(null));
      expect(actions[1]).toEqual(setRestaurant({}));
    });
  });

  describe('requestLogin', () => {
    beforeEach(() => {
      store = mockStore({
        loginFields: {
          email: 'tester@exmaple.com',
          password: 'test',
        },
      });
    });

    it('dispatchs setRestaurant', async () => {
      await store.dispatch(requestLogin());

      const actions = store.getActions();

      expect(actions[0]).toEqual(setAccessToken('TOKEN'));
    });
  });

  describe('sendReview', () => {
    context('with accessToken', () => {
      beforeEach(() => {
        store = mockStore({
          reviewFields: {
            score: '5',
            description: 'Good!',
          },
          accessToken: 'TOKEN',
        });
      });

      it('dispatchs loadRestaurant', async () => {
        await store.dispatch(sendReview({ restaurantId: 1 }));

        const actions = store.getActions();

        expect(actions[0]).toEqual(setRestaurant(null));
        expect(actions[1]).toEqual(setRestaurant({}));
      });
    });

    context('without accessToken', () => {
      beforeEach(() => {
        store = mockStore({
          reviewFields: {
            score: '5',
            description: 'Good!',
          },
        });
      });

      it('dispatchs loadRestaurant', async () => {
        await store.dispatch(sendReview({ restaurantId: 1 }));

        const actions = store.getActions();

        expect(actions).toHaveLength(0);
      });
    });
  });
});
