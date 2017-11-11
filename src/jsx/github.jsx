import React, { Component } from 'react'
import { Button } from 'antd'
import axios from 'axios'

export default class GithubProcess extends Component {

	componentDidMount () {
		console.log('URL', window.location.search)
		const code = window.location.search.split('=').pop()
		// axios({
		// 	url: `${window.location.origin}/api/callback`,
		// 	params: {
		// 		code
		// 	}
		// })
		if (code) {
			window.location = window.location.origin + '/dashboard'
			localStorage.session_code = code
		} else {
			window.location = window.location.origin + '/'
			if (localStorage.session_code) localStorage.removeItem('session_code')
		}
	}

	render () {
		return (
			<div />
		)
	}
}
