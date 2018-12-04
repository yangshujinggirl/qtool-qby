
import { Tabs } from 'antd';
import AllthIndex from './allth/index';
import ToAuditThIndex from './toAuditTh/index';
const TabPane = Tabs.TabPane;

class Userth extends React.Component{
    componentWillMount(){
      console.log(this.props)
    }
  	render(){
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="全部退单" key="1">
                      <AllthIndex componkey={this.props.componkey}/>
                    </TabPane>
                    <TabPane tab="待运营审核退单" key="2">
                      <ToAuditThIndex componkey={this.props.componkey}/>
                    </TabPane>
                </Tabs>
        	</div>
      	)
      }
}

export default Userth;
