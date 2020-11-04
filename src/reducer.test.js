import reducer from './reducer';

import {
  logout,
  setRegions,
  setCategories,
  setRestaurants,
  setRestaurant,
  selectRegion,
  selectCategory,
  setAccessToken,
  changeLoginFields,
  changeReviewField,
} from './actions';

describe('reducer', () => {
  context('when previous state is undefined', () => {
    const initialState = {
      regions: [],
      categories: [],
      restaurants: [],
      restaurant: null,
      selectedRegion: null,
      selectedCategory: null,
      accessToken: '',
      loginFields: {
        email: '',
        password: '',
      },
      reviewField: {
        score: '',
        description: '',
      },
    };

    it('returns initialState', () => {
      const state = reducer(undefined, { type: 'action' });

      expect(state).toEqual(initialState);
    });
  });

  describe('setRegions', () => {
    it('changes regions', () => {
      const initialState = {
        regions: [],
      };

      const regions = [
        { id: 1, name: '서울' },
      ];

      const state = reducer(initialState, setRegions(regions));

      expect(state.regions).toHaveLength(1);
    });
  });

  describe('setCategories', () => {
    it('changes categories', () => {
      const initialState = {
        categories: [],
      };

      const categories = [
        { id: 1, name: '한식' },
      ];

      const state = reducer(initialState, setCategories(categories));

      expect(state.categories).toHaveLength(1);
    });
  });

  describe('setRestaurants', () => {
    it('changes restaurants', () => {
      const initialState = {
        restaurants: [],
      };

      const restaurants = [
        { id: 1, name: '마법사주방' },
      ];

      const state = reducer(initialState, setRestaurants(restaurants));

      expect(state.restaurants).toHaveLength(1);
    });
  });

  describe('setRestaurant', () => {
    it('changes restaurant', () => {
      const initialState = {
        restaurant: null,
      };

      const restaurant = { id: 1, name: '마법사주방' };

      const state = reducer(initialState, setRestaurant(restaurant));

      expect(state.restaurant.id).toBe(1);
      expect(state.restaurant.name).toBe('마법사주방');
    });
  });

  describe('selectRegion', () => {
    it('changes selected region', () => {
      const initialState = {
        regions: [
          { id: 1, name: '서울' },
        ],
        selectedRegion: null,
      };

      const state = reducer(initialState, selectRegion(1));

      expect(state.selectedRegion).toEqual({
        id: 1,
        name: '서울',
      });
    });
  });

  describe('selectCategory', () => {
    it('changes selected category', () => {
      const initialState = {
        categories: [
          { id: 1, name: '한식' },
        ],
        selectedCategory: null,
      };

      const state = reducer(initialState, selectCategory(1));

      expect(state.selectedCategory).toEqual({
        id: 1,
        name: '한식',
      });
    });
  });

  describe('setAccessToken', () => {
    it('changes accessToken', () => {
      const initialState = {
        accessToken: null,
      };

      const accessToken = 'qwer!!';

      const state = reducer(initialState, setAccessToken(accessToken));

      expect(state.accessToken).toBe(accessToken);
    });
  });

  describe('logout', () => {
    it('changes accessToken', () => {
      const initialState = {
        accessToken: 'ACCESS_TOKEN',
      };

      const state = reducer(initialState, logout());

      expect(state.accessToken).toBe('');
    });
  });

  describe('changeLoginFields', () => {
    const initialState = {
      loginFields: {
        email: 'email',
        password: 'password',
      },
    };

    context('when email is changed', () => {
      const state = reducer(
        initialState,
        changeLoginFields({ name: 'email', value: 'test@test' }),
      );

      expect(state.loginFields).toEqual({
        email: 'test@test',
        password: 'password',
      });
    });

    context('when password is changed', () => {
      const state = reducer(
        initialState,
        changeLoginFields({ name: 'password', value: 'test' }),
      );

      expect(state.loginFields).toEqual({
        email: 'email',
        password: 'test',
      });
    });
  });

  describe('changeReviewField', () => {
    const initialState = {
      reviewField: {
        score: '',
        description: '',
      },
    };

    context('when score is changed', () => {
      const state = reducer(initialState, changeReviewField({
        name: 'score',
        value: '5',
      }));

      expect(state.reviewField).toEqual({
        score: '5',
        description: '',
      });
    });

    context('when description is changed', () => {
      const state = reducer(initialState, changeReviewField({
        name: 'description',
        value: '맛점 장소로 최고!',
      }));

      expect(state.reviewField).toEqual({
        score: '',
        description: '맛점 장소로 최고!',
      });
    });
  });
});
