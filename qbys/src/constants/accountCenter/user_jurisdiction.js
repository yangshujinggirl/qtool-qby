import React from 'react';
import { Tag } from 'antd';
const CheckableTag = Tag.CheckableTag;

class UserJurisdiction extends React.Component {
  state = {
    checked: true
  };

  handleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return
      <CheckableTag checked={this.state.checked} onChange={this.handleChange}>哈哈</CheckableTag>;
  }
 
}

export default UserJurisdiction;
