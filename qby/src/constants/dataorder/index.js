
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs } from 'antd';
import { connect } from 'dva';
import '../../style/dataws.css';
import DatasporderIndex from './sporder/index';
import DataposorderIndex from './posorder/index';



const TabPane = Tabs.TabPane;


class DataorderIndex extends React.Component{
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
		//门店订单
		const sporderrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sys.doc.tasks"
        })
        //pos订单
        const posorderrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sys.doc.task"
        })
      
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1" onTabClick={this.tabChange.bind(this)}>
                    {
                        sporderrole?
                        <TabPane tab="门店订单" key="1">
                            {this.state.key == 1 && <DatasporderIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        posorderrole?
                        <TabPane tab="POS订单" key="2">
                            {this.state.key == 2 && <DataposorderIndex/>} 
                        </TabPane>
                        :null
                    }
                </Tabs>
        	</div>
      	)
    }
    componentDidMount(){
        const rolelists=this.props.data.rolelists
		//门店订单
		const sporderrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sys.doc.tasks"
        })
        //pos订单
        const posorderrole=rolelists.find((currentValue,index)=>{
			return currentValue.remark=="qerp.web.sys.doc.task"
        })

        if(sporderrole){
            this.setState({
                key:'1'
            })
        }else{
            if(posorderrole){
                this.setState({
                    key:'2'
                })
            }
        }
    }
      
}

export default connect()(DataorderIndex);
