import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { testInvokeContract, addressToScriptHash } from '../lib/neon';
import { getArrayValues } from '../lib/utils';

const getUserPublicationsRequest = createAction('GET_USER_PUBLICATIONS_REQUEST');
const getUserPublicationsSuccess = createAction('GET_USER_PUBLICATIONS_SUCCESS');
const getUserPublicationsFailure = createAction('GET_USER_PUBLICATIONS_FAILURE');

export function getUserPublications(address) {
    return async dispatch => {
        dispatch(getUserPublicationsRequest())

        testInvokeContract('viewUserPublications', [addressToScriptHash(address)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                dispatch(getUserPublicationsFailure())
            } else {
                dispatch(getUserPublicationsSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getUserPublicationsFailure())
        })
    }
}

const initialState = Immutable.Map({
    isLoading: false,
    activePublicationList: Immutable.List() 
})

const blockchainReducer = createReducer({
    [getUserPublicationsRequest]: (state) => {
        return state.merge({
            isLoading: true
        });
    },
    [getUserPublicationsSuccess]: (state, resp) => {
        const responseArray = getArrayValues(resp)

        return state.merge({
            isLoading: false,
            activePublicationList: Immutable.List(responseArray)
        });
    },
    [getUserPublicationsFailure]: (state) => {
        console.log('t')
        return state.merge({
            isLoading: false
        });
    },
}, initialState);

export default blockchainReducer;