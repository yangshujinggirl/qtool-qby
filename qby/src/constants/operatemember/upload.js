import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload,Cascader} from 'antd';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';

class MyUploadMember extends React.Component {
    state = {
      fileList: []
    }

    handleChange = (info) => {
      let fileList = info.fileList;
      fileList = fileList.slice(-2);
      fileList = fileList.filter((file) => {
        if (file.response) {
            if(file.response.code=='0'){
                //执行初始化数据方法获取list
                this.initList(this.props.values,this.props.limit,this.props.currentPage);
            }else{
              message.error(file.response.message);
            }
          return file.response.status === 'success';
        }
        return true;
      });
      this.setState({ fileList });
    }

    //列表数据请求   
    initList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'operatemember/fetch',
            payload:{code:'qerp.web.qpos.mb.card.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
      const props = {
        action: '/erpWebRest/webrest.htm?code=qerp.web.qpos.mbcard.import',
        onChange: this.handleChange,
        name:'mfile'
      };
      return (
        <Upload {...props} fileList={this.state.fileList} style={{display:'inline-block'}}>
          <Button type="primary">
             导入会员信息
          </Button>
        </Upload>
      );
    }
}

function mapStateToProps(state) {
    const {tableList,total,limit,currentPage,values} = state.operatemember;
    return {tableList,total,limit,currentPage,values};
}

export default connect(mapStateToProps)(MyUploadMember);