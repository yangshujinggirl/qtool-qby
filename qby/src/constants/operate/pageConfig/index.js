import React, { Component } from 'react';
import {Button} from 'antd'
import { connect } from 'dva';
import FilterForm from './components/FilterForm';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import columns from './columns/index.js';
import './index.less';

class PageConfig extends Component {
  constructor(props) {
    super(props)
    this.state = {
      inputValues:{}
    }
  }
  componentDidMount() {
    this.initPage()
  }
  initPage() {
    this.props.dispatch({
      type:'pageConfig/fetchList',
      payload:{}
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'pageConfig/fetchList',
      payload: values
    });
    const _values = {...this.state.inputValues,...values}
    this.setState({
      inputValues:_values
    });
  }
  changePage = (currentPage) => {
    currentPage--;
    const { inputValues } = this.state;
    const paramsObj ={...{currentPage},...inputValues}
    this.props.dispatch({
      type:'pageConfig/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    const { inputValues } = this.state;
    const paramsObj = {...inputValues,...values}
    this.props.dispatch({
      type:'pageConfig/fetchList',
      payload:paramsObj
    });
  }
  //操作
  handleOperateClick =(record,type)=> {
    const paneitem = {
      title:'修改页面配置',
      key:`${this.props.componkey}edit`+record.pdConfigureId,
      componkey:`${this.props.componkey}edit`,
      data:{
        previewLink:record.previewLink,
        configureCode:record.configureCode,
        pdConfigureId:record.pdConfigureId,
        pageName:record.pageName,
        remark:record.remark
      }
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  addPage =()=> {
    const paneitem = {
      title:'新增商品',
      key:`${this.props.componkey}edit`,
      componkey:`${this.props.componkey}edit`,
    };
    this.props.dispatch({
      type:'tab/firstAddTab',
      payload:paneitem
    });
  }
  render() {
    const { dataList } = this.props.pageConfig;
    const {rolelists} = this.props.data
    //新增页面
    const addpage = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.configureId.save"
    })
    return (
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
          {addpage&&
            <Button
              type='primary'
              size='large'
              onClick={this.addPage}
              >新增页面
            </Button>
          }

        </div>
        <div className="table-list">
          <Qtable
            dataSource={dataList}
            onOperateClick={this.handleOperateClick}
            columns={columns}/>
        </div>
        {
          dataList.length>0&&
          <Qpagination
            sizeOptions="1"
            onChange={this.changePage}
            onShowSizeChange={this.changePageSize}
            data={this.props.pageConfig}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { pageConfig } =state;
  return { pageConfig };
}
export default connect(mapStateToProps)(PageConfig);
