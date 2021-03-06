import { Row, Col, Table } from 'antd';
import { columnsCreatInfo } from '../../columns';
import { purposeTypesOption, levelOption, pdScopeOption, prefectureOption, promotionScopeOption, pdKindOption, singleOption } from '../optionMap.js';
import './index.less';

function DetailBase({...props}) {
  const { labelCol, wrapperCol, info } =props;
  let lxOption=info.promotionScope==1?singleOption:prefectureOption;
  let shareOption = info.promotionScope==1?prefectureOption:singleOption;

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
            <Col span={wrapperCol}>
            {
              info.purposeTypes&&info.purposeTypes.map((el,index) =>{
                return purposeTypesOption.map((item) => {
                  if(el==item.key) {
                    return <span key={index}>
                          {item.value}{el!='5'?'，':':'}
                          {el=='5'&&<span>{info.otherPurpose}</span>}
                    </span>
                  }
                })
              })
            }
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动级别：</Col>
            <Col span={wrapperCol}>
            {
              levelOption.map((el,index)=>(
                <span key={index}>{info.level==el.key&&el.value}</span>
              ))
            }
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动端：</Col>
            <Col span={wrapperCol}>线上App/小程序</Col>
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
              columns={columnsCreatInfo(info.costApportions)}
              dataSource={info.costApportions}/>
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>活动成本承担方：</Col>
            <Col span={wrapperCol}>
            {
              info.costApportions.map((el) => (
                <span key={el.costApportionId}>{el.bearerStr},</span>
              ))
            }
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销范围：</Col>
            <Col span={wrapperCol}>
            {
              promotionScopeOption.map((el,index) =>(
                <span key={index}>{info.promotionScope==el.key&&el.value}</span>
              ))
            }
            </Col>
          </Row>
          <Row className="item-row">
            <Col span={labelCol}>促销类型：</Col>
            <Col span={wrapperCol}>
            {
              lxOption.map((el,index)=>(
                <span key={index}>{info.promotionType==el.key&&el.value}</span>
              ))
            }
            </Col>
          </Row>
          {
            info.promotionScope==2&&
              <Row className="item-row">
                <Col span={labelCol}>促销级别：</Col>
                <Col span={wrapperCol}>
                {
                  pdScopeOption.map((el,index) =>(
                    <span key={index}>{info.pdScope==el.key&&el.value}</span>
                  ))
                }
                </Col>
              </Row>
          }
          {
            info.pdScope==2&&
            <Row className="item-row">
              <Col span={labelCol}>商品种类：</Col>
              <Col span={wrapperCol}>
              {
                pdKindOption.map((el,index) => (
                  <span key={index}>{info.pdKind==el.key&&el.value}</span>
                ))
              }
              </Col>
            </Row>
          }
          <Row className="item-row">
            <Col span={labelCol}>可同享的促销类型：</Col>
            {
              info.sharedPromotionType=='-1'?
              <Col span={wrapperCol}>
                不可同享
              </Col>
              :
              <Col span={wrapperCol}>
              {
                shareOption.map((el,index) => (
                  <span key={index}>{info.sharedPromotionType==el.key&&el.value}</span>
                ))
              }
              </Col>
            }
          </Row>
         </div>
}
export default DetailBase;
