import { Form, Select, Input, Button, Radio, DatePicker, message,AutoComplete,Table, Upload,Cascader,Modal} from 'antd';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
class MyUploadMd extends React.Component {
    state = {
        fileList: []
      }
  
      handleChange = (info) => {
        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        fileList = fileList.filter((file) => {
          if (file.response) {
            if(file.response.code=='0'){
                console.log('11111')
                console.log(file.response)
                console.log('22222')
                if(file.response.warningmessage){
                    let message = file.response.warningmessage.split('\r\n')
                    let m = []
                    for(let i=0;i<message.length;i++){
                      m.push(<p>{message[i]}</p>)
                    }
                    Modal.warning({
                        content:(
                          <div>
                            {m}
                          </div>
                        )
                      });
                }
                let goodsInfo = [];
                for(var i=0;i<file.response.importDetails.length;i++){
                    let json = {};
                    json.Code = file.response.importDetails[i].pdCode;
                    json.retailPrice = file.response.importDetails[i].price;
                    json.qty = file.response.importDetails[i].qty;
                    json.price = file.response.importDetails[i].price;
                    json.name = file.response.importDetails[i].name;
                    json.displayName = file.response.importDetails[i].displayName;
                    json.key = i;
                    goodsInfo.push(json);
                }
                this.props.mdopdermeth.funct(goodsInfo)
            }else{
                message.error(file.response.message,.8);
            }
            return file.response.status === 'success';
          }
          return true;
        });
        this.setState({ fileList });
      }
      render() {
        const props = {
          action: '/erpWebRest/webrest.htm?code=qerp.web.sp.order.import&type=mdorder',
          onChange: this.handleChange,
          name:'mfile'
        };
        return (
        <Upload {...props} fileList={this.state.fileList}>
            <Button type="primary" style={{position:'absolute',right:'135px',top:'24px',zIndex:"1000"}}>
            导入预定商品
            </Button>
        </Upload>
        );
    }
}

function mapStateToProps(state) {
    const {goodsInfo,mdopdermeth}  = state.ordermd;
    return {goodsInfo,mdopdermeth};
}

export default connect(mapStateToProps)(MyUploadMd);
