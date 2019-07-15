import react, { Component } from "react";
import { connect } from 'dva';
import { Button, message } from "antd";
import BrandBgModal from "../../../BrandBg";
import { saveBgPicApi,searchBgPicApi} from "../../../../../../services/cConfig/homeConfiguration/brandBg";

class BrandMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      fileList:[],
      imageUrl: "",
      color: ""
    };
  }
  onEdit = () => {
    const {homepageModuleId} = this.props;
    searchBgPicApi({homepageModuleId}).then(res=>{
      if(res.code == '0'){
        const fileDomain = JSON.parse(sessionStorage.getItem("fileDomain"));
        const {backgroundPicUrl,contentPicUrl} = res.searchQueryVo
        this.handleResult(fileDomain,backgroundPicUrl,contentPicUrl)
      }
    })
    this.setState({
      visible: true
    });
  };
  //结果数据处理
  handleResult=(fileDomain,backgroundPicUrl,contentPicUrl)=>{
    let fileList = [];
    if(contentPicUrl){
      fileList=[{
        uid: "-1",
        status: "done",
        url: fileDomain + contentPicUrl
      }]
    };
    this.setState({
      fileList,
      color:backgroundPicUrl
    },() => {
      this.setState({
        visible: true
      });
    });
  }
  //保存
  onOk = () => {
    const { imageUrl, color } = this.state;
    if (!imageUrl) {
      return message.error("请先上传图片", 0.8);
    }
    const values = {
      homepageModuleId: 1,
      backgroundPicUrl: color,
      contentPicUrl: imageUrl
    };
    saveBgPicApi(values).then(res => {
      if (res.code == "0") {
        message.success("保存成功");
        this.setState({
          visible: false,
          fileList:[],
          color: ""
        });
      }
    });
  };
  //取消保存
  onCancel = () => {
    this.setState({
      visible: false,
      fileList:[],
      color: ""
    });
  };
  //修改背景颜色
  colorChange = e => {
    this.setState({
      color: e.target.value
    });
  };
  //修改图片
  changeImg = fileList => {
    this.setState({
      fileList
    });
    if (fileList[0] &&fileList[0].status == "done" && fileList[0].response.code == "0") {
      this.setState({
        imageUrl: fileList[0].response.data[0]
      });
    }else{
      this.setState({
        imageUrl:''
      });
    }
  };
  render() {
    const { visible, fileList, color } = this.state;
    return (
      <div className="common-sty search-mod">
        <p>品版背书</p>
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.onEdit}>编辑</Button>
          <Button>隐藏</Button>
        </div>
        <BrandBgModal
          visible={visible}
          fileList={fileList}
          color={color}
          colorChange={this.colorChange}
          changeImg={this.changeImg}
          onOk={this.onOk}
          onCancel={this.onCancel}
        />
      </div>
    );
  }
}
export default BrandMod;
