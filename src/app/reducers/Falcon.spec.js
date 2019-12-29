import falcon from './Falcon';
import * as types from '../constants/ActionTypes';

describe('falcon reducer', () => {
  it('should handle initial state', () => {
    expect(
        falcon(undefined, {})
    ).toEqual({
      error: '',
      time: 0,
      planet: '',
      status: ''
    });
  });

  it('should handle SET_RESULTS', () => {
    expect(
        falcon({}, {
          type: types.SET_RESULTS,
          data: {
            time: 200,
            planet: 'DonLon',
            status: 'success'
          }
        })
    ).toEqual(jasmine.objectContaining({
      time: 200,
      planet: 'DonLon',
      status: 'success'
    }));

    expect(
        falcon({
          time: 200,
          planet: 'DonLon',
          status: 'success'
        }, {
          type: types.SET_RESULTS,
          data: {
            time: 180,
            planet: 'Pluto',
            status: 'success'
          }
        })
    ).toEqual(jasmine.objectContaining({
      time: 180,
      planet: 'Pluto',
      status: 'success'
    }));

    expect(
        falcon({
          time: 180,
          planet: 'Pluto',
          status: 'success'
        }, {
          type: types.SET_RESULTS,
          data: {
            time: 180,
            planet: '',
            status: 'false'
          }
        })
    ).toEqual(jasmine.objectContaining({
      time: 180,
      planet: '',
      status: 'false'
    }));
  });
});
