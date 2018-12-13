import { Component } from 'react'
import {getDetail} from '../../../../services/datapos/shReport/thList'
class ThListDetail extends Component {
  constructor(props){
    super(props);
    this.state={

    }
  }
  componentWillMount(){

  }
  render(){
    return (
      <div>
        <div className="info-title">
            配货单信息
        </div>
        <div className="info-content">
            <label>配货单号：</label><span>{this.state.detailsInfo.orderNo}</span>
            <label>商品总数：</label><span>{this.state.detailsInfo.qtySum}</span>
            <label>已收商品数量：</label><span>{this.state.detailsInfo.receiveQty}</span>
            <label>订单状态：</label><span>{this.state.detailsInfo.statusStr}</span>
        </div>
        <div className="info-title">
            商品收货明细
        </div>
      </div>
    )
  }
}
export default ThListDetail
