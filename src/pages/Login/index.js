import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import React from 'react'
import { Redirect } from 'react-router-dom'
import connect from '../../utils/connect'
// import { login } from './service'
import './index.less'
// import lb_bg from '../../asset/login/lb_bg.png'
// import bc_bg from '../../asset/login/bc_bg.png'
// import tr_bg from '../../asset/login/tr_bg.png'
// // import logo from '../../asset/login/logo.png'
// import phone from '../../asset/login/phone.png'
// import password from '../../asset/login/password.png'
@connect
class NormalLoginForm extends React.Component {
  // handleSubmit = e => {
  //     const _this = this
  //     e.preventDefault();
  //     this.props.form.validateFields((err, values) => {
  //         if (!err) {

  //             _this.authChange({
  //               username: 'admin',
  //               password: '123456',
  //             })
  //         } else {
  //             console.log(err)
  //         }
  //     })
  // }
  onFinish = values => {
    console.log('Received values of form: ', values);
    this.authChange(values)
  };
  handleSubmit = (e) => {
    const _this = this
    e.preventDefault();
    _this.authChange({
      username: 'admin',
      password: '123456',
    })
  }

  onNextChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
  }

  authChange = (values) => {
    console.log(values)
    const { dispatch, authChangeAction } = this.props
    // login(values).then(res => {
    //   console.log(res)
    //   if (res.code === 1) {
    //     const action = authChangeAction(JSON.stringify(res.user))
    //     dispatch(action)
    //   } else {
    //     // const action = authChangeAction('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9')
    //     // dispatch(action)
    //     message.error(res.mes)
    //   }

    // }).catch(err => {
    //   console.log(err)
    //   message.error(err.mes)
    // })

    setTimeout(() => {
        let res = {
            message: 'token获取成功',
            code: 1,
            data: {
                token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTgwMjg0MTI2LCJleHAiOjE1ODAzNzA1MjZ9.-uRlY6nl1QFpH9HUKwyvoZYlc-iMMNvAuJINTv0TtG4'
            }
        }
        const action =  authChangeAction(res.data.token)
        dispatch(action)
    }, 100);
  }

  render() {
    if (this.props.state.authed || localStorage.getItem('authed')) {
        return (
            <Redirect to="/user" />
        )
    }
    return (
      <div className="wrapper_login">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={this.onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
        {/* Or <a href="">register now!</a> */}
          </Form.Item>
        </Form></div>
    );
  }
}

// const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm)
export default NormalLoginForm
