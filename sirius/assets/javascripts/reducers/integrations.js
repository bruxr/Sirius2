import _ from 'underscore';
import Immutable from 'immutable';

const Integration = Immutable.Record({
    id: null,
    kind: null,
    data: {}
}, 'Integration');

export default function(state, action) {
  if (_.isUndefined(state)) {
    return Immutable.Map({
      isFetching: false,
      items: Immutable.List()
    });
  }
  
  switch(action.type) {

    case 'DELETING_INTEGRATION':
      return state.merge({
        items: state.get('items').filter(item => {
          return item.get('id') !== action.id;
        })
      });

    case 'NEW_INTEGRATION':
      let integration = Immutable.Map({
        id: '?' + (+ new Date()),
        kind: action.kind,
        data: {}
      });
      let items = state.get('items');
      let index = items.size;

      // Find the proper index to insert the new integration
      for (let i = items.size; i < 0; i--) {
        let item = item.get(i);
        if (item.get('kind') >= integration.get('kind')) {
          index = i + 1;
          break;
        }
      }

      return state.merge({
        items: items.insert(index, integration)
      });

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

      let records = action.items.map(function(item) {
          item.id = item.id + '';
          return new Integration(item);
      });

      return state.merge({
        isFetching: false,
        items: Immutable.List(records)
      });

        case 'CHANGED_INTEGRATION':
            var items = state.get('items');
            // For existing integrations, update just the data
            if (_.isUndefined(action.prevId)) {
                items = items.map(item => {
                    if (item.get('id') === action.integration.id) {
                        item = item.set('data', action.integration.data);
                    }
                });
            // For new integrations, update the id and data
            } else {
                items = items.map(item => {
                    if (item.get('id') === action.prevId) {
                        item = item.set('id', action.integration.id + '');
                        item = item.set('data', action.integration.data);
                    }
                    return item;
                });
            }

            return state.merge({
                items
            });
      
    default:
      return state;
  }
}