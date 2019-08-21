import { Row, Col, Table, Button } from 'antd';

const columns = [
  {
    title: '操作类型',
    dataIndex: 'name',
  },
  {
    title: '操作描述',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '操作时间',
    dataIndex: 'address',
  },
  {
    title: '操作人',
    dataIndex: 'address',
  },
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    money: '￥300,000.00',
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Jim Green',
    money: '￥1,256,000.00',
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Joe Black',
    money: '￥120,000.00',
    address: 'Sidney No. 1 Lake Park',
  },
];

function DetailLog({...props}) {
  return <div className="detail-mode-wrap">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={data}/>
         </div>
}
export default DetailLog;
