import { all, takeLatest, call, put, delay } from 'redux-saga/effects';

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
        q: search,
        sort: filter || 'stars', // 'stars',
        page,
        per_page: 30,
        order: 'desc',
      },
    });
    yield delay(500);
    const nameSearch = search;
    const repository = res.data;

    yield put(repoSearchSuccess({ repository, nameSearch }));
  } catch (error) {
    // console.log('Erro pesquisar repositório!');
    yield put(repoFaiure());
  }
}

// export function* listaInfinita({payload}) {
//   const {page, perPage, qtdResult, plusPage } = payload.data;

// }
export default all([takeLatest('@repo/REPO_REQUEST_SEARCH', searchinRepo)]);
