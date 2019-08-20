import { Row, Col, Table, Button } from 'antd';
const columns = [
  {
    title: '序号',
    dataIndex: 'key',
  },
  {
    title: '商品编码',
    className: 'column-money',
    dataIndex: 'code',
  },
  {
    title: '商品名称',
    dataIndex: 'name',
  },
  {
    title: '商品规格',
    dataIndex: 'dis',
  },
  {
    title: '商品种类',
    dataIndex: 'sdc',
  },
  {
    title: 'C端售价',
    dataIndex: 'price',
  },
  {
    title: '活动最大可售卖数量',
    dataIndex: 'qty',
  },
];
const data = [];
function DetailGoods({...props}) {
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            共6条数据
            <Button type="primary">导出商品明细</Button>
          </Row>
          <Table
            bordered
            pagination={false}
            columns={columns}
            dataSource={data}/>
         </div>
}
export default DetailGoods;
