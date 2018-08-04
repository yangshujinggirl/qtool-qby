import React,{ Component } from 'react';
import { connect } from 'dva';
import Columns from './columns/index.js';
import Qtable from '../../../components/Qtable';
import Qpagination from '../../../components/Qpagination';
import { getLogListApi } from '../../../services/goodsCenter/baseGoods';


String.prototype.format = function() {
    if(arguments.length == 0) return this;
    var param = arguments[0];
    var s = this;
    if(typeof(param) == 'object') {
     for(var key in param)
          s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
         return s;
    } else {
       for(var i = 0; i < arguments.length; i++){
             s = s.replace(new RegExp("%s"), arguments[i]);
       }
          return s;
    }
}

class LogList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logList:[],
      data:{}
    }
  }
  componentWillMount() {
    this.getLogList({
        pdSpuId:this.props.data.pdSpuId,
        limit:15
    })
  }
  handleChange1=(url)=>{
      console.log(url)
      this.setState({
          visible:true,
          picUrl:url,
          type:'1'
      })
  }

  handleChange2=(data)=>{
      console.log(data)
      console.log(data.replacevalue)
      console.log(eval('('+data.replacevalue+')'))
      this.setState({
          title:'修改前商品描述',
          type:'2',
          visible:true,
          infodata:eval('('+data.replacevalue+')')
      })
  }
  handleChange3=(data)=>{
      console.log(data)
      this.setState({
          title:'修改后商品描述',
          type:'2',
          visible:true,
          infodata:eval('('+data.replacevalue+')')
      })
  }

  handleChange4=(data)=>{
      console.log(data)
      this.setState({
          title:'商品描述',
          type:'2',
          visible:true,
          infodata:eval(data)
      })
  }

  handleOk = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
    handleCancel = (e) => {
      console.log(e);
      this.setState({
        visible: false,
      });
    }
  getLogList(values) {
    getLogListApi(values)
    .then(res => {
      const { code,loge,currentPage,limit,total } = res;
      if(code == '0') {
          this.setState({
            logList:loge,
            data:{
              currentPage,
              limit,
              total
            }
          })
      }
    })
  }
  fomDataList(data) {
    data.map((el) => {
      switch(el.operationType) {
        case 'XZMSTP':
        case 'SCMSTP':
        case 'XZSPTP':
        case 'SCSPTP':
        case 'XZSKUT':
        case 'SCSKUT':
          el.handalType = '2';
          break;
        case 'XZMSLR':
        case 'SCMSLR':
          el.handalType = '2';
          break;
        case 'XGMSLR':
          el.handalType = '3';
          break;
      }
    })
  }
  //点击分页
  changePage = (currentPage) => {
    this.props.dispatch({
      type:'userorders/fetchList',
      payload: {values:{currentPage}}
    });
  }
  render() {
    const dataSource = [];
    // const { dataList=[] } =this.props.goodsLogList;
    const { logList, data } =this.state;
    return(
      <div>
        <Qtable
          dataSource={logList}
          columns = {Columns}/>
        <Qpagination
          onShowSizeChange={this.changePageSize}
          data={data}
          onChange={this.changePage}/>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { goodsLogList } =state;
  return { goodsLogList }
}

export default LogList;
