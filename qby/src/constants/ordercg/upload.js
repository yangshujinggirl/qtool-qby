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
                for(var i=0;i<file.response.pdSpuAsnLists.length;i++){
                    let json = {};
                    json.pdCode = file.response.pdSpuAsnLists[i].pdCode;
                    json.price = file.response.pdSpuAsnLists[i].price;
                    json.qty = file.response.pdSpuAsnLists[i].qty;
                    json.name = file.response.pdSpuAsnLists[i].name;
                    json.createTime = file.response.pdSpuAsnLists[i].createTime;
                    json.displayName = file.response.pdSpuAsnLists[i].displayName;
                    json.key = i;
                    json.isDetail = false //是否是导入
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
          action: '/erpWebRest/webrest.htm?code=qerp.web.pd.spu.import',
          onChange: this.handleChange,
          name:'mfile'
        };
        return (
        <Upload {...props} fileList={this.state.fileList}>
            <Button type="primary" style={{position:'absolute',right:'135px',top:'24px',zIndex:"1000"}}>
            导入采购商品
            </Button>
        </Upload>
        );
    }
}

function mapStateToProps(state) {
    const {goodsInfo,mdopdermeth}  = state.ordercg;
    return {goodsInfo,mdopdermeth};
}

export default connect(mapStateToProps)(MyUploadMd);
