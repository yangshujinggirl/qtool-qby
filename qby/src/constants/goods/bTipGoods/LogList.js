import React from 'react';
import { connect } from 'dva';
import { Table ,Modal} from 'antd';
import {GetServerData} from '../../../services/services';
import EditableTable from '../../../components/table/tablemodel';
import { getLogListApi } from '../../../services/goodsCenter/commonGoods';
// import './config.css';


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

class EditableCell extends React.Component {
    state = {
        value: '1',
        editable: false,
        visible:false,
        title:'',
        type:'1',
        infodata:[]
    }
    handleChange1=(url)=>{
      this.setState({
          visible:true,
          picUrl:url,
          type:'1'
      })
    }
    handleChange2=(data)=>{
      this.setState({
        title:'修改前商品描述',
        type:'2',
        visible:true,
        infodata:eval('('+data.replacevalue+')')
      })
    }
    handleChange3=(data)=>{
      this.setState({
          title:'修改后商品描述',
          type:'2',
          visible:true,
          infodata:eval('('+data.replacevalue+')')
      })
    }
    handleChange4=(data)=>{
      this.setState({
          title:'商品描述',
          type:'2',
          visible:true,
          infodata:eval(data)
      })
    }
    handleOk = (e) => {
      this.setState({
        visible: false,
      });
    }
    handleCancel = (e) => {
      this.setState({
        visible: false,
      });
    }
    render() {
      const fileDomain=eval(sessionStorage.getItem('fileDomain'));
      const { value, editable } = this.state;
      return (
        <div className="editable-cell">
          {
            this.props.operadatatype=='1'?
            <span>{this.props.data}</span>
            :
            this.props.data.map((item,index)=>{
              return (
                  <span key={index}>
                      {
                          item.name=='%s'?
                          (
                              (item.type=='2' && item.indexs=='3')?<span onClick={this.handleChange1.bind(this,item.replacevalue)} style={{color:'#35bab0',cursor:'pointer'}}>图片链接</span>
                              :(item.type=='2' && item.indexs=='1'?item.replacevalue:(
                                  item.type=='3'?(item.indexs=='2'?<span onClick={this.handleChange2.bind(this,item)} style={{color:'#35bab0',cursor:'pointer'}}>修改前商品描述</span>:(item.indexs=='3'?<span onClick={this.handleChange3.bind(this,item)} style={{color:'#35bab0',cursor:'pointer'}}>修改后商品描述</span>:'')):((item.type=='4' && item.indexs=='1')?<span onClick={this.handleChange4.bind(this,item.replacevalue)} style={{color:'#35bab0',cursor:'pointer'}}>商品描述</span>:'')
                              ))



                          ):item.replacevalue

                      }
                  </span>
                )
              })
          }
          <Modal
            className='model-log'
            title={this.state.title}
            visible={this.state.visible}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={null}>
            {
              this.state.type=='1'?
              <div><img src={fileDomain+this.state.picUrl} className='w100 h100'/></div>
              :
              (
                this.state.type=='2'?
                <div>
                    {
                        this.state.infodata.map((item,index)=>{
                            return (
                            <div key={index}>
                              {
                                item.type=='1'?
                                <div style={{textAlign:'center'}}>{item.content}</div>
                                :
                                <div style={{width:"100px",height:'100px',margin:'0 auto'}}>
                                  <img src={fileDomain+item.content} className='w100 h100'/>
                                </div>
                              }
                            </div>)
                        })
                    }
                </div>
                :null
              )
            }
          </Modal>
        </div>
      );
    }
}

