import Imgmodel from '../../../../../components/model/modelimg';
import { Row, Col } from 'antd';

function DetailWebShow({...props}) {
  const { labelCol, wrapperCol, info } =props;
  return <div className="detail-mode-wrap">
          <Row className="item-row">
            <Col span={labelCol}>是否需要预热：</Col>
            <Col span={wrapperCol}>{info.isWarmUp}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>预热时间：</Col>
            <Col span={wrapperCol}>{info.warmUpBeginTime}</Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>商品详情页横幅条背景图：</Col>
            <Col span={wrapperCol}><Imgmodel picUrl={info.pdDetailBannerPic}/></Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动主题logo图：</Col>
            <Col span={wrapperCol}><Imgmodel picUrl={info.logoPic}/></Col>
          </Row>
         </div>
}
export default DetailWebShow;
