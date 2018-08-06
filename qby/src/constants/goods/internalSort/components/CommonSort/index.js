import React,{ Component } from 'react';
import { connect } from 'dva';
import { Modal, Button, Form, message } from 'antd'

import Qtable from '../../../../../components/Qtable';
import Qpagination from '../../../../../components/Qpagination';
import AddModel from '../AddModel/index.js'
import FilterForm from '../FilterForm/index.js';
import {
  FirstSortColumns,
  SecondSortColumns,
  ThrSortColumns,
  FourSortColumns
} from '../../columns/index.js';
import { goodSaveApi } from '../../../../../services/goodsCenter/internalSort';
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
    this.initPage()
  }
  initPage() {
    const { level } =this.props;
    this.props.dispatch({
      type:'internalSort/fetchList',
      payload:{
        level,
      }
    })
    //level！=1时统一请求1级列表
    if(this.props.level != '1') {
      this.props.dispatch({
        type:'internalSort/handleChange',
        payload:{
          level:'1',
          parentId:null
        }
      })
    }
  }
  //初始化列头
  getcolumns() {
    let initContent;
    switch(this.props.level) {
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
  //分页
  changePage = (currentPage) => {
    currentPage--;
    const paramsObj = {
      currentPage,
      level:this.props.level
    }
    this.props.dispatch({
      type:'internalSort/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    values = {...values,...{ level: this.props.level}}
    this.props.dispatch({
      type:'internalSort/fetchList',
      payload: values
    });
  }
  //搜索
  searchData =(values)=> {
    values = {...values,...{level:this.props.level}}
    this.props.dispatch({
      type:'internalSort/fetchList',
      payload: values
    });
  }
  //select change
  handelChange(level,selected) {
    this.props.dispatch({
      type:'internalSort/handleChange',
      payload:{
        level,
        parentId:selected
      }
    });
    //请空表单中的value值
    switch(level) {
      case '2':
        this.props.form.setFieldsValue({
          pdCategoryId2:'',
          pdCategoryId3:'',
        });
        break;
      case '3':
        this.props.form.setFieldsValue({
          pdCategoryId3:'',
        });
        break;
    }
  }
  //修改
  editSort(record) {
    //分类详情
    this.props.dispatch({
      type:'internalSort/fetchSortInfo',
      payload:{
        level:this.props.level,
        pdCategoryId:record.pdCategoryId
      }
    })
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
    goodSaveApi({pdCategory:values})
    .then(res => {
      const { code, message } =res;
      if( code == '0') {
        message.success('新建成功');
        this.props.dispatch({
          type:'internalSort/fetchList',
          payload:{
            level:this.props.level
          }
        })
        this.onCancel();
      } else {
        this.onCancel()
      }
    },error=> {

    })
  }
  //取消
  onCancel() {
    this.setState({
      visible:false
    })
    this.props.dispatch({
      type:'internalSort/resetData'
    })
  }
  render() {
    const { level } =this.props;
    const { dataList } = this.props.internalSort;
    const { isEdit, visible } =this.state;
    return(
      <div className="common-sort-components">
        <FilterForm
          submit={this.searchData}
          level={level}/>
        <div className="handle-btn-wrap">
          <Button
            type="primary"
            size="large"
            onClick={()=>this.addSort(level)}>
            { this.getcolumns().text }
          </Button>
        </div>
        <Qtable
          columns={this.getcolumns().columns}
          dataSource={dataList}
          onOperateClick={this.editSort.bind(this)}/>
          {
            dataList.length>0&&
            <Qpagination
              sizeOptions="2"
              onShowSizeChange={this.changePageSize}
              data={this.props.internalSort}
              onChange={this.changePage}/>
          }
        <AddModel
          onChange={this.handelChange.bind(this)}
          onSubmit={this.onSubmit.bind(this)}
          onCancel={this.onCancel.bind(this)}
          level={level}
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
