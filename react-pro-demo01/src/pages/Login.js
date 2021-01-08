import { Button, Card, Form, Input } from 'antd';
import React, { useState } from 'react';
import { setToken } from './utils/auth'
import { loginApi } from '../services/auth'

function Login(props) {
  const [loading, setLoading] = useState(false)
  const rules = {
    userName: [{ required: true, message: '必填' }],
    password: [{ required: true, message: '必填' }]
  }
  const [from] = Form.useForm()

  const onFinish = (value) => {
    setLoading(true)
    loginApi(value).then(res => {
      if (res.data.code === 'success') {
        setTimeout(() => {
          setToken(res.data.token)
          props.history.push('/admin/welcome')
        }, 2000)
      }
    })
  }
  return (
    <Card title='登录' style={{ width: '500px', margin: '0 auto' }}>
      <Form from={from} onFinish={onFinish}>
        <Form.Item label='账号' name='userName' rules={rules.name}>
          <Input placeholder="账号" />
        </Form.Item>

        <Form.Item label='密码' name='password' rules={rules.pwd}>
          <Input.Password placeholder="密码" />
        </Form.Item>
        <Form.Item >
          <Button type='primary' htmlType='submit' loading={loading}>登录</Button>
        </Form.Item>
      </Form>
    </Card>
  )
}

export default Login;