
import '../../style/dataManage.css';
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs,Input,Form,AutoComplete} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';

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
    //tab点击
    tabChange = (index)=>{
        this.setState({
            key:index
        })
    }

  	render(){
        const rolelists=this.props.data.rolelists
		//门店成本
		const spchengrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.shopCost.query"
        })
        //成本核算
        const suanchengrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.pd.costmonthdata.query"
        })
        //采购到货
        const cgchengrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.ws.purchasedata.query"
        })
        //门店发票
        const piaorole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.shopdata.query"
        })
        const { getFieldDecorator } = this.props.form;       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1"  onTabClick={this.tabChange.bind(this)}>
                    {
                        spchengrole?
                        <TabPane tab="门店成本" key="1">
                            {this.state.key == 1 && <MdCostIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        suanchengrole?
                        <TabPane tab="成本核算" key="2">
                            {this.state.key == 2 && <CostCheckIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        cgchengrole?
                        <TabPane tab="采购到货" key="3">
                            {this.state.key == 3 && <CgArrivalIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        piaorole?
                        <TabPane tab="门店发票" key="4">
                            {this.state.key == 4 && <MdInvoiceIndex/>} 
                        </TabPane>
                        :null
                    }
                </Tabs>
        	</div>
      	)
    }
    componentDidMount(){
        const rolelists=this.props.data.rolelists
		//门店成本
		const spchengrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.shopCost.query"
        })
        //成本核算
        const suanchengrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.pd.costmonthdata.query"
        })
        //采购到货
        const cgchengrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.ws.purchasedata.query"
        })
        //门店发票
        const piaorole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sp.shopdata.query"
        })
        if(spchengrole){
            this.tabChange('1')
        }else{
            if(suanchengrole){
                this.tabChange('2')
            }else{
                if(cgchengrole){
                    this.tabChange('3')
                }else{
                    if(piaorole){
                        this.tabChange('4')
                    }   
                }
            }
        }
    }
      
}

const DataFinanceIndex = Form.create()(DataFinanceIndexForm);

export default connect()(DataFinanceIndex);
