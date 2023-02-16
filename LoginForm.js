import React, {useTransition} from 'react'
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import Form from '../components/Form';
import appStore from "../store/AppStore";
import Input from "./Input";
import Button from "../../../../../WebstormProjects/Button/Button";
import {observer} from 'mobx-react'
import {observable} from 'mobx'

@observer
export default class LoginForm extends React.Component {
  @observable login = "";
  @observable password = "";

  onFinish = async (e) => {
    const {history, onFinish} = this.props;
    await appStore.login(this.login, this.password, history)
    onFinish?.()
  }

  render() {
    return <div className='signIn__modal'>
      <h3>Вход: Админ</h3>

      <Form className="login-form" onFinish={this.onFinish}>
        <Form.Item>
          <Input
            className='input__login'
            prefix={<UserOutlined style={{color: "rgba(0,0,0,.25)"}} />}
            placeholder="Логин"
            value={this.login}
            onChange={login => (this.login = login)}
          />
        </Form.Item>
        <Form.Item>
          <Input
            className='input__password'
            prefix={<LockOutlined style={{color: "rgba(0,0,0,.25)"}} />}
            type="password"
            placeholder="Пароль"
            value={this.password}
            onChange={password => (this.password = password)}
          />
        </Form.Item>
        <Form.Item>
          <Button size="large"
                  type="primary"
                  htmlType="submit"
                  block
                  disabled={this.login.length < 3 || this.password < 2 || appStore.loading}
          >
            Войти
          </Button>
        </Form.Item>

      </Form>
    </div>;
  }
}
