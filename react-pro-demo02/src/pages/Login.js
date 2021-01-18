import React from 'react';
import { Input, Form, Button } from 'antd'
function Login(props) {
  function clk(params) {
    console.log(props);
    props.history.replace('/')
  }
  return (
    <Form>
      <Form.Item>
        <Input></Input>
      </Form.Item>

      <Form.Item>
        <Input></Input>
      </Form.Item>

      <Form.Item>
        <Button onClick={clk}>登录</Button>
      </Form.Item>
    </Form>
  )
}
export default Login