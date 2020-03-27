import { all } from 'redux-saga/effects';

import repository from './repository/sagas';

export default function* rootSaga() {
  return yield all([repository]);
}
