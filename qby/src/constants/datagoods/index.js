
import { Tabs } from 'antd';
import DatagodesIndex from './datagodes/index';
import DataclassdesIndex from './dataclassdes/index';
import DatasIndex from './datas/index';

const TabPane = Tabs.TabPane;

class DatagoIndex extends React.Component{
    state={
        key:'1'
    }
    tabChange = (index)=>{
        this.setState({
            key:index
        })
    }
  	render(){  
        const rolelists=this.props.data.rolelists
		//商品分析
		const goodanalysis=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.pd.analysis.query"
        })
        //分类分析
        const classanalysis=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.category.analysis.list"
        })
        //商品数据
        const gooddata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.spu.data.page"
        })
        


              
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1" onTabClick={this.tabChange.bind(this)}>
                    {
                        goodanalysis?
                        <TabPane tab="商品分析" key="1">
                        {this.state.key == 1 && <DatagodesIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        classanalysis?
                        <TabPane tab="分类分析" key="2">
                            {this.state.key == 2 && <DataclassdesIndex/>} 
                        </TabPane>
                        :null
                    }
                    {
                        gooddata?
                        <TabPane tab="商品数据" key="3">
                         {this.state.key == 3 && <DatasIndex/>} 
                        </TabPane>
                        :null
                    }
                   
                    
                   
                </Tabs>
        	</div>
      	)
      }
      componentDidMount(){
        const rolelists=this.props.data.rolelists
		//商品分析
		const goodanalysis=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.pd.analysis.query"
        })
        //分类分析
        const classanalysis=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.category.analysis.list"
        })
        //商品数据
        const gooddata=rolelists.find((currentValue,index)=>{
			return currentValue.url=="qerp.web.rp.spu.data.page"
        })

        if(goodanalysis){
            this.setState({
                key:'1'
            })
        }else{
            if(classanalysis){
                this.setState({
                    key:'2'
                })
            }else{
                this.setState({
                    key:'3'
                })
            }
        }

      }
}

export default DatagoIndex;
