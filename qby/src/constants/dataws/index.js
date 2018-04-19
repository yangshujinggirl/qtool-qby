
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatawsonIndex from './datawson/index';
import DatawshisIndex from './datawshis/index';
import DatawstimeIndex from './datawstime/index';

const TabPane = Tabs.TabPane;


class DatawsIndex extends React.Component{
	state = {
        key:'1'
    };

    tabChange = (index)=>{
        this.setState({
            key:index
        })
    }
  	render(){ 
        const rolelists=this.props.data.rolelists
		//实时库存
		const shicunrole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.invdata.query"
        })
        //历史库存
        const hiscunrole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.historyInvdata.query"
        })
        //商品效期
        const goodqirole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.validDate.query"
        })      
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1" onTabClick={this.tabChange.bind(this)}>
                    {
                        shicunrole?
                        <TabPane tab="实时库存" key="1">
                            {this.state.key == '1' && <DatawsonIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        hiscunrole?
                        <TabPane tab="历史库存" key="2">
                            {this.state.key == '2' && <DatawshisIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        goodqirole?
                        <TabPane tab="商品效期" key="3">
                            {this.state.key == '3' && <DatawstimeIndex/>} 
                        </TabPane>
                        :null

                    }
                    
                    
                    
                </Tabs>
        	</div>
      	)
    }
    componentDidMount(){
        const rolelists=this.props.data.rolelists
		//实时库存
		const shicunrole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.invdata.query"
        })
        //历史库存
        const hiscunrole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.historyInvdata.query"
        })
        //商品效期
        const goodqirole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.validDate.query"
        })
        if(shicunrole){
            this.setState({
                key:'1'
            })
        }else{
            if(hiscunrole){
                this.setState({
                    key:'2'
                })
            }else{
                if(goodqirole){
                    this.setState({
                        key:'3'
                    })
                }
            }
        }

    }
      
}

export default connect()(DatawsIndex);
