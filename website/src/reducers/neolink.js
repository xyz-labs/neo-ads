import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { listenToEvent } from '../lib/neolink';
import { addressToScriptHash } from '../lib/neon';

const neoLinkCheck = createAction('NEOLINK_CHECK');
const neoLinkRequest = createAction('NEOLINK_REQUEST');
const updateNeoLinkStatus = createAction('UPDATE_NEOLINK_STATUS')
const transactionSubmitted = createAction('TRANSACTION_SUBMITTED')
const resetTransactionData = createAction('RESET_TRANSACTION_DATA')

export function checkNeoLinkStatus() {
    return async dispatch => {
        dispatch(neoLinkCheck())
        listenToEvent('NEOLINK_GET_EXTENSION_STATUS')
        .then(resp => {
            dispatch(updateNeoLinkStatus(resp))
        })
        .catch(() => {
            dispatch(updateNeoLinkStatus({isLoggedIn: false, address: ''}))
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
            dispatch(transactionSubmitted(resp))
        })
    }
}

export function resetTransaction() {
    return async dispatch => {
        dispatch(resetTransactionData())
    }
}

const initialState = Immutable.Map({
    isLoading: false,
    isChecking: false,
    isLoggedIn: false,
    hasSubmitted: false,
    address: '',
    addressHash: '',
    transactionID: ''
})

const neoLinkReducer = createReducer({
    [neoLinkCheck]: (state) => {
        return state.merge({
            isChecking: true
        })
    },
    [neoLinkRequest]: (state) => {
        return state.merge({
            isRequesting: true,
            hasSubmitted: false
        })
    },
    [updateNeoLinkStatus]: (state, resp) => {
        const { isLoggedIn, address } = resp

        return state.merge({
            isChecking: false,
            isConnected: true,
            isLoggedIn: isLoggedIn,
            address: address,
            addressHash: address ? addressToScriptHash(address) : '',
        });
    },
    [transactionSubmitted]: (state, resp) => {
        return state.merge({
            isRequesting: false,
            hasSubmitted: true,
            transactionID: resp.status == 'success' ? resp.txid : '',
        })
    },
    [resetTransactionData]: (state) => {
        return state.merge({
            hasSubmitted: false,
            transactionID: ''
        })
    }
}, initialState);

export default neoLinkReducer;