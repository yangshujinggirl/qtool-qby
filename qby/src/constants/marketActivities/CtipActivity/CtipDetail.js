import React , { Component } from 'react';
import { Collapse, Modal } from 'antd';
import { connect } from 'dva';
import DetailBase from './components/DetailBase';
import DetailDiscount from './components/DetailDiscount';
import DetailLog from './components/DetailLog';
import DetailGoods from './components/DetailGoods';
import DetailWebShow from './components/DetailWebShow';
import { getBaseInfoApi, getDiscountInfoApi, getLogApi, goExportApi } from '../../../services/marketActivities/ctipActivity';

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
    this.props.dispatch({type: 'tab/loding',payload:true})
    getBaseInfoApi({promotionId})
    .then((res) => {
      const { code, data } =res;
      if(code == '0') {
        data.costApportions&data.costApportions.map((el,index)=>el.key=index)
        this.setState({ baseInfo:data })
      }
      this.props.dispatch({type: 'tab/loding',payload:false})
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
      this.props.dispatch({type: 'tab/loding',payload:false})
    })
    getLogApi({promotionId})
    .then((res) => {
      const { code, list } =res;
      if(code == '0') {
        list&&list.map((el,index)=>el.key=index)
        this.setState({ logList:list })
      }
      this.props.dispatch({type: 'tab/loding',payload:false})
    })
  }
  //导出数据
	exportData = (type,data) => {
    this.props.dispatch({type: 'tab/loding',payload:true})
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
        this.props.dispatch({type: 'tab/loding',payload:false})
			}
		})

	}
  render() {
    const { data } =this.props;
    const { baseInfo, goodsInfo, logList } = this.state;
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
          <Panel header="日志" key="5">
            <DetailLog  {...formItemLayout} promotionId={data.promotionId} list={logList}/>
          </Panel>
        </Collapse>
      </div>
    )
  }
}
function mapStateToProps(state) {
	return state;
}
export default connect(mapStateToProps)(CtipDetail);;
