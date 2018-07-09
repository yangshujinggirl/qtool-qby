import React ,{ Component } from 'react';
import { Pagination } from 'antd';

class Qpagination extends Component {
  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  onChange() {

  }
  render() {
    const { total, limit, current } = this.props.data;
    console.log(total)
    console.log(typeof total)
    return(
      <Pagination
        showSizeChanger
        total={total}
        onChange={this.props.onChange}
        onShowSizeChange={this.onShowSizeChange}
        hideOnSinglePage={false}/>
    )
  }
}

export default Qpagination;
