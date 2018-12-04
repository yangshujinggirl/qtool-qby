
import { Tabs } from 'antd';
import ShareMail from './shareMail/index';
import ShareRate from './shareRate/index';
import ShareTotal from './shareTotal/index';
const TabPane = Tabs.TabPane;

class ShareManage extends React.Component{
    componentWillMount(){
      console.log(this.props)
    }
  	render(){
     	return(
        	<div className='content_box stock-tabs'>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="分润合计" key="1">
                      <ShareTotal componkey={this.props.componkey}/>
                    </TabPane>
                    <TabPane tab="直邮分润明细" key="2">
                      <ShareMail componkey={this.props.componkey}/>
                    </TabPane>
                    <TabPane tab="保税分润明细" key="3">
                      <ShareRate componkey={this.props.componkey}/>
                    </TabPane>
                </Tabs>
        	</div>
      	)
      }
}

export default ShareManage;
