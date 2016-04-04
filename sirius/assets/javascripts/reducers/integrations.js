import _ from 'underscore';
import Immutable from 'immutable';

export default function(state, action) {
  if (_.isUndefined(state)) {
    return Immutable.Map({
      isFetching: false,
      items: Immutable.List()
    });
  }
  
  switch(action.type) {
    case 'REQUEST_INTEGRATIONS':
      return state.set('isFetching', true);

    case 'RECEIVE_INTEGRATIONS':
      action.items.sort(function(a, b) {
        if (a.kind < b.kind)  {
          return -1;
        } else if ( a.kind > b.kind ) {
          return 1;
        } else {
          return 0;
        }
      });

      return state.merge({
        isFetching: false,
        items: Immutable.List(action.items)
      });
      
    default:
      return state;
  }
}