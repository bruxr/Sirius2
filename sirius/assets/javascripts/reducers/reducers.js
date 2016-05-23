import { combineReducers } from 'redux';

import addonsReducer from './addons';
import routingReducer from './routing';
import projectReducer from './project';
import contractsReducer from './contracts';
import filesReducer from './files';

export default combineReducers({
    routing: routingReducer,
    project: projectReducer,
    integrations: integrationsReducer,
    contracts: contractsReducer,
    files: filesReducer
});