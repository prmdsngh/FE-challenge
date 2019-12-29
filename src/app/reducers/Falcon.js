/* eslint-disable no-warning-comments */
import {SET_RESULTS} from '../constants/ActionTypes';

const initialState = {
  error: '',
  time: 0,
  planet: '',
  status: ''
};

export default function Falcon(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case SET_RESULTS: {
      const {time, planet, status, error} = action.data;
      return {
        status,
        time,
        planet,
        error
      };
    }
    default:
      return state;
  }
}
