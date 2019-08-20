import { Row, Col, Table } from 'antd';
import { columnsCreatInfo } from '../../columns';
import './index.less';

function DetailBase({...props}) {
  const { labelCol, wrapperCol } =props;
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            <Col span={labelCol}>活动ID：</Col>
            <Col span={wrapperCol}>6789869</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动状态：</Col>
            <Col span={wrapperCol}>待提交</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动名称：</Col>
            <Col span={wrapperCol}>Qtools周年庆299满赠专场</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动时间：</Col>
            <Col span={wrapperCol}>2017-8-19  00:00 至 2017-9-20  00:00</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动目的：</Col>
            <Col span={wrapperCol}>线上App，小程序</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动级别：</Col>
            <Col span={wrapperCol}>S级</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动端：</Col>
            <Col span={wrapperCol}>线上App，小程序</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动门店：</Col>
            <Col span={wrapperCol}>全部门店</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动成本分摊比例：</Col>
            <Col span={wrapperCol}>
            <Table
              bordered
              pagination={false}
              columns={columnsCreatInfo(2)}
              dataSource={[{budget:200},{bearer:123}]}/>
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动成本承担方：</Col>
            <Col span={wrapperCol}>Qtools，门店，小红脸供应商，奥乐齐供应商</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销范围：</Col>
            <Col span={wrapperCol}>专区促销</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销类型：</Col>
            <Col span={wrapperCol}>专区多级满赠（例：买AB送C）</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销级别：</Col>
            <Col span={wrapperCol}>自选商品</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>商品种类：</Col>
            <Col span={wrapperCol}>品牌直供商品</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>可同享的单品促销类型：</Col>
            <Col span={wrapperCol}>均不同享</Col>
          </Row>
         </div>
}
export default DetailBase;
