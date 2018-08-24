import { combineReducers } from 'redux-immutable';

import neoLinkReducer from './neolink';

const rootReducer = combineReducers({
    neolink: neoLinkReducer
});

export default rootReducer