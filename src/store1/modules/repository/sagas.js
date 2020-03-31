import { all, takeLatest, call, put, delay } from 'redux-saga/effects';

import api from '~/services/api';

import { repoSearchSuccess, repoFaiure, repoNextPage } from './actions';

/**
 * takeLastest - toda vez que ouvir o type do action irá executar uma função
 * call - chama um methodo (GET, PUT, POST, DELETE)
 *
 */

export function* searchinRepo({ payload, nameSearch, filter }) {
  try {
    const { search, page, filter } = payload.data;
    let { nameSearch } = payload;

    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search,
        sort: filter || 'stars', // 'stars',
        page,
        per_page: 5,
        order: 'desc',
      },
    });
    yield delay(500);
    nameSearch = search;
    const filterActual = filter;
    const repos = res.data;
    console.log(nameSearch);
    console.log(filterActual);

    yield put(repoSearchSuccess(repos, nameSearch, filterActual));
  } catch (error) {
    // console.log('Erro pesquisar repositório!');
    yield put(repoFaiure());
  }
}

export function* nextPage({ payload }) {
  try {
    // aplicar o selector do sagas aqui //
    const { search, page, filter } = payload.data;
    let { nameSearch } = payload;

    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search,
        sort: filter || 'stars', // 'stars',
        page: 1,
        per_page: 5,
        order: 'desc',
      },
    });
    yield delay(500);
    nameSearch = search;
    const repos = res.data;
    const filterActual = filter;
    yield put(repoNextPage(repos));
  } catch (error) {
    yield put(repoFaiure());
  }
}

// export function* listaInfinita({payload}) {
//   const {page, perPage, qtdResult, plusPage } = payload.data;

// }
export default all([
  takeLatest('@repo/REPO_REQUEST_SEARCH', searchinRepo),
  takeLatest('@repo/REPO_NEXT_PAGE', nextPage),
]);
