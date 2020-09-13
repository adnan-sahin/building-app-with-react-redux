import * as authorApi from '../../api/authorApi';
import * as types from '../actions/actionTypes';
import { beginApiCall } from './apiStatusActions';

export function loadAuthorSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export function loadAuthors() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return authorApi
      .getAuthors()
      .then((data) => {
        dispatch(loadAuthorSuccess(data));
      })
      .catch((error) => {
        throw error;
      });
  };
}
