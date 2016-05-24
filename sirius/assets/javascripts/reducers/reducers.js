import { combineReducers } from 'redux';

import addonsReducer from './addons';
import projectReducer from './project';
import filesReducer from './files';

export default combineReducers({
    project: projectReducer,
    integrations: integrationsReducer,
    files: filesReducer
});