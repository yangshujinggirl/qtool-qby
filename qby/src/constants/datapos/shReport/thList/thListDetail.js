import { Component } from 'react'
import {getDetail} from '../../../../services/datapos/shReport/thList'
import Qtable from '../../../../components/Qtable/index';
class ThListDetail extends Component {
  constructor(props){
    super(props);
    this.state={
      spOrderNo:'',
      qtySum:'',
      statusStr:'',
      createTime:'',
      updateTime:'',
      details:[]
    }
    this.columns = [{
          title: '商品条码',
          dataIndex: 'pdBarcode',
      },{
          title: '商品名称',
          dataIndex: 'pdName',
      },{
          title: '规格',
          dataIndex: 'pdSkuType',
      },{
          title: '退货数量',
          dataIndex: 'qty',
      }];
    }
  componentWillMount(){
    const {wsAsnId,spShopId,spOrderNo,qtySum,statusStr,createTime,updateTime} = this.props.data;
    this.setState({
      spOrderNo,
      qtySum,
      statusStr,
      createTime,
      updateTime
    })
    getDetail({wsAsnId,spShopId})
    .then(res=>{
      if(res.data == '0'){
        this.setState({
          details:res.details
        });
      }
    })
  }
  render(){
    const {spOrderNo,qtySum,statusStr,createTime,updateTime,details} = this.state;
    return (
      <div className="ph-info">
          <div className="scroll-wrapper">
              <div className="info-title">
                  定单信息
              </div>
              <div className="info-content">
                  <label>订单号：</label><span>{spOrderNo}</span>
                  <label>退货商品总数：</label><span>{qtySum}</span>
                  <label>订单状态：</label><span>{statusStr}</span>
                  <label>退货时间：</label><span>{createTime}</span>
                  <label>退货完成时间：</label><span>{updateTime}</span>
              </div>
              <div className="info-title">
                  商品收货明细
              </div>
              <Qtable
                dataSource={details}
                columns = {this.columns}/>
          </div>
      </div>
    )
  }
}
export default ThListDetail
