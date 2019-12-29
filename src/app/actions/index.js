import * as types from '../constants/ActionTypes';

export function setResults(data) {
  return {type: types.SET_RESULTS, data};
}
