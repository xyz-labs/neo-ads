import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { listenToEvent } from '../lib/neolink';

const updateNeoLinkStatus = createAction('UPDATE_NEOLINK_STATUS');

export function checkNeoLinkStatus() {
    return async dispatch => {
        listenToEvent('NEOLINK_GET_EXTENSION_STATUS')
        .then(resp => {
            dispatch(updateNeoLinkStatus(resp))
        })
        .catch(() => {
            console.log("NeoLink is not connected")
        })
    }
}

const initialState = Immutable.Map({
    isLoading: false,
    isConnected: false,
    isLoggedIn: false,
    address: ''
})

const neoLinkReducer = createReducer({
    [updateNeoLinkStatus]: (state, resp) => {
        return state.merge({
            isConnected: true,
            isLoggedIn: resp.isLoggedIn,
            address: resp.address,
        });
    },
}, initialState);

export default neoLinkReducer;