import React, { Component } from "react";
import { Tooltip, Icon } from "antd";
class TdPop extends Component {
  render() {
    const { des, title } = this.props;
    return (
      <div>
        {title}
        <Tooltip title={des} placement="bottomLeft">
          <Icon type="question-circle" />
        </Tooltip>
      </div>
    );
  }
}

export default TdPop;
