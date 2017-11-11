import { handleActions }                  from 'redux-actions'
import { fromJS }                         from 'immutable'
import {
	SET_SEARCHED_USERS_DATA,
	SET_SEARCH_LOADER_STATUS,
	SET_PAGE_LOADER_STATUS,
	SET_USER_REPO_DATA
} 										  from './action.js'

const initialState = fromJS({
	usersData: [],
	fetching: false,
	pageLoader: false,
	userRepoData: []
	
})

export default handleActions({
	[SET_SEARCHED_USERS_DATA]: (state, { payload }) => state.set('usersData', payload),
	[SET_SEARCH_LOADER_STATUS]: (state, { payload }) => state.set('fetching', payload),
	[SET_PAGE_LOADER_STATUS]: (state, { payload }) => state.set('pageLoader', payload),
	[SET_USER_REPO_DATA]: (state, { payload }) => state.set('userRepoData', payload)
}, initialState)
