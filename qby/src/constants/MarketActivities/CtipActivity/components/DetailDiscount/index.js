import { Row, Col, Table } from 'antd';

const columns = [
  {
    title: '赠品编码',
    dataIndex: 'code',
  },
  {
    title: '赠品名称',
    className: 'column-money',
    dataIndex: 'money',
  },
  {
    title: '赠品B端售价',
    dataIndex: 'price',
  },
  {
    title: '最多可参与活动的赠品数',
    dataIndex: 'qty',
  },
  {
    title: '赠品B端在售库存',
    dataIndex: 'qty1',
  },
  {
    title: '赠品C端在售库存',
    dataIndex: 'qty2',
  },
];

const data = [];
function DetailDiscount({...props}) {
  const { labelCol, wrapperCol } =props;
  return <div className="detail-mode-wrap">
            <Row className="item-row">
              <Col span={labelCol}>赠送方式：</Col>
              <Col span={wrapperCol}>6789每种赠品均送869</Col>
            </Row>
            <Table
              pagination={false}
              columns={columns}
              dataSource={data}
              bordered
              title={() => '阶梯1：单笔订单满 2000 元，送以下商品'}/>
            <Table
              pagination={false}
              columns={columns}
              dataSource={data}
              bordered
              title={() => '阶梯2：单笔订单满 3000 元，送以下商品'}/>
         </div>
}
export default DetailDiscount;
