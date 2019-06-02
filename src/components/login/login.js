import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input, Icon, Checkbox, Button } from 'antd/lib/index';
import styles from './login.less';
import loginBackground from '@assets/login.jpg';
import { salt } from "@components/login/constant";
import md5 from 'js-md5';
import { login } from "@/services/login/login";

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
        const { mobile, password } = values;
        login({ mobile, password: md5(password+salt) }, () => {
          this.props.history.push('/goods')
        }, (err) => {
          console.log('err', err)
        });
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

export default withRouter(Login);
