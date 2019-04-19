import React, { Component } from 'react';
import { Form, Input, Icon, Checkbox, Button } from 'antd';
import styles from './login.less';
import loginBackground from '@assets/login.jpg';
import request from '@utils/request.js';

const { Item } = Form;

class LoginForm extends Component {

  componentDidMount() {
    document.body.style.backgroundImage = `url(${loginBackground})`;
  }

  componentWillUnmount() {
    document.body.style.backgroundImage = null;
  }

  handleSubmit (e) {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        let url = {
          api: '/api/login',
          type: 'json'
        };
        request.get(url, values, (res) => {
          console.log('res', res);
        });
        console.log('Received values of form: ', values);
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit.bind(this)} className={styles['login-form']}>
        <Item>
          {getFieldDecorator('mobile', {
            rules: [{required: true, message: 'Please input your username!'}],
          })(
            <Input prefix={<Icon type="user" className={styles['input-color']} />} placeholder="Username" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('password', {
            rules: [{required: true, message: 'Please input your Password!'}],
          })(
            <Input prefix={<Icon type="lock" className={styles['input-color']} />} type="password" placeholder="Password" />
          )}
        </Item>
        <Item>
          {getFieldDecorator('remember', {
            valuePropName: 'checked',
            initialValue: true
          })(
            <Checkbox>Remember me</Checkbox>
          )}
          <Button type="primary" htmlType="submit" className="button">
            Log in
          </Button>
        </Item>
      </Form>
    )
  }
}



const Login = Form.create({ name: 'login_form' })(LoginForm);

export default Login;
