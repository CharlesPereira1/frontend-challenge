import { all, takeLatest, call, put, delay, select } from 'redux-saga/effects';

import api from '~/services/api';

import { repoSearchSuccess, repoFailure, repoNextPageSuccess } from './actions';

/**
 * takeLastest - toda vez que ouvir o type do action irá executar uma função
 * call - chama um methodo (GET, PUT, POST, DELETE)
 *
 */

export function* searchinRepo({ payload }) {
  try {
    // cria os parametros a serem passados para o action
    const { search, page, filter, perPage } = payload.data;

    // define os parametros no link da api
    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search,
        sort: filter || 'stars', // 'stars',
        page,
        per_page: perPage,
        order: 'desc',
      },
    });
    // delay de 2ms
    yield delay(2000);

    // const filterActual = filter;
    const repos = res.data;

    // passa os parametros para o action vindos no repository.js
    yield put(repoSearchSuccess(repos, search, filter, page, perPage));
  } catch (error) {
    yield put(repoFailure());
  }
}

export function* nextPageRepo({ payload }) {
  try {
    // cria os parametros a serem passados para o action
    const { search, page, filter, perPage } = payload.data;

    // define os parametros no link da api
    const res = yield call(api.get, 'search/repositories', {
      params: {
        q: search,
        sort: filter || 'starss', // 'stars',
        page,
        per_page: perPage,
        order: 'desc',
      },
    });
    // delay de 2ms
    yield delay(500);

    // const filterActual = filter;
    const repos = res.data;
    yield put(repoNextPageSuccess(repos, page));
    console.log(page, 'vtnc');
  } catch (error) {
    yield put(repoFailure());
  }

  // export function* listaInfinita({payload}) {
  //   const {page, perPage, qtdResult, plusPage } = payload.data;
}
export default all([
  takeLatest('@repo/REPO_REQUEST_SEARCH', searchinRepo),
  takeLatest('@repo/REPO_REQUEST_NEXT_PAGE', nextPageRepo),
]);
