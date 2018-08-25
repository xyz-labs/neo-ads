import Immutable from 'immutable';
import { createAction, createReducer } from 'redux-act';
import { u } from '@cityofzion/neon-js';
import { testInvokeContract, addressToScriptHash } from '../lib/neon';
import { getStackArrayValues } from '../lib/utils';

const getItemRequest = createAction('GET_ITEM_REQUEST')
const getItemFailure = createAction('GET_ITEM_FAILURE')

const getPublicationsSuccess = createAction('GET_PUBLICATIONS_SUCCESS')
const getUserFundsSuccess = createAction('GET_USER_FUNDS_SUCCESS')
const getWinningBidSuccess = createAction('GET_WINNING_BID_SUCCESS')
const getAuctionSuccess = createAction('GET_AUCTION_SUCCESS')
const getAuctionDetailSuccess = createAction('GET_AUCTION_DETAIL_SUCCESS')

/*
    TODO: input validation
*/

export function getUserPublications(address) {
    return async dispatch => {
        dispatch(getItemRequest())

        testInvokeContract('getUserPublications', [address])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                console.log(u.hexstring2str(result[1].value))
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
                console.log(u.hexstring2str(result[1].value))
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

        testInvokeContract('getUserFunds', [address])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                console.log(u.hexstring2str(result[1].value))
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

export function getWinningBid(data) {
    return async dispatch => {
        const { address, name, date } = data

        dispatch(getItemRequest())

        testInvokeContract('getAuctionWinner', [address, u.str2hexstring(name), parseInt(date)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                console.log(u.hexstring2str(result[1].value))
                dispatch(getItemFailure())
            } else {
                dispatch(getWinningBidSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getItemFailure())
        })
    }
}

export function getAuction(data) {
    return async dispatch => {
        const { address, name, date } = data

        dispatch(getItemRequest())

        testInvokeContract('getAuctionByMonth', [address, u.str2hexstring(name), parseInt(date)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                console.log(u.hexstring2str(result[1].value))
                dispatch(getItemFailure())
            } else {
                dispatch(getAuctionSuccess(result[1].value))
            }
        })
        .catch(() => {
            dispatch(getItemFailure())
        })
    }
}

export function getAuctionDetail(data) {
    return async dispatch => {
        const { address, name, date } = data

        dispatch(getItemRequest())

        testInvokeContract('getAuctionByDate', [address, u.str2hexstring(name), parseInt(date)])
        .then(res => {
            const result = res.result.stack[0].value

            if (result[0].value != 1) {
                console.log(u.hexstring2str(result[1].value))
                dispatch(getItemFailure())
            } else {
                dispatch(getAuctionDetailSuccess(result[1].value))
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
    activePublicationList: Immutable.List(),
    activeBid: Immutable.List(),
    activeAuction: Immutable.List(),
    activeAuctionDetail: Immutable.List()
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

        const publications = responseArray.map((element) => {
            const values = getStackArrayValues(element);
            return [values[0], u.hexstring2str(values[1]),u.hexstring2str(values[2]), u.hexstring2str(values[3]), values[4]]
        })

        return state.merge({
            isLoading: false,
            activePublicationList: Immutable.List(publications)
        });
    },
    [getUserFundsSuccess]: (state, resp) => {
        return state.merge({
            isLoading: false,
            funds: resp ? resp : 0
        });
    },
    [getWinningBidSuccess]: (state, resp) => {
        console.log(resp)
        return state.merge({
            isLoading: false,
            activeBid: Immutable.List(resp) 
        })
    },
    [getAuctionSuccess]: (state, resp) => {
        return state.merge({
            isLoading: false,
            activeAuction: Immutable.List(resp) 
        })
    },
    [getAuctionDetailSuccess]: (state, resp) => {
        return state.merge({
            isLoading: false,
            activeAuctionDetail: Immutable.List(resp.reverse())
        })
    }
}, initialState);

export default blockchainReducer;