import _ from 'underscore';
import Immutable from 'immutable';

export const Project = Immutable.Record({
    id: null,
    name: null,
    description: null,
    created_at: new Date(),
    updated_at: new Date()
}, 'Project');

export default function(state, action) {
    if (_.isUndefined(state)) {
        return new Project();  
    }
  
    switch (action.type) {
        default:
            return state;
    }
}