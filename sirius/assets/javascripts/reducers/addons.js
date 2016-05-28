import Immutable from 'immutable'

export default function(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.Map({
            isFetching: false
        })
    }

    switch (action.type) {
        
        default:
            return state

    }
}