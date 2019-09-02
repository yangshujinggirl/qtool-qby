import React, { Component } from "react";
import { Collapse } from "antd";
import DetailBase from "../../CtipActivity/components/DetailBase";
import DetailDiscount from "../../CtipActivity/components/DetailDiscount";
import DetailLog from "../components/AuditLog";
import DetailGoods from "../../CtipActivity/components/DetailGoods";
import DetailWebShow from "../../CtipActivity/components/DetailWebShow";
import DetailAudit from "../components/Audit";
import { auditLogApi } from "../../../../services/marketActivities/cAudit";
import {
  getBaseInfoApi,
  getDiscountInfoApi
} from "../../../../services/marketActivities/ctipActivity";

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
        promotionRules:[{
          params:{
            leastAmount:10,//20
          },
          promotionGifts:[{
            pdCode:1,
            maxQty:1,
            pdName:'qwer',
            sellPrice:102,
            toBQty:1,
            toCQty:1,
          }]
        },{
          params:{
            leastAmount:20,
          },
          promotionGifts:[{
            pdCode:2,
            maxQty:3,
            pdName:'wq',
            sellPrice:10,
            toBQty:10,
            toCQty:30,
          }]
        }],
        // promotionRules:[{
        //   params:{
        //     leastQty:10,//22
        //     reduceQty:12,
        //   },
        // },{
        //   params:{
        //     leastQty:20,
        //     reduceQty:22,
        //   },
        // }],
        // promotionRules:[{//23
        //   params:{
        //     leastAmount:10,
        //     reduceAmount:12,
        //   },
        // },{
        //   params:{
        //     leastAmount:20,
        //     reduceAmount:22,
        //   },
        // }],
        promotionProducts:[]
      },
      logList:[]
    }
  }
  componentDidMount() {
    console.log(this.props)
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
  exportData=()=> {
    console.log('导出数据')
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

export default CtipDetail;
