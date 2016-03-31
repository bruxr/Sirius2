import { combineReducers } from 'redux';

import routingReducer from './routing';
import projectReducer from './project';
import integrationsReducer from './integrations';

export default combineReducers({
  routing: routingReducer,
  project: projectReducer,
  integrations: integrationsReducer
});