import React ,{ Component } from 'react';
import { Pagination } from 'antd';
import './index.css';

class Qpagination extends Component {
  onShowSizeChange(current, pageSize) {
    console.log(current, pageSize);
  }
  onChange() {

  }
  render() {
    const { total, limit, current } = this.props.data;
    return(
      <div className="common-pagination-components">
        <Pagination
          showSizeChanger
          total={total}
          onChange={this.props.onChange}
          onShowSizeChange={this.onShowSizeChange}
          hideOnSinglePage={false}/>
      </div>
    )
  }
}

export default Qpagination;
