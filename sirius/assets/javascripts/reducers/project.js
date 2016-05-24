import _ from 'underscore';
import moment from 'moment';
import Immutable from 'immutable';

export const Project = Immutable.Record({
    id: null,
    name: null,
    url: null,
    desc: null,
    status: null,
    createdAt: null,
    updatedAt: null
}, 'Project');

export default function(state, action) {
    if (_.isUndefined(state)) {
        return new Project();  
    } else {
        return state;
    }
}