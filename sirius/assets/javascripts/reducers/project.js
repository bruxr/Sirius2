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
    }
  
    switch (action.type) {

        case 'LOAD_PROJECT':
            const project = action.project;
            return new Project({
                id: project.id,
                name: project.name,
                url: project.url,
                desc: project.desc,
                status: project.status,
                createdAt: moment.utc(project.created),
                updatedAt: moment.utc(project.updated)
            });

        default:
            return state;

    }
}