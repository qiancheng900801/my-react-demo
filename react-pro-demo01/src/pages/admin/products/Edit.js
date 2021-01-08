import { Button, Card, Col, Form, Input, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { productsAddApi, productsInfoApi, productsEditApi } from '../../../services/products'


const Edit = (props) => {
  const [form] = Form.useForm()

  function onFinish(value) {
    if (props.match.params.id) {
      productsEditApi(props.match.params.id, value).then(res => {
        props.history.push('/admin/products')
      })
    } else {
      productsAddApi(value).then(res => {
        props.history.push('/admin/products')
      })
    }
  }
  function onReset() {
    form.resetFields()
  }
  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 1 }
  }
  const checkPrice = (_, value, callback) => {
    if (!value) {
      return Promise.reject('请输入价格!');
    }
    if (value > 1000) {
      return Promise.reject('价格太高!');
    }
    return Promise.resolve()
  }
  const rules = {
    name: [{ required: true, message: '请输入名称' }],
    price: [{ required: true, validator: checkPrice }]
  }
  useEffect(() => {
    if (props.match.params.id) {
      getProductInfo(props.match.params.id)
    }
  }, [])
  const getProductInfo = (id) => {
    productsInfoApi(id).then(res => {
      form.setFieldsValue(res.data)
    })
  }
  return (
    <Card title='编辑' extra={<Button type='default' onClick={() => props.history.push('/admin/products')}>返回</Button>}>

      <Form form={form} name='base' {...formLayout} onFinish={onFinish} initialValues={{}}>
        <Form.Item label="名称" name='name' rules={rules.name}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="价格" name='price' rules={rules.price}>
          <Input></Input>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 5 }}>
          <Row>
            <Col span={3}>
              <Button type='primary' htmlType="submit">确认</Button>
            </Col>
            <Col span={3}>
              <Button type='primary' onClick={onReset}>重置</Button>

            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>

  );
}

export default Edit;