import axios            from 'axios'
import { createAction } from 'redux-actions'

const SEARCH_USERS_API = 'https://api.github.com/search/users'
const USER_API = 'https://api.github.com/users'

export const SET_SEARCHED_USERS_DATA = 'SET_SEARCHED_USERS_DATA'
export const SET_SEARCH_LOADER_STATUS = 'SET_SEARCH_LOADER_STATUS'
export const SET_PAGE_LOADER_STATUS = 'SET_PAGE_LOADER_STATUS'
export const SET_USER_REPO_DATA = 'SET_USER_REPO_DATA'

const setSearchedUsersData = createAction(SET_SEARCHED_USERS_DATA)
const setSearchLoaderStatus = createAction(SET_SEARCH_LOADER_STATUS)
const setPageLoaderStatus = createAction(SET_PAGE_LOADER_STATUS)
const setUserRepoData = createAction(SET_USER_REPO_DATA)

function fetchUsers (query) {
	return axios({
		url: `${SEARCH_USERS_API}`,
		method: 'GET',
		params: {
			q: query
		}
	})
}

function fetchSelectedUser (user) {
	return axios({
		url: `${USER_API}/${user}/repos`,
		method: 'GET',
		timeout: 0,
		responseType: 'json'
	})
}

function getAllUsers (data) {
	return function (dispatch) {
		dispatch(setSearchLoaderStatus(true))
		fetchUsers(data)
		.then((response) => {
			console.log('RESPONSE', response)
			const usersData = response.data ? response.data.items : []
			dispatch(setSearchLoaderStatus(false))
			dispatch(setSearchedUsersData(usersData))
		})
	}
}

function getUserRepos (user) {
	return function (dispatch) {
		dispatch(setPageLoaderStatus(true))
		fetchSelectedUser(user)
		.then((response) => {
			console.log('USER REPO', response)
			setTimeout(() => {
				dispatch(setPageLoaderStatus(false))
				dispatch(setUserRepoData(response.data || []))
			}, 1000)
		})
	}
}

export const actions = {
	getAllUsers,
	getUserRepos,
	setUserRepoData
}
