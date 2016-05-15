import Immutable from 'immutable';

const CONTRACT = {
    id: null,
    name: null,
    description: null,
    amount: 0,
    time: 0,
    allotedTime: null,
    rate: null,
    rateType: null,
    invoices: [],
    startedAt: null,
    endedAt: null
};

const Invoice = Immutable.Record({
    id: null,
    name: null,
    status: 'saved',
    amount: 0
});

export default function(state, action) {
    if (typeof state === 'undefined') {
        return {
            isFetching: false,
            items: []
        };
    }

    switch(action.type) {
        case 'NEW_CONTRACT':
            var contract = Object.assign({}, CONTRACT, {
                id: '?' + (+new Date())
            });
            var items = state.items.slice(0);
            items.push(contract);
            return Object.assign({}, state, {
                items
            });

        default:
            return state;
    }
}