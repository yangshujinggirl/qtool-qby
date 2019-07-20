import React, { Component } from "react";
import { Form, message, Button } from "antd";
import {connect} from 'dva'
import UploadImg from "../components/UploadImg";
import { getModuleApi } from "../../../../services/cConfig/homeConfiguration/goodSet";
import { saveModuleApi } from "../../../../services/cConfig/homeConfiguration/bannerSet";
const FormItem = Form.Item;

class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      fileList: [],
      loading:false,
    };
  }
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
    this.props.dispatch({type: 'tab/loding',payload:true})
    const { homepageModuleId } = this.props.data
    getModuleApi({ homepageModuleId }).then(res => {
      if (res.code == "0") {
        const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
        const { backgroundPicUrl } = res.homepageModuleVo;
        let fileList = [];
        if (backgroundPicUrl) {
          fileList = [
            {
              uid: "-1",
              status: "done",
              url: fileDomain + backgroundPicUrl
            }
          ];
        }
        this.setState({ fileList,imageUrl:backgroundPicUrl });
        this.props.dispatch({type: 'tab/loding',payload:false})
      }else{
        this.props.dispatch({type: 'tab/loding',payload:false})
      }
    });
  };
  changeImg = fileList => {
    this.setState({
      fileList
    });
    if (fileList[0] && fileList[0].status == "done" && fileList[0].response.code == "0") {
      this.setState({
        imageUrl: fileList[0].response.data[0]
      });
    }else{
      this.setState({
        imageUrl: ''
      });
    }
  };
  handleSubmit =()=> {
    this.setState({
      loading:true
    });
    const {imageUrl} = this.state;
    const {homepageModuleId} = this.props.data
    saveModuleApi({homepageModuleId,backgroupPicUrl:imageUrl}).then(res => {
      if(res.code == '0'){
        message.success('保存成功')
        this.setState({
          loading:false
        });
      }else{
        this.setState({
          loading:false
        });
      }
    })
  }
  render() {
    const { fileList,loading } = this.state;
    return (
      <FormItem labelCol={{ span: 2 }} label="模块背景图">
        <UploadImg
          describe="750*392"
          fileList={fileList}
          changeImg={this.changeImg}
          exampleImg=""
          width={750}
          height={392}
        />
        <Button style={{margin:'50px 100px'}} loading={loading}  type="primary" onClick={this.handleSubmit}>
          保存设置
        </Button>
      </FormItem>
    );
  }
}
function mapStateToProps(state){
  const {tab} = state;
  return tab
}
export default  connect(mapStateToProps)(ModuleSet);
