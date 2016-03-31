import _ from 'underscore';

export default function(state, action) {
  if (_.isUndefined(state)) {
    return {
      route: '/'
    };
  }
  
  switch(action.type) {
    case 'NAVIGATE':
      return Object.assign({}, state, {
        route: action.route
      });
    default:
      return state;
  }
}