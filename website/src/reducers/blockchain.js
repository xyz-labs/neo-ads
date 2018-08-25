import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { testInvokeContract, addressToScriptHash } from '../lib/neon';
import { getStackArrayValues } from '../lib/utils';

const getItemRequest = createAction('GET_ITEM_REQUEST');
const getItemFailure = createAction('GET_ITEM_FAILURE');

const getPublicationsSuccess = createAction('GET_PUBLICATIONS_SUCCESS');
const getUserFundsSuccess = createAction('GET_USER_FUNDS_SUCCESS');

export function getUserPublications(address) {
    return async dispatch => {
        dispatch(getItemRequest())

        testInvokeContract('getUserPublications', [addressToScriptHash(address)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                dispatch(getItemFailure())
            } else {
                dispatch(getPublicationsSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getItemFailure())
        })
    }
}

export function getNewPublications() {
    return async dispatch => {
        dispatch(getItemRequest())

        testInvokeContract('getNewPublications', [])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                dispatch(getItemFailure())
            } else {
                dispatch(getPublicationsSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getItemFailure())
        })
    }
}

export function getUserFunds(address) {
    return async dispatch => {
        dispatch(getItemRequest())

        testInvokeContract('getUserFunds', [addressToScriptHash(address)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                dispatch(getItemFailure())
            } else {
                dispatch(getUserFundsSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getItemFailure())
        })
    }
}

const initialState = Immutable.Map({
    isLoading: false,
    funds: 0,
    activePublicationList: Immutable.List()
})

const blockchainReducer = createReducer({
    [getItemRequest]: (state) => {
        return state.merge({
            isLoading: true
        });
    },
    [getItemFailure]: (state) => {
        return state.merge({
            isLoading: false
        });
    },
    [getPublicationsSuccess]: (state, resp) => {
        const responseArray = getStackArrayValues(resp)

        return state.merge({
            isLoading: false,
            activePublicationList: Immutable.List(responseArray)
        });
    },
    [getUserFundsSuccess]: (state, resp) => {
        return state.merge({
            isLoading: false,
            funds: resp ? resp : 0
        });
    },
}, initialState);

export default blockchainReducer;