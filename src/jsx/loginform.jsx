import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox } from 'antd'
import axios from 'axios'
import Github from 'github-api'
// var client = undefined

const FormItem = Form.Item;

class NormalLoginForm extends Component {

  state = {
      username: '',
      password: ''
  }

  _handleSubmit = () => {
      var client = new Github({
          username: this.state.username,
          password: this.state.password
      })
      var user = client.getUser()
      console.log('USER', user)
      user.listNotifications().then((response) => console.log('RESPONSE', response)).catch(e => console.log('error', e))
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form className="login-form">
		  <FormItem>
			  {/* {getFieldDecorator('userName', {
				  rules: [{ required: true, message: 'Please input your username!' }],
			  })( */}
              <Input prefix={<Icon type="user" style={{ fontSize: 13 }} />} placeholder="Username" onChange={e => this.setState({ username: e.target.value })} />
			  {/* )} */}
		  </FormItem>
		  <FormItem>
			  {/* {getFieldDecorator('password', {
				  rules: [{ required: true, message: 'Please input your Password!' }],
			  })( */}
              <Input prefix={<Icon type="lock" style={{ fontSize: 13 }} />} type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} />
			  {/* )} */}
		  </FormItem>
		  <FormItem>
			  {/* {getFieldDecorator('remember', {
				  valuePropName: 'checked',
				  initialValue: true,
				  })(
				  <Checkbox>Remember me</Checkbox>
			  )} */}
			  {/* <a className="login-form-forgot" href="">Forgot password</a> */}
			  <Button type="primary" className="login-form-button" onClick={this._handleSubmit}>
                  Log in
			  </Button>
              <a href={`https://github.com/login/oauth/authorize?scope=user:email&client_id=21782260b6faab8c3e56`}>
                  <Button size='large' className='github-login-button'> Log in with Github </Button>
              </a>
			  {/* Or <a href="">register now!</a> */}
		  </FormItem>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(NormalLoginForm)
export default WrappedNormalLoginForm
