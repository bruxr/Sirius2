import _ from 'underscore';

export default function(state, action) {
  if (_.isUndefined(state)) {
    return {
      isFetching: false,
      items: []
    };
  }
  
  switch(action.type) {
    case 'REQUEST_INTEGRATIONS':
      return Object.assign({}, state, {
        isFetching: true
      });
    case 'RECEIVE_INTEGRATIONS':
      return Object.assign({}, state, {
        isFetching: false,
        items: action.items
      });
    default:
      return state;
  }
}