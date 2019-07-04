import React, { Component } from "react";
import UploadImg from "../components/UploadImg";
class ModuleSet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageUrl: ""
    };
  }
  changeImg = (imageUrl) => {
    this.setState({
      imageUrl
    });
  };
  render() {
    const { imageUrl } = this.state;
    return (
      <div>
        <UploadImg
          title="模块背景图"
          describe="背景图尺寸为750*392px，格式为png、大小在2m以内"
          imageUrl={imageUrl}
          changeImg={this.changeImg}
          exampleImg=""
          width={750}
          height={392}
        />
      </div>
    );
  }
}

export default ModuleSet;
