import React,{ Component }from 'react',
import { connect } from 'dva'
import {Modal,Form,Input} from 'antd'

const FormItem = Form.Item;

class SplitOrderModal extends Component{
  constructor(props){
    super(props);
    this.state = {
      newList:[],
      apartList:[],
    }
  }
  render(){
    return(
      <div>
      <Modal
        width={920}
        title='订单拆分'
        visible={splitVisible}
        onCancel={this.onSplitCancel}
      >
        <div className='wrapper_order'>
          <div className='old_order'>
            <div className='origin_order'>
              <p>原始订单号：YH02130000700001</p>
              <p>　
                <span>原始订单实付金额：33.00</span>　
                <span>订单剩余实付金额：22.00</span>
              </p>
            </div>
            <Qtable
              dataSource={apartList}
              columns={columns1}
              bordered
            />
          </div>
          <div className='old_order'>
            <div className='origin_order'>
              <p>原始订单号：YH02130000700001</p>
              <p>
                <span>原始订单实付金额：33.00</span>　
                <span>订单剩余实付金额：22.00</span>
              </p>
            </div>
            <Qtable
              dataSource={newList}
              columns={columns2}
              bordered
            />
          </div>
        </div>
      </Modal>
      </div>
    )
  }
}
export default SplitOrderModal
