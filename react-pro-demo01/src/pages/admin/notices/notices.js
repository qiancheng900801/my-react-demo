import { Button, Card, List } from 'antd';
import { connect } from 'react-redux'
import React from 'react';
function Notices(props) {
  const dataSource = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ]
  const readAll = () => {
    console.log(props);
    props.dispatch({
      type: 'READ_ALL'
    })
  }
  return (
    <Card title='消息中心' extra={<Button onClick={readAll}>全部已读</Button>}>
      <List bordered dataSource={dataSource} renderItem={item => <List.Item extra={<Button>设为已读</Button>}>{item}</List.Item>}></List>
    </Card>

  )
}
export default connect(state => state)(Notices)