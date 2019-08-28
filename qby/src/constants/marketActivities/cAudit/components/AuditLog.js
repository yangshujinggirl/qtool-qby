import { Row, Col, Table, Button } from 'antd';

const columns = [
  {
    title: '操作类型',
    dataIndex: 'operateType',
  },
  {
    title: '操作描述',
    dataIndex: 'opinion',
  },
  {
    title: '操作时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作人',
    dataIndex: 'createUserStr',
  },
];

function DetailLog({...props}) {
  const { list } = props;
  return <div className="detail-mode-wrap">
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={list}/>
         </div>
}
export default DetailLog;
