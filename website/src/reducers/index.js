import { combineReducers } from 'redux-immutable';

import neoLinkReducer from './neolink';
import blockchainReducer from './blockchain';

const rootReducer = combineReducers({
    blockchain: blockchainReducer,
    neolink: neoLinkReducer
});

export default rootReducer