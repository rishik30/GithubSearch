import React, { Component } from 'react'
import { Button } from 'antd'
import WrappedNormalLoginForm from './loginform.jsx'

export default class Main extends Component {

	render () {
		return (
			<main>
				<WrappedNormalLoginForm />
			</main>
		)
	}
}
