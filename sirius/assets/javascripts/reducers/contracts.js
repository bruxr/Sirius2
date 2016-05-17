import moment from 'moment';
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
        case 'RECEIVED_CONTRACTS':
            var items = action.items.map(item => {
                return Object.assign({}, CONTRACT, {
                    id: item.id,
                    name: item.name,
                    description: item.desc,
                    amount: item.amount,
                    time: item.time,
                    allotedTime: item.alloted_time === null ? undefined : item.alloted_time,
                    rate: item.rate === null ? undefined : item.rate,
                    rateType: item.rate_type,
                    invoices: item.invoices.slice(0),
                    startedAt: item.started_at === null ? undefined : moment.utc(item.started_at),
                    endedAt: item.ended_at === null ? undefined : moment.utc(item.ended_at)
                });
            });
            return Object.assign({}, state, {
                isFetching: false,
                items
            });

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