import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { listenToEvent } from '../lib/neolink';
import { addressToScriptHash } from '../lib/neon';

const neoLinkRequest = createAction('NEOLINK_REQUEST');
const updateNeoLinkStatus = createAction('UPDATE_NEOLINK_STATUS')
const transactionSubmitted = createAction('TRANSACTION_SUBMITTED')

export function checkNeoLinkStatus() {
    return async dispatch => {
        dispatch(neoLinkRequest())
        listenToEvent('NEOLINK_GET_EXTENSION_STATUS')
        .then(resp => {
            dispatch(updateNeoLinkStatus(resp))
        })
        .catch(() => {
            dispatch(transactionSubmitted())
        })
    }
}

export function sendInvoke(data) {
    return async dispatch => {
        dispatch(neoLinkRequest())

        /*
            Could neonjs testinvoke here first
        */

        listenToEvent('NEOLINK_SEND_INVOKE', false, data)
        .then(resp => {
            console.log(resp)
            dispatch(transactionSubmitted())
        })
    }
}

const initialState = Immutable.Map({
    isLoading: false,
    isConnected: false,
    isLoggedIn: false,
    address: '',
    addressHash: ''
})

const neoLinkReducer = createReducer({
    [neoLinkRequest]: (state) => {
        return state.merge({
            isLoading: true
        })
    },
    [updateNeoLinkStatus]: (state, resp) => {
        const { isLoggedIn, address } = resp

        return state.merge({
            isLoading: false,
            isConnected: true,
            isLoggedIn: isLoggedIn,
            address: address,
            addressHash: address ? addressToScriptHash(address) : '',
        });
    },
    [transactionSubmitted]: (state, resp) => {
        return state.merge({
            isLoading: false,
        })
    }
}, initialState);

export default neoLinkReducer;