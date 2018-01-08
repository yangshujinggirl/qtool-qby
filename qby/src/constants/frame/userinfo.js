import '../../style/user.css';
import { connect } from 'dva';
import CollectionsPage from '../frame/pop';
import { Menu, Dropdown, Icon ,Button} from 'antd';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.menu=(
            <Menu onClick={this.onClick}>
                <Menu.Item key="0" className='item'>
                    <CollectionsPage/>
                </Menu.Item>
                <Menu.Item key="1" className='item'>
                    注销
                </Menu.Item>
            </Menu>
        );
    }
    onClick=({key})=>{
        if(key=='1'){
            sessionStorage.clear();
            this.props.dispatch({
                type:'users/layout',
                payload:{code:'qerp.web.bs.logout',values:null}
            })
          }
    }
    download=()=>{
        const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
        this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      });
    }
    render() {
        const name=eval(sessionStorage.getItem('name'));
        return(
            <div className='clearfix'>
                <div className='fl' style={{height:'80px',lineHeight:'80px'}} onClick={this.download.bind(this)}>下载中心</div>

                <Dropdown overlay={this.menu} trigger={['click']}>

                    <div className='user pointer'>Qtools | {name}<Icon type="down" className='icon-down'/></div> 
                </Dropdown>
            </div>
        )
    }
}

export default connect()(User);
