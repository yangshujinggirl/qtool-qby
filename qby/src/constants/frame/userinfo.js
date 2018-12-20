import '../../style/user.css';
import { connect } from 'dva';
import CollectionsPage from '../frame/pop';
import { Menu, Dropdown, Icon ,Button} from 'antd';
import {GetServerData} from '../../services/services';

class User extends React.Component {
    constructor(props) {
        super(props);
        this.menu=(
            <Menu className="drop-editOut" onClick={this.onClick}>
                <Menu.Item key="2" className='item'>
                    使用说明
                </Menu.Item>
                <Menu.Item key="0" className='item'>
                    <CollectionsPage/>
                </Menu.Item>
                <Menu.Item key="1" className='item'>
                    注销
                </Menu.Item>
            </Menu>
        );
        this.state={
            dda:null
        }
    }
    onClick=({key})=>{
        if(key=='1'){
            sessionStorage.clear();
            this.props.dispatch({
                type:'users/layout',
                payload:{code:'qerp.web.bs.logout',values:null}
            })
        }

        if(key == '2'){
            window.open('../../static/help.pdf');
        }
    }
    download=()=>{
        const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
        this.props.dispatch({
          type:'tab/firstAddTab',
          payload:paneitem
      });
    }
    getUserinfo=()=>{
        const values={}
        const result=GetServerData('qerp.web.bs.userinfo',values)
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
                sessionStorage.setItem('name', JSON.stringify(json.urUser.name));
                const name=eval(sessionStorage.getItem('name'));
                sessionStorage.setItem('adminType', JSON.stringify(json.urUser.adminType));
                sessionStorage.setItem('wsName', JSON.stringify(json.urUser.wsName));
                sessionStorage.setItem('fileDomain', JSON.stringify(json.fileDomain));
                this.setState({
                    dda:null
                })

            }
        })
    }
    render() {
        const name=eval(sessionStorage.getItem('name'));
        return(
            <div className='clearfix'>
                <div className='fl pointer' style={{height:'80px',lineHeight:'80px',color:"#999",fontSize:"14px"}} onClick={this.download.bind(this)}>下载中心</div>

                <Dropdown overlay={this.menu} trigger={['click']}>

                    <div className='user pointer'>Qtools | {name}<Icon type="down" className='icon-down'/></div>
                </Dropdown>
            </div>
        )
    }
    componentDidMount(){
        this.getUserinfo()
    }

}

export default connect()(User);
