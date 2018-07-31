import React ,{ Component } from 'react';
import { Pagination } from 'antd';
import './index.css';

class Qpagination extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeOptions:this.props.sizeOptions||'1',
    }
  }
  onShowSizeChange(currentPage, pageSize) {
    currentPage--;
    let params = {
      currentPage,
      limit:pageSize
    }
    this.props.onShowSizeChange&&this.props.onShowSizeChange(params)
  }
  initPageSize() {
    const { sizeOptions } =this.state;
    if(sizeOptions == '1') {
      return ['15','30','50','100','200','500']
    } else {
      return ['16','50','100','200']
    }
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
          pageSizeOptions={this.initPageSize()}
          onChange={this.props.onChange}
          onShowSizeChange={this.onShowSizeChange.bind(this)}
          hideOnSinglePage={false}/>
      </div>
    )
  }
}

export default Qpagination;
