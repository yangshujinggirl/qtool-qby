import React, { Component } from "react";
import { Upload, Button } from "antd";
import './index.less'
class index extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  downLoadTemp = () => {

  };
  handleChange = () => {

  };
  beforeUpload=()=>{

  }
  render() {
    const params = JSON.stringify({type:1});
    const props = {
      action:"/erpWebRest/webrest.htm?code=qerp.web.config.singlelinespu.import",
      onChange: this.handleChange,
      beforeUpload: this.beforeUpload,
      name: "mfile",
      data: { data: params },
      showUploadList: false
    };
    return (
      <div>
        <div>
          请导入商品：
          <Upload {...props}>
            <Button type="primary" size="large">导入商品</Button>
          </Upload>
          <a className='act_down' onClick={this.downLoadTemp}>下载导入模板</a>
        </div>
      </div>
    );
  }
}

export default index;
