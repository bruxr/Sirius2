import _ from 'underscore';
import Immutable from 'immutable';

export default function(state, action) {
  if (_.isUndefined(state)) {
    return Immutable.Map({
      id: null,
      name: null,
      description: null,
      created_at: null,
      updated_at: null
    })
  }
  
  switch (action.type) {
    default:
      return state;
  }
}