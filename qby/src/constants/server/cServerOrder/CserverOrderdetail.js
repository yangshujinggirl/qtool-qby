import React, { Component } from 'react';
import { connect } from 'dva';
import { Card, Table, Row, Col } from 'antd';
import moment from 'moment';
import './CserverOrderdetail.less';


const columns = [{
    title:'回复内容',
    dataIndex:'replyContent',
    key:'replyContent'
  },{
    title:'处理人',
    dataIndex:'replyNickName'
  },{
    title:'创建时间',
    dataIndex:'createrTime',
    key:'createrTime',
    render:(text, record, index) => {
      return <span>{record.createrTime?moment(record.createrTime).format('YYYY-MM-DD'):''}</span>
    }
  }]

class CserverOrderdetail extends  Component {
  constructor(props) {
    super(props);
  }
  componentDidMount(){
    this.initPage()
  }
  initPage() {
    //数据重置
    this.props.dispatch({
      type:'cServerOrder/resetData',
    })
    this.props.dispatch({
      type:'cServerOrder/fetchDetail',
      payload:{udeskTicketId:this.props.data.udeskTicketId}
    })
  }
  render() {
    const { detailInfo, fileDomain } =this.props.cServerOrder;
    return (
      <div className="cserver-order-detail-pages">
        <div className="cserver-page-wrap">
          {
            detailInfo.udeskTicketVo&&
            <div>
              <div className="row">
                <Card title='工单基础信息'>
          				<div className='detail-list'>
          					<div className='label-item'><label>工单id：</label><span>{detailInfo.udeskTicketVo.udeskTicketId}</span></div>
          					<div className='label-item'><label>工单状态：</label><span>{detailInfo.udeskTicketVo.status}</span></div>
          					<div className='label-item'><label>优先级：</label><span>{detailInfo.udeskTicketVo.priority}</span></div>
          					{/* <div className='label-item'><label>渠道：</label><span>{detailInfo.udeskTicketVo.channel}</span></div> */}
          					{/* <div className='label-item'><label>用户电话：</label><span>{detailInfo.udeskTicketVo.cellPhone}</span></div> */}
          					<div className='label-item'><label>受理客服：</label><span>{detailInfo.udeskTicketVo.agentGroupName}</span></div>
          					<div className='label-item'><label>创建时间：</label><span>{detailInfo.udeskTicketVo.createrTime}</span></div>
          					<div className='label-item'><label>结束时间：</label><span>{detailInfo.udeskTicketVo.closeTime}</span></div>
          				</div>
          			</Card>
              </div>
              <div className="row">
                <Card title='工单内容'>
          				<div className='content-list'>
                    <Row className='label-item'>
                      <Col span={2}>工单主题：</Col>
                      <Col span={20}>{detailInfo.udeskTicketVo.subject}</Col>
                    </Row>
                    <Row className='label-item'>
                      <Col span={2}>工单内容：</Col>
                      <Col span={20}>
                      {
                        detailInfo.picPath&&detailInfo.picPath.length?
                          <div className="img-list">
                            {
                              detailInfo.picPath.map((el,index) => (
                                <div className="img-item">
                                  <image src={`${detailInfo.fileDomain}${el}`}></image>
                                </div>
                              ))
                            }
                          </div>
                        :
                          <span className="content-wrap">
                            {detailInfo.udeskTicketVo.content}
                          </span>
                      }
                      </Col>
                    </Row>
          				</div>
          			</Card>
              </div>
            </div>
          }
          <div className="row">
    				<div>
    					<Table
                bordered
                title={()=>'回复信息'}
                dataSource={detailInfo.replys}
                columns={columns}
                pagination={false}></Table>
    				</div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { cServerOrder } =state;
  return { cServerOrder };
}
export default connect(mapStateToProps)(CserverOrderdetail);
