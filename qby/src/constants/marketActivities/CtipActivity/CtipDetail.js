import React , { Component } from 'react';
import { Collapse } from 'antd';
import DetailBase from './components/DetailBase';
import DetailDiscount from './components/DetailDiscount';
import DetailLog from './components/DetailLog';
import DetailGoods from './components/DetailGoods';
import DetailWebShow from './components/DetailWebShow';
import { getBaseInfoApi, getDiscountInfoApi, getLogApi } from '../../../services/marketActivities/ctipActivity';

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
    getLogApi({promotionId})
    .then((res) => {
      const { code, list } =res;
      if(code == '0') {
        list&&list.map((el,index)=>el.key=index)
        this.setState({ logList:list })
      }
    })
  }
  exportData=()=> {
    console.log('导出数据')
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

export default CtipDetail;
