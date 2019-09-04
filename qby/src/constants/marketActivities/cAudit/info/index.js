import React, { Component } from "react";
import { Collapse,Modal } from "antd";
import { connect } from 'dva';
import DetailBase from "../../CtipActivity/components/DetailBase";
import DetailDiscount from "../../CtipActivity/components/DetailDiscount";
import DetailLog from "../components/AuditLog";
import DetailGoods from "../../CtipActivity/components/DetailGoods";
import DetailWebShow from "../../CtipActivity/components/DetailWebShow";
import DetailAudit from "../components/Audit";
import { auditLogApi } from "../../../../services/marketActivities/cAudit";
import {
  getBaseInfoApi,
  getDiscountInfoApi,
  goExportApi
} from "../../../../services/marketActivities/ctipActivity";
const { confirm } = Modal;
const formItemLayout = {
     labelCol: 3,
     wrapperCol:20,
   };
const { Panel } = Collapse;

class CtipDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list:[],
      baseInfo:{
        costApportions:[]
      },
      goodsInfo:{
        promotionType:22,//10.单品直降 11.单品多级满赠 20.专区多级满元赠 21.专区多级满件赠 22专区多级满元减 23.专区满件减免
        promotionRules:[],
        promotionProducts:[]
      },
      logList:[]
    }
  }
  componentDidMount() {
    this.getInfo(this.props.data.promotionId);
  }
  getInfo(promotionId) {
    getBaseInfoApi({promotionId})
    .then((res) => {
      const { code, data } =res;
      if(code == '0') {
        data.costApportions&data.costApportions.map((el,index)=>el.key=index)
        this.setState({ baseInfo:data })
      }
    })
    getDiscountInfoApi({promotionId})
    .then((res) => {
      let { data, code } =res;
      let { goodsInfo } =this.state;
      data.promotionRules=data.promotionRules?data.promotionRules:[];
      data.promotionRules.map((el,index)=>el.key=++index);
      data.promotionProducts.map((el,index)=>el.key=++index);
      goodsInfo={...goodsInfo,...data}
      if(code == '0') {
        this.setState({ goodsInfo: goodsInfo });
      }
    })
    auditLogApi({ approvalId:this.props.data.approvalId }).then(res => {
      if(res.code == '0'){
        this.setState({
          list:res.list
        });
      }
    });
  }
  //导出数据
	exportData = (type,data) => {
		const values={
			type:93,
			downloadParam:{promotionId:this.props.data.promotionId},
		}
		goExportApi(values)
    .then((json) => {
			if(json.code=='0'){
				var _dispatch=this.props.dispatch
				confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						_dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						_dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
					onCancel() {

					},
	  			});
			}
		})
	}
  render() {
    const { data } = this.props;
    const { type } = this.props.data;
    const { baseInfo, goodsInfo,list } = this.state;
    return(
      <div>
        <Collapse accordion defaultActiveKey={['1']}>
          <Panel header="活动信息" key="1">
            <DetailBase {...formItemLayout} info={baseInfo}/>
          </Panel>
          <Panel header="前端展示" key="2">
            <DetailWebShow  {...formItemLayout} info={baseInfo}/>
          </Panel>
          {
            goodsInfo.promotionType!=10&&goodsInfo.promotionType!=11&&
            <Panel header="优惠内容" key="3">
              <DetailDiscount  {...formItemLayout} info={goodsInfo}/>
            </Panel>
          }
          <Panel header="活动商品" key="4">
            <DetailGoods {...formItemLayout} info={goodsInfo} exportData={this.exportData}/>
          </Panel>
          {type == "detail" && (
            <Panel header="日志" key="5">
              <DetailLog {...formItemLayout} list={list}/>
            </Panel>
          )}
          {type == "edit" && (
            <Panel header="审核结果" key="6">
              <DetailAudit {...formItemLayout} approvalId={data.approvalId} componkey={data.componkey} />
            </Panel>
          )}
        </Collapse>
      </div>
    )
  }
}
function mapStateToProps(state) {
	return state;
}
export default connect(mapStateToProps)(CtipDetail);;
