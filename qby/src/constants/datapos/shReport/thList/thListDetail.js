import { Component } from 'react'
import {getDetail} from '../../../../services/datapos/shReport/thList'
import Qtable from '../../../../components/Qtable/index';
class ThListDetail extends Component {
  constructor(props){
    super(props);
    this.state={

    }
    this.columns = [{
          title: '商品条码',
          dataIndex: 'pdBarcode',
      },{
          title: '商品名称',
          dataIndex: 'pdSpuName',
      },{
          title: '规格',
          dataIndex: 'pdSkuType',
      },{
          title: '退货数量',
          dataIndex: 'price',
      }];
    }
  componentWillMount(){

  }
  render(){
    const dataList= []
    return (
      <div className="ph-info">
          <div className="scroll-wrapper">
              <div className="info-title">
                  定单信息
              </div>
              <div className="info-content">
                  <label>订单号：</label><span>1</span>
                  <label>退货商品总数：</label><span>1</span>
                  <label>订单状态：</label><span>1</span>
                  <label>退货时间：</label><span>1</span>
                  <label>退货完成时间：</label><span>1</span>
              </div>
              <div className="info-title">
                  商品收货明细
              </div>
              <Qtable
                dataSource={dataList}
                columns = {this.columns}/>
          </div>
      </div>
    )
  }
}
export default ThListDetail
