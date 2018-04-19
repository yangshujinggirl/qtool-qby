
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DataspsellIndex from './dataspsell/index';
import DataspcunIndex from './dataspcun/index';
import DatasphiscunIndex from './datasphiscun/index';
import DataspfenIndex from './dataspfen/index';

const TabPane = Tabs.TabPane;


class DataspIndex extends React.Component{
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
		//销售数据
		const selldatarole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.shop.sale.data.query"
        })
        //门店库存
        const spcundatarole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.category.list"
        })
        //历史库存
        const hiscunrole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.pd.category.list"
        })
        //联营分成
        const liandatarole=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.shop.Joint.division.page"
        })       
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1" onTabClick={this.tabChange.bind(this)}>
                    {
                        selldatarole?
                        <TabPane tab="销售数据" key="1">
                            {this.state.key == '1' && <DataspsellIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        spcundatarole?
                        <TabPane tab="门店库存" key="2">
                            {this.state.key == '2' && <DataspcunIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        hiscunrole?
                        <TabPane tab="历史库存" key="3">
                            {this.state.key == '3' && <DatasphiscunIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        liandatarole?
                        <TabPane tab="联营分成" key="4">
                            {this.state.key == '4' && <DataspfenIndex/>} 
                        </TabPane>
                        :null
                    }
                </Tabs>
        	</div>
      	)
      }
        componentDidMount(){
            const rolelists=this.props.data.rolelists
            //销售数据
            const selldatarole=rolelists.find((currentValue,index)=>{
                return currentValue.url=="qerp.web.rp.shop.sale.data.query"
            })
            //门店库存
            const spcundatarole=rolelists.find((currentValue,index)=>{
                return currentValue.url=="qerp.web.pd.category.list"
            })
            //历史库存
            const hiscunrole=rolelists.find((currentValue,index)=>{
                return currentValue.url=="qerp.web.pd.category.list"
            })
            //联营分成
            const liandatarole=rolelists.find((currentValue,index)=>{
                return currentValue.url=="qerp.web.rp.shop.Joint.division.page"
            })
            if(selldatarole){
                this.setState({
                    key:1
                })
            }else{
                if(spcundatarole){
                    this.setState({
                        key:2
                    })
                }else{
                    if(hiscunrole){
                        this.setState({
                            key:3
                        })
                    }else{
                        if(liandatarole){
                            this.setState({
                                key:4
                            })
                        }
                    }
                }
            }


        }
}



export default connect()(DataspIndex);
