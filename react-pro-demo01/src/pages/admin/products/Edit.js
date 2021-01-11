import { Button, Card, Col, Form, Input, Row, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { serverUrl } from '../../../config'
import { productsAddApi, productsInfoApi, productsEditApi, uploadFile } from '../../../services/products'


const Edit = (props) => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setloading] = useState(false)

  function onFinish(value) {
    console.log(value);
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
  function onFinishFailed(value) {
    console.log(value);
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
    price: [{ required: true, validator: checkPrice }],
    coverImg: [{ required: true, message: '必填项' }],
  }
  useEffect(() => {
    if (props.match.params.id) {
      getProductInfo(props.match.params.id)
    }
  }, [])
  const getProductInfo = (id) => {
    productsInfoApi(id).then(res => {
      form.setFieldsValue(res.data)
      setImageUrl(`${serverUrl}${res.data.coverImg}`)
    })
  }

  const handleChange = (info) => {
    if (info.file.status === 'done') {
      setImageUrl(serverUrl + info.file.response.info)
      setloading(true)
    }
  }
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );
  const normFile = (e) => {
    if (e.file.status === 'done') {
      console.log(e.file.response.info);
      return e.file.response.info
    }
  }
  return (
    <Card title='编辑' extra={<Button type='default' onClick={() => props.history.push('/admin/products')}>返回</Button>}>

      <Form form={form} name='base' {...formLayout} onFinish={onFinish} onFinishFailed={onFinishFailed} initialValues={{}}>
        <Form.Item label="名称" name='name' rules={rules.name}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="价格" name='price' rules={rules.price}>
          <Input></Input>
        </Form.Item>

        <Form.Item label='图片' name="coverImg" rules={rules.coverImg} valuePropName='coverImg' getValueFromEvent={normFile}>
          <Upload
            name="file"
            listType="picture-card"
            className="avatar-uploader"
            showUploadList={false}
            action={`${serverUrl}/api/v1/common/file_upload`}
            onChange={handleChange}
          >
            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
          </Upload>
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