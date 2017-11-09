import React from 'react';
import { Link } from 'dva/router'
import { connect } from 'dva';
import { Table } from 'antd';

class AccountIndexTable extends React.Component {
      constructor(props) {
        super(props);
        this.columns = [{
              title: '账号名称',
              dataIndex: 'username'
            }, {
              title: '姓名',
              dataIndex: 'name'
            }, {
              title: '职位',
              dataIndex: 'job'
            },{
              title: '手机',
              dataIndex: 'mobile'
            },{
              title: '邮箱',
              dataIndex: 'email'
            },{
              title: '状态',
              dataIndex: 'statusStr'
            },{
              title: '更新时间',
              dataIndex: 'updateTime'
            },{
              title: '操作',
              dataIndex: 'operation',
              render: (text, record) => {
                return (
                      <div onClick = {this.editInfo.bind(this,record)} 
                           style={{color: '#35bab0', cursor:'pointer'}}>修改</div>
                );
              }
            }
        ];
        this.state = {};
      }
      
      //修改用户信息
      editInfo = (record) => {
         console.log(record);
         this.props.dispatch({
          type:'tab/addChildrenTab',
          payload:'修改账号'
        })
      }

      render() {
        const columns = this.columns;
        return (
            <div className='wrapper-table'>
              <Table bordered columns={this.columns} dataSource={this.props.accountInfo}/>
            </div>
        );
      }

      componentDidMount(){
        this.props.dispatch({
            type:'account/fetch',
            payload:{code:'qerp.web.ur.user.query',values:{}}
          })
      }
}

function mapStateToProps(state) {
    const {accountInfo} = state.account;
    return {accountInfo};
}

export default connect(mapStateToProps)(AccountIndexTable);