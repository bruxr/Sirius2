import { combineReducers } from 'redux';

import repo from './repo'
import sftp from './sftp'
import addons from './addons'
import projectReducer from './project';
import filesReducer from './files';

export default combineReducers({
    project: projectReducer,
    files: filesReducer,
    addons,
    repo,
    sftp
});