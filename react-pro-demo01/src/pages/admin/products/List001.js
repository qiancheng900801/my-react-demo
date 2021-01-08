import React, { useEffect, useState } from 'react';
import { Card, Table, Button, Popconfirm, message } from 'antd'
import { productsListApi, productsDelApi, productsEditApi } from '../../../services/products'


const List = (props) => {

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [current, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    getList()
  }, [current, pageSize])
  const getList = () => {
    productsListApi({ per: pageSize, page: current }).then(res => {
      setTotal(res.data.totalCount)
      setList(res.data.products)
    })
  }
  const deleteProduct = (id) => {
    productsDelApi(id).then(() => getList())
  }
  const changeSale = (recode) => {
    productsEditApi(recode._id, { onSale: !recode.onSale }).then(() => {
      message.destroy()
      message.success(recode.onSale ? '下架成功！' : '上架成功！')
      getList()
    })
  }
  const pageChange = (page, pageSize) => {
    setPageNumber(page)
  }
  const pageSizeChange = (page, pageSize) => {
    setPageSize(pageSize)
  }

  const columns = [
    { title: '序号', key: '_id', width: 80, render: (text, record, index) => (current - 1) * pageSize + index + 1 },
    { title: '名字', dataIndex: 'name' },
    { title: '价格', dataIndex: 'price' },
    { title: '是否在售', render: (recode) => (recode.onSale ? '在售' : '已下架') },
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
      <Table rowKey="_id" columns={columns} bordered dataSource={list} pagination={{ current, pageSize, total, showSizeChanger: true, pageSizeOptions: [2, 5, 10], onChange: pageChange, onShowSizeChange: pageSizeChange }}  >
      </Table>
    </Card>
  );
}

export default List;