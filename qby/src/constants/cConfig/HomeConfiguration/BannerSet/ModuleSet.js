import React, { Component } from "react";
import { Form, message, Button } from "antd";
import UploadImg from "../components/UploadImg";
import { getModuleApi } from "../../../../services/cConfig/homeConfiguration/goodSet";
import { saveModuleApi } from "../../../../services/cConfig/homeConfiguration/bannerSet";
const FormItem = Form.Item;

class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: "",
      fileList: []
    };
  }
  componentDidMount = () => {
    this.initPage();
  };
  initPage = () => {
    const { homepageModuleId } = this.props;
    getModuleApi({ homepageModuleId }).then(res => {
      if (res.code == "0") {
        const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
        const { backgroundPicUrl } = res.searchQueryVo;
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
        this.setState({ fileList });
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
    }
  };
  handleSubmit =()=> {
    const {imageUrl} = this.state;
    const {homepageModuleId} = this.props
    saveModuleApi({homepageModuleId,backgroupPicUrl:imageUrl}).then(res => {
      if(res.code == '0'){
        message.success('保存成功')
      }
    })
  }
  render() {
    const { fileList } = this.state;
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
        <Button style={{margin:'50px 100px'}} type="primary" onClick={this.handleSubmit}>
          保存设置
        </Button>
      </FormItem>
    );
  }
}

export default ModuleSet;
