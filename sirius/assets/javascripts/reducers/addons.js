import Immutable from 'immutable'
import { FETCHING_ADDONS, RECEIVED_ADDONS } from '../actions/addons'

export default function(state, action) {
    if (typeof state === 'undefined') {
        return Immutable.Map({
            isFetching: false
        })
    }

    switch (action.type) {

        case FETCHING_ADDONS:
            return state.set('isFetching', true)

        case RECEIVED_ADDONS:
            return state.set('isFetching', false)
        
        default:
            return state

    }
}