import * as types from '../constants/ActionTypes';
import * as actions from './index';

describe('setResults actions', () => {
  it('setResults should create SET_RESULTS action', () => {
    expect(actions.setResults({
      status: 'success',
      planet: 'planet',
      time: 200
    })).toEqual({
      type: types.SET_RESULTS,
      data: {
        status: 'success',
        planet: 'planet',
        time: 200
      }
    });
  });
});
