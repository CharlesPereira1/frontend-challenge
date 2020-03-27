import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { repoSearchSuccess, repoFaiure } from './actions';

/**
 * takeLastest - toda vez que ouvir o type do action irá executar uma função
 * call - chama um methodo (GET, PUT, POST, DELETE)
 *
 */

export function* searchinRepo({ payload }) {
  try {
    const { search, page, filter } = payload.data;

    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search || '',
        sort: filter || 'star', // 'stars',
        page,
        per_page: 10,
      },
    });

    const repository = res.data;

    yield put(repoSearchSuccess({ repository }));
  } catch (error) {
    // console.log('Erro pesquisar repositório!');
    yield put(repoFaiure());
  }
}
export default all([takeLatest('@repo/REPO_REQUEST_SEARCH', searchinRepo)]);
