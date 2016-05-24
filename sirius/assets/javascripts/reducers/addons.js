import _ from 'underscore';
import Immutable from 'immutable';

const Addon = Immutable.Record({
    id: null,
    kind: null,
    data: {}
}, 'Addon');

export default function(state, action) {
    if (_.isUndefined(state)) {
        return Immutable.Map({
            isFetching: false,
            items: Immutable.Map()
        });
    }
  
    switch(action.type) {

        case 'DELETING_ADDON':
            var items = state.get('items').filter(item => {
                return item.id !== action.id;
            });
            return state.set('items', items);

        case 'NEW_ADDON':
            var addon = new Addon({
                id: action.id,
                kind: action.kind
            });
            var items = state.get('items').set(addon.kind, addon);
            return state.set('items', items);

        case 'REQUEST_ADDONS':
            return state.set('isFetching', true);

        case 'RECEIVE_INTEGRATIONS':
            var items = state.get('items').withMutations(items => {
                for (item of action.items) {
                    let addon = new Addon({
                        id: item.id,
                        kind: item.kind,
                        data: item.data
                    });
                    items.set(addon.kind, addon);
                }
            });
            return state.set('items', items);

        case 'CHANGED_INTEGRATION':
            var items = state.get('items');
            var addon = items.get(action.addon.kind)
                            .set('data', action.addon.data);
            if (!_.isUndefined(action.prevId)) {
                addon = addon.set('id', action.addon.id);
            }
            items.set(addon.kind, addon);
            return state.set('items', items);
      
        default:
            return state;
    }
}