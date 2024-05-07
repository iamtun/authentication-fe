import { Button, Form, FormProps, Input } from 'antd';
import React from 'react';

import styles from './Login.module.css';
import authService from '../../../services/authService';
import localStorageService from '../../../services/localStorageService';
import { APP_KEY } from '../../../common/constant';
import { useNavigate } from 'react-router-dom';

type FieldType = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const { password, username } = values;
    authService
      .login({ password, username })
      .then((data) => {
        localStorageService.setValue(APP_KEY.token, data.access_token);
        localStorageService.setValue(APP_KEY.refreshToken, data.refresh_token);
        navigate('/');
      })
      .catch((err) => console.error(err));
  };

  const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (
    errorInfo,
  ) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={styles.container}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit" style={{ width: 'auto' }}>
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
