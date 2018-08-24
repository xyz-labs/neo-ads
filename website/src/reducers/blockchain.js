import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { testInvokeContract, addressToScriptHash } from '../lib/neon';
import { getStackArrayValues } from '../lib/utils';

const getUserPublicationsRequest = createAction('GET_USER_PUBLICATIONS_REQUEST');
const getUserPublicationsSuccess = createAction('GET_USER_PUBLICATIONS_SUCCESS');

const getUserFundsRequest = createAction('GET_USER_FUNDS_REQUEST');
const getUserFundsSuccess = createAction('GET_USER_FUNDS_SUCCESS');

const getItemFailure = createAction('GET_ITEM_FAILURE');

export function getUserPublications(address) {
    return async dispatch => {
        dispatch(getUserPublicationsRequest())

        testInvokeContract('getUserPublications', [addressToScriptHash(address)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                dispatch(getItemFailure())
            } else {
                dispatch(getUserPublicationsSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getItemFailure())
        })
    }
}

export function getUserFunds(address) {
    return async dispatch => {
        dispatch(getUserFundsRequest())

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
    [getUserPublicationsRequest]: (state) => {
        return state.merge({
            isLoading: true
        });
    },
    [getUserPublicationsSuccess]: (state, resp) => {
        const responseArray = getStackArrayValues(resp)

        return state.merge({
            isLoading: false,
            activePublicationList: Immutable.List(responseArray)
        });
    },
    [getUserFundsRequest]: (state) => {
        return state.merge({
            isLoading: true
        });
    },
    [getUserFundsSuccess]: (state, resp) => {
        return state.merge({
            isLoading: false,
            funds: resp ? resp : 0
        });
    },
    [getItemFailure]: (state) => {
        return state.merge({
            isLoading: false
        });
    },
}, initialState);

export default blockchainReducer;