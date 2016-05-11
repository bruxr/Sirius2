import _ from 'underscore';
import Immutable from 'immutable';

export const Project = Immutable.Record({
    id: null,
    name: null,
    description: null,
    createdAt: null,
    updatedAt: null
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