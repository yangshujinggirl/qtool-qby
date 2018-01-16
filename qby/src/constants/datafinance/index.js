
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs,Input,Form,AutoComplete} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import '../../style/dataManage.css';

import MdCostIndex from './mdCost/index';
import CostCheckIndex from './costCheck/index';
import CgArrivalIndex from './cgArrival/index';
import MdInvoiceIndex from './mdInvoice/index';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class DataFinanceIndexForm extends React.Component{
	state = {
        key:"1",
    };

    tabChange = (index)=>{
        this.setState({
            key:index
        })
    }

  	render(){
        const { getFieldDecorator } = this.props.form;       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1"  onTabClick={this.tabChange.bind(this)}>
                    <TabPane tab="门店成本" key="1">
                        {this.state.key == 1 && <MdCostIndex/>} 
                    </TabPane>
                    <TabPane tab="成本核算" key="2">
                        {this.state.key == 2 && <CostCheckIndex/>} 
                    </TabPane>
                    <TabPane tab="采购到货" key="3">
                        {this.state.key == 3 && <CgArrivalIndex/>} 
                    </TabPane>
                    <TabPane tab="门店发票" key="4">
                        {this.state.key == 4 && <MdInvoiceIndex/>} 
                    </TabPane>
                </Tabs>
        	</div>
      	)
  	}
}

const DataFinanceIndex = Form.create()(DataFinanceIndexForm);

export default connect()(DataFinanceIndex);
