import Immutable from 'immutable';

const Contract = Immutable.Record({
    name: null,
    description: null,
    amount: 0,
    time: 0,
    alloted_time: null,
    rate: null,
    rate_type: null,
    invoices: [],
    started_at: null,
    ended_at: null
}, 'Contract');

const Invoice = Immutable.Record({
    id: null,
    name: null,
    status: 'saved',
    amount: 0
});

export default function(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.Map({
            isFetching: false,
            items: Immutable.List()
        });
    }

    switch(action) {
        default:
            return state;
    }
}