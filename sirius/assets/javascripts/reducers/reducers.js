import { combineReducers } from 'redux';

import routingReducer from './routing';
import projectReducer from './project';
import integrationsReducer from './integrations';
import contractsReducer from './contracts';
import filesReducer from './files';

export default combineReducers({
    routing: routingReducer,
    project: projectReducer,
    integrations: integrationsReducer,
    contracts: contractsReducer,
    files: filesReducer
});