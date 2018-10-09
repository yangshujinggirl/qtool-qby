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
        
      </div>
    )
  }
}
export default SplitOrderModal
