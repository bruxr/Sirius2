import Immutable from 'immutable';
import moment from 'moment';

function insertFile(file, set) {
    if (set.length === 0) {
        set.push(file);
    } else {
        let index = set.length;
        for (let j = 0; j < set.length; j++) {
            if (file.date.isAfter(set[j].date)) {
                index = j;
                break;
            }
        }
        set.splice(index, 0, file);
    }
}

export default function (state, action) {
    if (typeof state === 'undefined') {
        return {
            isFetching: false,
            items: []
        }
    }
    
    switch(action.type) {
        case 'UPLOADING_FILE':
            var file = {
                id: '?' + (+new Date()),
                name: action.file.name,
                size: action.file.size,
                type: action.file.type,
                date: moment.utc()
            };
            insertFile(file, state.items);
            return state;

        case 'UPLOADED_FILE':
            var old_id = action.old_file.id;
            for (let i = 0; i < state.items.length; i++) {
                if (state.items[i].id === old_id) {
                    state.items[i] = Object.apply({}, state.items[i], {
                        id: action.file.id
                    });
                }
            }
            return state;
        
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