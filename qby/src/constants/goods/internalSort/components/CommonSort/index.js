import React,{ Component } from 'react';
import { connect } from 'dva';
import { Modal, Button } from 'antd'

import Qtable from '../../../../../components/Qtable';
import AddModel from '../AddModel/index.js'
import FilterForm from '../FilterForm/index.js';
import {
  FirstSortColumns,
  SecondSortColumns,
  ThrSortColumns,
  FourSortColumns
} from '../../columns/index.js';
import './index.less';

class FirstSort extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      isEdit:false
    }
  }
  componentWillMount() {
    const { type } =this.props;
    this.props.dispatch({
      type:'internalSort/fetchCategory',
      payload:{level:type}
    })
  }
  //搜索
  searchData(values) {
    console.log(values)
  }
  //初始化列头
  getcolumns() {
    let initContent;
    switch(this.props.type) {
      case '1':
        initContent = {
          columns:FirstSortColumns,
          text:'新建一级分类'
        }
        break;
      case '2':
        initContent = {
          columns:SecondSortColumns,
          text:'新建二级分类'
        }
        break;
      case '3':
        initContent = {
          columns:ThrSortColumns,
          text:'新建三级分类'
        }
        break;
      case '4':
        initContent = {
          columns:FourSortColumns,
          text:'新建四级分类'
        }
        break;
    }
    return initContent;
  }
  //修改
  handleEdit() {
    this.setState({
      visible:true,
      isEdit:true
    })
  }
  //新增
  addSort() {
    this.setState({
      visible:true,
      isEdit:false
    })
  }
  //提交
  onSubmit(values) {
    console.log(values)
  }
  //取消
  onCancel() {
    this.setState({
      visible:false
    })
  }
  render() {
    const { type } =this.props;
    const { dataList } = this.props.internalSort;
    const { isEdit, visible } =this.state;
    return(
      <div className="common-sort-components">
        <FilterForm
          submit={this.searchData}
          type={type}/>
        <div className="handle-btn-wrap">
          <Button
            type="primary"
            size="large"
            onClick={()=>this.addSort(type)}>
            { this.getcolumns().text }
          </Button>
        </div>
        <Qtable
          columns={this.getcolumns().columns}
          dataSource={dataList}
          onOperateClick={this.handleEdit.bind(this)}/>
        <AddModel
          onSubmit={this.onSubmit.bind(this)}
          onCancel={this.onCancel.bind(this)}
          type={type}
          isEdit={isEdit}
          visible={visible}/>
      </div>
    )
  }
}
function mapStateToProps(state) {
  const { internalSort } =state;
  return{ internalSort }
}

export default connect(mapStateToProps)(FirstSort);
