import React ,{ Component } from 'react';
import { Pagination } from 'antd';
import './index.css';

class Qpagination extends Component {
  onShowSizeChange(currentPage, pageSize) {
    console.log(currentPage, pageSize);
    let params = {
      currentPage,
      limit:pageSize
    }
    this.props.onShowSizeChange&&this.props.onShowSizeChange(params)
  }

  render() {
    const { total, limit, currentPage } = this.props.data;
    const current = currentPage+1;
    return(
      <div className="common-pagination-components">
        <Pagination
          showSizeChanger
          total={total}
          pageSize={limit}
          current={current}
          defaultCurrent = {1}
          pageSizeOptions={['15','30','50','100','200','500']}
          onChange={this.props.onChange}
          onShowSizeChange={this.onShowSizeChange.bind(this)}
          hideOnSinglePage={false}/>
      </div>
    )
  }
}

export default Qpagination;
