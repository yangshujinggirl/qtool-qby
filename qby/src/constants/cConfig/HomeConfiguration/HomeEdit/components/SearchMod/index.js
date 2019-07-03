import react, { Component } from "react";
import { Input, Icon, Button } from "antd";
import "./index.less";
import Search from "../../../Search/index";

class SearchMod extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      imageUrl: ""
    };
  }
  onEdit = () => {
    this.setState({
      visible: true
    });
  };
  changeImg = imageUrl => {
    this.setState({
      imageUrl
    });
  };
  render() {
    const { visible, imageUrl } = this.state;
    return (
      <div className="common-sty search-mod">
        <Input
          addonBefore={<Icon type="search" />}
          addonAfter={<Icon type="scan" />}
          placeholder="input search text"
        />
        <div className="handle-btn-action">
          <Button>查看</Button>
          <Button onClick={this.onEdit}>编辑</Button>
        </div>
        <Search
          changeImg={this.changeImg}
          imageUrl={imageUrl}
          visible={visible}
        />
      </div>
    );
  }
}
export default SearchMod;
