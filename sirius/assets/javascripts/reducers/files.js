import moment from 'moment';
import Immutable from 'immutable';

const File = Immutable.Record({
    id: null,
    name: null,
    filesize: 0,
    type: null,
    date: null
}, 'File');

function insertFile(file, set) {
    if (set.size === 0) {
        return set.push(file);
    } else {
        let index = set.size;
        set.forEach((item, key) => {
            if (file.date.isAfter(item.date)) {
                index = key;
                return false;
            }
        });
        return set.insert(index, file);
    }
}

export default function (state, action) {
    if (typeof state === 'undefined') {
        return Immutable.Map({
            isFetching: false,
            items: Immutable.List()
        });
    }
    
    var items = state.get('items');
    switch(action.type) {
        case 'UPLOADING_FILE':
            var file = new File({
                id: action.tempId,
                name: action.file.name,
                filesize: action.file.size,
                type: action.file.type,
                date: moment.utc()
            });
            return state.set('items', insertFile(file, items));

        case 'UPLOADED_FILE':
            items = items.map((item, key) => {
                if (item.id === action.tempId) {
                    return item.set('id', action.file.id);
                } else {
                    return item;
                }
            });
            return state.set('items', items);
        
        case 'RECEIVED_FILES':
            for (let i = 0; i < action.items.length; i++) {
                let item = action.items[i];
                let file = new File({
                    id: item.id,
                    name: item.name,
                    filesize: parseInt(item.size),
                    type: item.type,
                    date: moment.utc(item.date)
                });
                items = insertFile(file, items);
            }
            return state.set('items', items);
        
        default:
            return state;
    }
}