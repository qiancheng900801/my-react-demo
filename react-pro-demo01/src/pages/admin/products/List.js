import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd'
import { productsListApi, productsDelApi, productsEditApi } from '../../../services/products'
import { serverUrl } from '../../../config'
import { connect } from 'react-redux'
import { loadProduct } from '../../../store/actions/products'

const List = (props) => {
  console.log(props);
  // const [list, setList] = useState([])
  // const [total, setTotal] = useState(0)
  // const [current, setPageNumber] = useState(1)
  // const [pageSize, setPageSize] = useState(2)
  let { current, list, total, pageSize } = props

  useEffect(() => {
    // getList()

    props.dispatch(loadProduct({ current: 1, pageSize: 2 }))
    return () => {
      props.dispatch(loadProduct({ current: 1, pageSize: 2 }))

    }

  }, [current, pageSize])
  // const getList = () => {
  //   productsListApi({ per: pageSize, page: current }).then(res => {
  //     // setTotal(res.data.totalCount)
  //     // setList(res.data.products)
  //   })
  // }
  const deleteProduct = (id) => {
    productsDelApi(id).then(() => props.dispatch(loadProduct({ current, pageSize })))
  }
  const changeSale = (recode) => {
    productsEditApi(recode._id, { onSale: !recode.onSale }).then(() => {
      message.destroy()
      message.success(recode.onSale ? '下架成功！' : '上架成功！')
      props.dispatch(loadProduct({ current, pageSize }))
    })
  }
  const pageChange = (page, pageSize) => {
    // setPageNumber(page)
    props.dispatch(loadProduct({ current: page, pageSize }))
  }
  const sizeChange = (page, pageSize) => {
    // setPageSize(pageSize)
    props.dispatch(loadProduct({ current: page, pageSize }))
  }

  const columns = [
    { title: '序号', align: 'center', key: '_id', width: 80, render: (text, record, index) => (current - 1) * pageSize + index + 1 },
    { title: '名字', align: 'center', dataIndex: 'name' },
    { title: '价格', align: 'center', dataIndex: 'price' },
    { title: '图片', align: 'center', render: (recode) => (recode.coverImg ? <img style={{ width: '160px' }} src={recode.coverImg} alt='主图' /> : '暂无图片') },
    { title: '说明', align: 'center', render: (recode) => (recode.descriptions || '无') },
    { title: '是否在售', align: 'center', render: (recode) => (recode.onSale ? '在售' : '已下架') },
    {
      title: '操作', align: 'center', render: (text, record, index) => (
        <div>
          <Button type='primary' size='small' onClick={() => props.history.push(`/admin/products/edit/${record._id}`)}>修改</Button>
          <Popconfirm
            title="是否删除?"
            onConfirm={() => deleteProduct(record._id)}
            onCancel={() => { }}
            okText="Yes"
            cancelText="No"
          >
            <Button style={{ margin: '0 1rem' }} type='danger' size='small'>删除</Button>
          </Popconfirm>
          <Button size='small' onClick={() => changeSale(record)}>{record.onSale ? '下架' : '上架'}</Button>
        </div>
      )
    }
  ]
  return (
    <Card
      title='商品列表'
      extra={
        <Button
          type='primary'
          size='small'
          onClick={() => props.history.push('/admin/products/edit')}>
          添加商品
        </Button>}>
      <Table rowKey="_id" columns={columns} bordered dataSource={list} pagination={{ current, total, pageSize, showSizeChanger: true, pageSizeOptions: [2, 3, 4], onChange: pageChange, onShowSizeChange: sizeChange }}  >
      </Table>
    </Card>
  );
}

export default connect(state => state.products)(List);