import React, { Component } from 'react';
import {Button} from 'antd'
import { connect } from 'dva';
import FilterForm from './components/FilterForm';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import columns from './columns/index.js';
import './index.less';

class ExchangeAct extends Component {
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
      type:'exchangeAct/fetchList',
      payload:{}
    });
  }
  //搜索
  searchData =(values)=> {
    this.props.dispatch({
      type:'exchangeAct/fetchList',
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
      type:'exchangeAct/fetchList',
      payload: paramsObj
    });
  }
  //修改pageSize
  changePageSize =(values)=> {
    const { inputValues } = this.state;
    const paramsObj = {...inputValues,...values}
    this.props.dispatch({
      type:'exchangeAct/fetchList',
      payload:paramsObj
    });
  }
  //操作
  handleOperateClick =(record,type)=> {
    console.log(record)
    const paneitem = {
      title:'修改兑换商品',
      key:`${this.props.componkey}edit`+record.pdSpuActiveId,
      componkey:`${this.props.componkey}edit`,
      data:{
        infos:{
          name:record.name,
          picUrl:record.picUrl,
          price:record.price,
          valueQty:record.valueQty,
          convertibleQty:record.convertibleQty,
          leftQty:record.leftQty,
          pdSpuActiveId:record.pdSpuActiveId,
        }
      },
    };
    this.props.dispatch({
        type:'tab/firstAddTab',
        payload:paneitem
    });
  }
  addGoods =()=> {
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
    const { dataList } = this.props.exchangeAct;
    const {rolelists} = this.props.data
    //新增活动
    const addAct = rolelists.find((currentValue,index)=>{
      return currentValue.url=="qerp.web.pd.spu.active.save"
    })
    return (
      <div className="qtools-components-pages">
        <FilterForm
          submit={this.searchData}
        />
        <div className="handel-btn-lists">
        {
          addAct ?
            <Button
              type='primary'
              size='large'
              onClick={this.addGoods}>
              新增商品
            </Button>
          : null
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
            data={this.props.exchangeAct}/>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { exchangeAct } =state;
  return { exchangeAct };
}
export default connect(mapStateToProps)(ExchangeAct);
