import Imgmodel from '../../../../../components/model/modelimg';
import { Row, Col } from 'antd';

function DetailWebShow({...props}) {
  const { labelCol, wrapperCol } =props;
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            <Col span={labelCol}>是否需要预热：</Col>
            <Col span={wrapperCol}>是</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>预热时间：</Col>
            <Col span={wrapperCol}>  2017-8-19  00:00 至 2017-9-20  00:00</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>配置活动主题logo图：</Col>
            <Col span={wrapperCol}><Imgmodel picUrl=""/></Col>
          </Row>
         </div>
}
export default DetailWebShow;
