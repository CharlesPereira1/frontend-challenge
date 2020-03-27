import { createStore } from 'redux';

import repository from './reducers/repository';

const store = createStore(repository);

export default store;

// import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
// import thunk from 'redux-thunk';
// import { Repositorios, repositoriosReducer } from './reducers/repositoriosReducer';
// // import { PullRequests, pullRequestsReducer } from './reducers/pullRequestsReducer';

// const rootReducer = combineReducers({
//   repositoriosState: repositoriosReducer,
//   // pullRequestsState: pullRequestsReducer,
// });

// export default function configuraStore() {
//   const store = createStore(rootReducer, undefined, applyMiddleware(thunk));
//   return store;
// }
