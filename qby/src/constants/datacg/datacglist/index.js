
import {GetServerData} from '../../../services/services';
import { Button, Icon ,Modal} from 'antd';
import { connect } from 'dva';
import DatacgTable from './table';
import DatacglistCard from './cardlist';











class DatacglistIndex extends React.Component{
    state = {};
    hindCliak=()=>{
        this.info()
    }

    info=()=>{
        Modal.info({
            title: 'This is a notification message',
            content: (
              <div>
                <p>some messages...some messages...</p>
                <p>some messages...some messages...</p>
              </div>
            ),
            onOk() {},
          });
    }
  	render(){
     	return(
        	<div>
                <p className='tr'><span onClick={this.hindCliak.bind(this)} className='pointer'>数据定义说明<Icon type="exclamation-circle-o" /></span></p>  
                <div className='mt10'><DatacglistCard/></div>
                <p className='mt20'>建议采购商品：</p>
                <div className='mt15'><DatacgTable/></div>
        	</div>
      	)
  	}
}



export default connect()(DatacglistIndex);
