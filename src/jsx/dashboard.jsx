import React, { Component } from 'react'
import { Select, Spin, Card, Icon } from 'antd'
import { connect } from 'react-redux'
import debounce from 'debounce'
import { actions as UserActions } from '../redux/modules/action.js'
var _ = require('lodash')

const Option = Select.Option

const mapStateToProps = ({ user }) => {
    const { usersData, userRepoData } = user.toJS()
    return {
        usersData,
        userRepoData,
        fetching: user.get('fetching'),
        pageLoader: user.get('pageLoader')
    }
}

class Dashboard extends Component {

    state = {
        value: [],
        selected: false
    }

    componentWillMount () {
        const session = localStorage.session_code
        if (!session) window.location = window.location.origin + '/'
    }

	_handleSearch = (value) => {
        if (!this.state.selected) {
            debounce(this.props.getAllUsers(value), 250)
        }
	}

    _handleChange = (value) => {
        this.setState({ value, selected: false })
    }

	_handleSelect = (value, option) => {
		console.log('VALUE', value)
		console.log('OPTION', option)
        this.props.getUserRepos(value.key)
        this.setState({ value, selected: true })
	}

    _sortRepos = (type) => {
        const sortedRepos = _.sortBy(this.props.userRepoData, type)
        this.props.setUserRepoData(sortedRepos.reverse())
    }

	render () {
        console.log('DATA', this.props.usersData)
        const { usersData, fetching, pageLoader, userRepoData } = this.props
		const { data, value } = this.state
        const activeClass = pageLoader ? 'active' : ''
		return (
			<div>
				<Select
					mode="combobox"
					labelInValue
					value={value}
					placeholder="Select users"
					notFoundContent={fetching ? <Spin size="small" /> : null}
					filterOption={false}
					onSearch={this._handleSearch}
					onChange={this._handleChange}
					style={{ width: '100%' }}
					onSelect={this._handleSelect}
    >
					{usersData.map(d => <Option key={d.login}>{d.login}</Option>)}
		        </Select>
                {pageLoader && <div className="loader">
                    <div className={"loader-container " + activeClass}>
                        <Icon type="loading" />
                    </div>
                </div>}
                {!pageLoader && userRepoData && userRepoData.length > 0 && <div className='sortOptions'>
                    <span>Sort By : </span>
                    <span onClick={() => this._sortRepos('created_at')}>created_at</span>
                    <span onClick={() => this._sortRepos('stargazers_count')}>stars</span>
                </div>}
                {!pageLoader && userRepoData && userRepoData.length > 0 && <section className='userDetails'>
                    <div className='userSection'>
                        <Card style={{ width: 240 }} bodyStyle={{ padding: 0 }}>
                            <div className="custom-image">
                                <img alt="example" width="100%" src={userRepoData[0].owner.avatar_url} />
                            </div>
                            <div className="custom-card">
                                <h3>{userRepoData[0].owner.login}</h3>
                                <a href={userRepoData[0].owner.html_url} target='_blank'>
                                    <p>{userRepoData[0].owner.html_url}</p>
                                </a>
                            </div>
                        </Card>
                    </div>
                    <div className='userRepos'>
                        {userRepoData.map((repo) => {
                            return (
                                <Card title={repo.name} key={repo.id} className='repoCard'>
                                    <p>{repo.description || ''}</p>
                                    <ul className='meta'>
                                        {repo.language && <li>
                                            <Icon type="bulb" />
                                            <span>{repo.language || ''}</span>
                                        </li>}
                                        <li>
                                            <Icon type="star" />
                                            <span>{repo.stargazers_count}</span>
                                        </li>
                                        <li>
                                            <Icon type="fork" />
                                            <span>{repo.forks}</span>
                                        </li>
                                    </ul>
                                </Card>
                            )
                        })}
                    </div>
                </section>}
			</div>
		)
	}
}

export default connect(mapStateToProps, Object.assign({}, UserActions))(Dashboard)
