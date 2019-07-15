import react, { Component } from "react";
import { connect } from "dva";
import { Input, Icon, Button, message } from "antd";
import "./index.less";
import { savePicApi,searchPicApi } from "../../../../../../services/cConfig/homeConfiguration/search";
import SearchUpload from "../../../Search/index";

class SearchMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList: []
    };
  }
  //编辑
  onEdit = () => {
    const { homepageModuleId } = this.props.info.search;
    searchPicApi({ homepageModuleId }).then(res => { //查询
      if (res.code == "0") {
        const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
        const {backgroundPicUrl} = res.searchQueryVo
        this.handleResult(fileDomain,backgroundPicUrl)
      }
    });
  };
  //结果数据处理
  handleResult=(fileDomain,backgroundPicUrl)=>{
    let fileList = [];
    if(backgroundPicUrl){
      fileList=[{
        uid: "-1",
        status: "done",
        url: fileDomain + backgroundPicUrl
      }]
    };
    this.setState({fileList},() => {
      this.setState({
        visible: true
      });
    });
  }
  //图片发生变化时
  changeImg = fileList => {
    this.setState({
      fileList
    });
    if (fileList[0] &&fileList[0].status == "done" &&fileList[0].response.code == "0") {
      this.setState({
        imageUrl: fileList[0].response.data[0]
      });
    }else{
      this.setState({
        imageUrl:''
      });
    }
  };
  //背景图片保存
  onOk = () => {
    const { imageUrl } = this.state;
    const { homepageModuleId } = this.props.info.search
    if (!imageUrl) {
      return message.error("请先上传图片", 0.8);
    }
    const values = {
      homepageModuleId,
      backgroundPicUrl: imageUrl
    };
    savePicApi(values).then(res => {
      if (res.code == "0") {
        message.success("设置成功");
        this.setState({
          fileList: [],
          visible: false
        });
        this.props.callback();
      }
    });
  };
  onCancel = () => {
    this.setState({
      fileList: [],
      visible: false
    });
  };
  render() {
    const { visible, fileList } = this.state;
    const fileDomain = JSON.parse(sessionStorage.getItem('fileDomain'));
    let { backgroundPicUrl } = this.props.info.search;
    backgroundPicUrl = `${fileDomain}${backgroundPicUrl}`;
    return (
      <div className="common-sty search-mod" style={{'background':`#fff url(${backgroundPicUrl}) center`}}>
        <Input
          addonBefore={<Icon type="search" />}
          addonAfter={<Icon type="scan" />}/>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.onEdit}>编辑</Button>
        </div>
        <SearchUpload
          changeImg={this.changeImg}
          fileList={fileList}
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}/>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { homeEdit } = state;
  return homeEdit;
}
export default connect(mapStateToProps)(SearchMod);
