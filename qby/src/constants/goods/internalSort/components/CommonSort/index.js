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
      pdCategoryId:'',
      initContent:{},
      fields: {},
    }
  }
  componentDidMount() {
    this.initPage();
    this.initFields()
  }
  initPage() {
    const { level } =this.props;
    const { rolelists=[] } =this.props;
    //权限
    this.props.dispatch({
      type:'internalSort/setAuthority',
      payload: rolelists
    });
    //初始化时清空所有历史数据
    this.props.dispatch({
      type:'internalSort/resetData',
    })
    this.props.dispatch({
      type:'internalSort/fetchList',
      payload:{
        level,
      }
    })
  }
  initFields() {
    let initContent={};
    let fields={};
    switch(this.props.level) {
      case '1':
        initContent = {
          columns:FirstSortColumns,
          text:'新建一级分类'
        };
        fields = {
          pdCategory1:{
            value:''
          },
          status:{
            value:''
          },
        }
        break;
      case '2':
        initContent = {
          columns:SecondSortColumns,
          text:'新建二级分类'
        };
        fields = {
          pdCategory1:{
            value:''
          },
          pdCategory2:{
            value:''
          },
          status:{
            value:''
          },
        }
        break;
      case '3':
        initContent = {
          columns:ThrSortColumns,
          text:'新建三级分类'
        };
        fields = {
          pdCategory1:{
            value:''
          },
          pdCategory2:{
            value:''
          },
          pdCategory3:{
            value:''
          },
          status:{
            value:''
          },
        }
        break;
      case '4':
        initContent = {
          columns:FourSortColumns,
          text:'新建四级分类'
        };
        fields = {
          pdCategory1:{
            value:''
          },
          pdCategory2:{
            value:''
          },
          pdCategory3:{
            value:''
          },
          pdCategory4:{
            value:''
          },
          status:{
            value:''
          },
        }
        break;
    }
    this.setState({
      initContent,
      fields
    })
  }
  //双向绑定表单
  handleFormChange = (changedFields) => {
    this.setState(({ fields }) => ({
      fields: { ...fields, ...changedFields },
    }));
  }
  //分页
  changePage = (currentPage) => {
    currentPage--;
    let paramsObj = {
      currentPage,
      level:this.props.level
    }
    const { fields } = this.state;
    const formData = {};
    let key;
    for(key in fields) {
      formData[key] = fields[key].value;
    }
    paramsObj ={...paramsObj,...formData}
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
  //select change事件
  handelChange(level,selected) {
    this.props.dispatch({
      type:'internalSort/handleChange',
      payload:{
        level,
        parentId:selected
      }
    });
  }
  //修改
  editSort(record) {
    this.props.dispatch({
      type:'internalSort/fetchSortInfo',
      payload:{
        level:this.props.level,
        pdCategoryId:record.pdCategoryId
      }
    })
    this.setState({
      visible:true,
      pdCategoryId:record.pdCategoryId
    })
  }
  //新增
  addSort() {
    //新增时请求1级分类列表
    if(this.props.level != '1') {
      this.props.dispatch({
        type:'internalSort/handleChange',
        payload:{
          level:'1',
          parentId:null
        }
      })
    }
    this.props.dispatch({
      type:'internalSort/setVisible',
      payload:true
    })
  }

  //取消关闭
  onCancel() {
    this.setState({
      pdCategoryId:'',
    })
    //清空历史详情数据
    this.props.dispatch({
      type:'internalSort/resetSorftInfoData'
    })
  }
  render() {
    const { level } =this.props;
    const { data, visible, authorityList } = this.props.internalSort;
    const { pdCategoryId, fields, initContent } =this.state;
    return(
      <div className="common-sort-components">
        <FilterForm
          {...fields}
          onChange={this.handleFormChange}
          submit={this.searchData}
          level={level}/>
        <div className="handle-btn-wrap">
          {
            authorityList.authorityEdit&&
            <Button
              type="primary"
              size="large"
              onClick={()=>this.addSort(level)}>
              { initContent.text }
            </Button>
          }
        </div>
        <Qtable
          columns={initContent.columns}
          dataSource={data.dataList}
          onOperateClick={this.editSort.bind(this)}/>
        {
          data.dataList.length>0&&
          <Qpagination
            onShowSizeChange={this.changePageSize}
            data={data}
            onChange={this.changePage}/>
        }
        <AddModel
          onChange={this.handelChange.bind(this)}
          onCancel={this.onCancel.bind(this)}
          level={level}
          pdCategoryId={pdCategoryId}
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
