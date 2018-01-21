import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload,Cascader} from 'antd';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
class MyUpload extends React.Component {
    state = {
        fileList: []
      }
      handleChange = (info) => {
        let fileList = info.fileList;
        fileList = fileList.slice(-2);
        fileList = fileList.filter((file) => {
          if (file.response) {
              if(file.response.code=='0'){
                let goodsInfo = [];
                for(var i=0;i<file.response.importDetails.length;i++){
                    let json = {};
                    json.code = file.response.importDetails[i].pdCode;
                    json.key = i;
                    json.qty = file.response.importDetails[i].qty;
                    json.codeline = true;
                    json.qtyline = true;
                    goodsInfo.push(json);
                }
                this.props.dispatch({
                    type:'orderdb/syncGoodsInfo',
                    payload:goodsInfo
                })
              }else{
                message.error(file.response.message);
              }
            return file.response.status === 'success';
          }
          return true;
        });
        this.setState({ fileList });
      }
      render() {
        const props = {
          action: '/erpWebRest/webrest.htm?code=qerp.web.sp.order.import',
          onChange: this.handleChange,
          name:'mfile'
        };
        return (
        <Upload {...props} fileList={this.state.fileList}>
            <Button type="primary" style={{position:'absolute',right:'135px',top:'24px',zIndex:"1000"}}>
            导入商品信息
            </Button>
        </Upload>
        );
    }
}

function mapStateToProps(state) {
    const {goodsInfo}  = state.orderdb;
    return {goodsInfo};
}

export default connect(mapStateToProps)(MyUpload);