class Config extends React.Component{
    constructor(){
      super();
      this.state = {
        columns : [
          {
            title: '操作类型',
            dataIndex: 'actionTypeStrr',
          },
          {
            title: '操作描述',
            dataIndex: 'des',
            render: (text, record) => (
		               <EditableCell
                    operadatatype={record.operadatatype}
                    data={text}/>
            )
          },
          {
            title: '操作时间',
            dataIndex: 'createTime',
          },
          {
            title: '操作人',
            dataIndex: 'urUserName',
          }],
        dataSource : [],
        configdataslast : [],
        currentPage:0,
        limit:15,
        total:0
      }
    }
    componentWillMount(){
      this.showConfig();
    }
    showConfig=(value)=>{
      let values = {
          pdSpuId:String(this.props.data.pdSpuId),
          limit:this.state.limit,
          channel:2,
          currentPage:this.state.currentPage
      };
      this.props.dispatch({type: 'tab/loding',payload:true})
      //请求日志
      getLogListApi(values)
      .then((json) => {
        this.props.dispatch({type: 'tab/loding',payload:false})
        if(json.code=='0'){
            const data=json.log
            //数据加定操作
            for(var i=0;i<data.length;i++){
                if(data[i].type=='30'){
                    data[i].urUserName=data[i].urUserName+'【定】'
                }
                //区别纯字符串，图片，商品描述
                // operadatatype:1 //纯字符串
                // operadatatype:2 //一个图片链接
                // operadatatype:3 //商品描述修改
                // operadatatype:4 //新增商品描述  删除商品描述
                data[i].operadatatype='1';
                switch(data[i].operationType) {
                  case 'XZMSTP':
                  case 'SCMSTP':
                  case 'XZSPTP':
                  case 'SCSPTP':
                  case 'XZSKUT':
                  case 'SCSKUT':
                    data[i].operadatatype = '2';
                    break;
                  case 'XZMSLR':
                  case 'SCMSLR':
                    data[i].operadatatype = '4';
                    break;
                  case 'XGMSLR':
                    data[i].operadatatype = '3';
                    break;
                }
            }
              //操作描述操作
            for(var i=0;i<data.length;i++){
                const addContent=(!data[i].addContent)?'':data[i].addContent
                const beforeContent=(!data[i].beforeContent)?'':data[i].beforeContent
                const afterContent=(!data[i].afterContent)?'':data[i].afterContent
                if(data[i].operadatatype=='1'){
                  data[i].des=data[i].operationTypeStrr.format(addContent,beforeContent,afterContent)
                }else{
                  //以%s为标准把模板分割为数组
                  var reg = new RegExp("%s", "g");
                  var fuindex=0
                  data[i].dess=data[i].operationTypeStrr.replace(reg, "&a&%s&a&")
                  data[i].dess=data[i].dess.split("&a&")
                  data[i].des=[]
                  for(var j=0;j<data[i].dess.length;j++){
                    if(data[i].dess[j]=='%s'){
                      fuindex=fuindex+1
                      data[i].des.push({
                          name:data[i].dess[j],
                          type:data[i].operadatatype,
                          indexs:fuindex,
                          replacevalue:(data[i].operadatatype=='4') ?addContent+beforeContent+afterContent:(fuindex=='1'?addContent:(fuindex=='2'?beforeContent:(fuindex=='3'?afterContent:''))),

                      })
                    }else{
                      data[i].des.push({
                        name:data[i].dess[j],
                        type:data[i].operadatatype,
                        indexs:'-1',
                        replacevalue:data[i].dess[j]
                      })
                    }
                  }
                }
            }
            //最终数据setstate
            this.setState({
                dataSource:data,
                limit:json.limit,
                currentPage:json.currentPage,
                total:json.total
            })
        }
      })
    }
    //分页方法
    pageChange=(page,pageSize)=>{
      this.setState({
          limit:pageSize,
          currentPage:Number(page)-1
      },function(){
          this.showConfig()
      })
    }
    //pagesize变化
    pageSizeChange=(current,size)=>{
      this.setState({
          limit:size,
          currentPage:Number(current)-1
       },function(){
           this.showConfig()
       })
    }
    render(){
      return(
          <EditableTable
            columns={this.state.columns}
            dataSource={this.state.dataSource}
            pageChange={this.pageChange.bind(this)}
            pageSizeChange={this.pageSizeChange.bind(this)}
            total={this.state.total}
            limit={Number(this.state.limit)}
            current={Number(this.state.currentPage)+1}/>

      )
    }
}

function mapStateToProps(state){
    const {pane,total,limit,currentPage,activeKey} = state.tab;
    return {total,limit,currentPage,pane,activeKey}
}
// export default Config;
export default connect(mapStateToProps)(Config);
