import Immutable from 'immutable';
import moment from 'moment';

export default function (state, action) {
    if (typeof state === 'undefined') {
        return {
            isFetching: false,
            items: []
        }
    }
    
    switch(action.type) {
        case 'RECEIVED_FILES':
            for (let i = 0; i < action.items.length; i++) {
                let item = action.items[i];
                let file = {
                    id: item.id,
                    name: item.name,
                    size: parseInt(item.size),
                    type: item.type,
                    date: moment.utc(item.date)
                };
                
                // Insert the file to the sorted files array
                if (state.items.length === 0) {
                    state.items.push(file);
                } else {
                    let index = state.items.length;
                    for (let j = 0; j < state.items.length; j++) {
                        if (file.date.isAfter(state.items[j].date)) {
                            index = j;
                            break;
                        }
                    }
                    state.items.splice(index, 0, file);
                }
            }
            return state;
        
        default:
            return state;
    }
}