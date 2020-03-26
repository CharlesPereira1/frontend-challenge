export default function repository(state = [], action) {
  switch (action.type) {
    case 'ADD_REQUEST':
      return [...state, action.repo];
    default:
      return state;
  }
}
