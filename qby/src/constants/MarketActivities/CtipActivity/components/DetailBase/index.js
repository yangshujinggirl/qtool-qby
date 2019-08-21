import { Row, Col, Table } from 'antd';
import { columnsCreatInfo } from '../../columns';
import './index.less';

function DetailBase({...props}) {
  const { labelCol, wrapperCol, info } =props;
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            <Col span={labelCol}>活动ID：</Col>
            <Col span={wrapperCol}>{info.promotionId}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动状态：</Col>
            <Col span={wrapperCol}>{info.statusStr}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动名称：</Col>
            <Col span={wrapperCol}>{info.name}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动时间：</Col>
            <Col span={wrapperCol}>{info.beginTime}至 {info.endTime}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动目的：</Col>
            <Col span={wrapperCol}>{info.purposeTypes}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动级别：</Col>
            <Col span={wrapperCol}>{info.level}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动端：</Col>
            <Col span={wrapperCol}>{info.platform}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动门店：</Col>
            <Col span={wrapperCol}>{info.shopType}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动成本分摊比例：</Col>
            <Col span={wrapperCol}>
            <Table
              bordered
              pagination={false}
              columns={columnsCreatInfo(2)}
              dataSource={info.costApportions?info.costApportions:[]}/>
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动成本承担方：</Col>
            <Col span={wrapperCol}>Qtools，门店，小红脸供应商，奥乐齐供应商</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销范围：</Col>
            <Col span={wrapperCol}>{info.pdScope}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销类型：</Col>
            <Col span={wrapperCol}>{info.promotionType}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销级别：</Col>
            <Col span={wrapperCol}>{info.pdScope}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>商品种类：</Col>
            <Col span={wrapperCol}>{info.pdKind}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>可同享的单品促销类型：</Col>
            <Col span={wrapperCol}>{info.sharedPromotionType}</Col>
          </Row>
         </div>
}
export default DetailBase;
