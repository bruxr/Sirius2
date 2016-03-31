import _ from 'underscore';

export default function(state, action) {
  if (_.isUndefined(state)) {
    return {
      id: null,
      name: null,
      description: null,
      created_at: null,
      updated_at: null
    }
  }
  
  switch (action.type) {
    case 'SET_PROJECT_DETAILS':
      return Object.assign({}, state, action.project);
    default:
      return state;
  }
}