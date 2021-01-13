import { Button, Card, Col, Form, Input, Row, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { serverUrl } from '../../../config'
import { productsAddApi, productsInfoApi, productsEditApi } from '../../../services/products'

import BraftEditor from 'braft-editor'
// 引入编辑器样式
import 'braft-editor/dist/index.css'

const Edit = (props) => {
  const [form] = Form.useForm()
  const [imageUrl, setImageUrl] = useState(null)
  const [loading, setLoading] = useState(false)
  const [editorState, setEditorState] = useState(BraftEditor.createEditorState(null))


  function onFinish(value) {
    let data = { ...value, coverImg: imageUrl, descriptions: editorState.toHTML() }
    console.log(data);
    if (props.match.params.id) {
      productsEditApi(props.match.params.id, data).then(res => {
        props.history.push('/admin/products')
      })
    } else {
      productsAddApi(data).then(res => {
        props.history.push('/admin/products')
      })
    }
  }

  const formLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 10, offset: 1 }
  }
  const checkPrice = (_, value) => {
    if (!value) {
      return Promise.reject('请输入价格!');
    }
    if (value > 1000) {
      return Promise.reject('价格太高!');
    }
    return Promise.resolve()
  }
  function checkDes() {
    console.log(editorState.toHTML());
    if (editorState.toHTML().length < 10) {
      return Promise.reject('必填!');
    }
    return Promise.resolve()
  }
  const rules = {
    name: [{ required: true, message: '请输入名称' }],
    price: [{ required: true, validator: checkPrice }],
    coverImg: [{ required: true, message: '必填项' }],
    descriptions: [{ required: true, validator: checkDes }],

  }
  useEffect(() => {
    if (props.match.params.id) {
      productsInfoApi(props.match.params.id).then(res => {
        form.setFieldsValue({ ...res.data })
        setImageUrl(res.data.coverImg)
        setEditorState(BraftEditor.createEditorState(res.data.descriptions))
      })
    }
  }, [])

  const handleChange = (info) => {
    if (info.file.status === 'uploading') {
      setLoading(true)
      return;
    }
    if (info.file.status === 'done') {
      setLoading(false)
      setImageUrl(serverUrl + info.file.response.info)
    }
  }

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  function handleEditorChange(value) {
    setEditorState(value)
  }
  return (
    <Card title='编辑' extra={<Button type='default' onClick={() => props.history.push('/admin/products')}>返回</Button>}>

      <Form form={form} name='base' {...formLayout} onFinish={onFinish}>
        <Form.Item label="名称" name='name' rules={rules.name}>
          <Input></Input>
        </Form.Item>
        <Form.Item label="价格" name='price' rules={rules.price}>
          <Input></Input>
        </Form.Item>

        <Form.Item label='图片' name='coverImg' rules={rules.coverImg} >
          <Form.Item>
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
        </Form.Item>

        <Form.Item label='介绍' name='descriptions' rules={rules.descriptions}>
          <div className="my-component">
            <BraftEditor
              value={editorState}
              onChange={handleEditorChange}
            />
          </div>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 5 }}>
          <Row>
            <Col span={3}>
              <Button type='primary' htmlType="submit">确认</Button>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </Card>

  );
}

export default Edit;