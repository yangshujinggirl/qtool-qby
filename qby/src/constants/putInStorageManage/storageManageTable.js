import React from 'react';
import { connect } from 'dva';
import { Spin,Table, Icon } from 'antd';


class StorageManageTable extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            currentPage:0,
            currentShow:1
        }
        this.columns = [{
            title: '',
            dataIndex: '',
            render:(text, record)=>{
                return (
                    this.props.dataList.length > 1 ?
                  (
                    <div>1</div>
                  ) : null
                );
            }
          },{
            title: '收货单号',
            dataIndex: 'asnNo'
          },{
            title: '供应商/门店名称',
            dataIndex: 'name'
          },{
            title: '订单状态',
            dataIndex: 'statusStr'
          },{
            title: '预计送达时间',
            dataIndex: 'expectedTime'
          }, {
            title: '操作',
            dataIndex: 'opation',
            render: (text, record) => {
                return (
                    this.props.dataList.length > 0 ?
                    (
                            record.status=='30'
                            ? <div>入库</div>
                            :<div onClick = {this.getToStorage.bind(this, record)} style={{color: '#35bab0', cursor:'pointer'}}>入库</div>
                    ) : null
                );
              },
          }];
    }

    getToStorage = (record) =>{
        let itemId = record.wsAsnId;
        const paneitem={title:'信息详情',key:'501000info',componkey:'501000info',data:{'itemId':itemId}}
        this.props.dispatch({
          type:'tab/addNewTab',
          payload:paneitem
        })
    }

    //切换页码时
    changePage = (pagination) =>{
        this.props.dispatch({
            type:'storageManage/updateData',
            payload:true
        });
        this.setState({
            currentPage:pagination.current - 1
        },function(){
            this.props.getCurrentPage(pagination.current - 1);
        });
    }
      
    render() {
        return (  
            <Table bordered rowKey="wsAsnId" columns={this.columns} dataSource={this.props.dataList} 
                onChange={this.changePage.bind(this)}
                loading={this.props.loading?this.props.loading:false}
                pagination={{defaultPageSize:15,total:this.props.total,current:this.props.current}}/>
        )
    }
}

function mapStateToProps(state) {
    const loading = state.storageManage.loading;
    return {loading};
}

export default connect(mapStateToProps)(StorageManageTable);