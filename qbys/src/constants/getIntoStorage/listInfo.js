import React from 'react';

class ListInfo extends React.Component {
  render() {
    return (
      <div className='listInfo-wrapper'>
        <div className='listInfo-header'>
            入库单信息
        </div>
        <div className='listInfo-content'>
        {
            this.props.infoList
            ?
              (
              <div>
                <label>订单号：</label><span>{this.props.infoList.asnNo}</span>
                <label>下单时间：</label><span>{this.props.infoList.createTime}</span>
                <label>订单状态：</label><span>{this.props.infoList.statusStr}</span>
                <label>供应商名称：</label><span>{this.props.infoList.supplier}</span>
                <label>预计到达时间：</label><span>{this.props.infoList.expectedTime}</span>
               </div>
            )
            :null
        }
        </div>
      </div>
    );
  }
}


export default ListInfo
