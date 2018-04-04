import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import {GetServerData} from '../../../services/services';
import EditableTable from '../../../components/table/tablemodel';

class Config extends React.Component{
    constructor(){
        super();
        this.state = {
            columns : [
                {
                    title: '操作类型',
                    dataIndex: 'actionTypeStr',   
                },
                {
                    title: '操作描述',
                    dataIndex: 'operation',
                    render:()=>{}   
                },
                {
                    title: '操作时间',
                    dataIndex: 'createTime',   
                },
                {
                    title: '操作人',
                    dataIndex: 'operater',   
                }
          ],
            dataSource : [],
            configdataslast : [],
            sendid:null
        }
    }
    showConfig=(value)=>{
        let values = {
            mbPdSpuLog:{
                pdSpuId:String(this.props.pane[1].data.pdSpuId),
                // type:'',
                // actionType:'',        
                // operationType:'',  
                // urUserId:'', 
                // createTime:''
            }         
        };
        // let pdSpuId = this.props.pane[2].data.pdSpuId;
        //请求日志
        let result=GetServerData('qerp.web.pd.spulog.list',values);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({
                    configdataslast:json
                })
                const configdatas = json.data;
                // console.log(json)
                //加定的规则规则例子
                // for(var i=0;i<data.length;i++){
                //     data[i].key = i;
                //     if(data[i].user=='1'){
                //         data[i].operater = data[i].operater+'【定】';
                //     }
                // }
             
                console.log(configdatas)
                //商品描述规则
                for(var i=0;i<configdatas.length;i++){
                    configdatas[i].key = i;  
                     //公共部分format函数,必须在循环内 
                    var code = configdatas[i].pdSpuId;
                    var beforeContent=configdatas[i].beforeContent;
                    var afterContent=configdatas[i].afterContent;
                    var operationStr=configdatas[i].operationTypeStr;
                        String.prototype.format = function() {  
                            if(arguments.length == 0) return this;  
                            let param = arguments[0];  
                            let s = this;  
                            if(typeof(param) == 'object') {  
                            for(let key in param)  
                                s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);  
                                return s;  
                            } else {  
                                for(let i = 0; i < arguments.length; i++){
                                    s = s.replace(new RegExp("%s"), arguments[i]); 
                                }  
                                return s;  
                            }  
                        }       
                        //商品描述
                        switch(configdatas[i].operationType){
                            // case("XZYGSP"):
                            //       var operationTypeStr=operationStr.format(code,beforeContent,afterContent);
                            //      configdatas[i].operationTypeStr = operationTypeStr;
                            //      break;   
                            // case("XGSPMC"):
                            //      var operationTypeStr=operationStr.format(code,beforeContent,afterContent);
                            //     configdatas[i].operationTypeStr = operationTypeStr;
                            //     break;   
                            // case("XGSPFL"):
                            //     var operationTypeStr=operationStr.format(code,beforeContent,afterContent);
                            //     configdatas[i].operationTypeStr = operationTypeStr;
                            //    break; 
                            // case("XZMSLR"):
                            //     configdatas[i].operationTypeStr = operationStr.format(code,beforeContent,afterContent);
                            //     break;
                            //新增图片
                            case("XZMSTP"):
                                    var str="新增商品图片【%s】"
                                    var desstr = str.replace(/%s/,'图片链接');
                                    configdatas[i].operationTypeStr = desstr;
                                    break;
                            case("SCMSTP"):
                                    var str="删除商品图片【%s】"
                                    var desstr = str.replace(/%s/,'图片链接');
                                    configdatas[i].operationTypeStr = desstr;
                                    break;
                       }


                //最后立数据源
                this.setState({
                    dataSource:configdatas
                })
            } 
            // console.log(configdatas)
        }
    })
}
    

    //分页方法
    pageChange=(value,page,pageSize)=>{
        let values = {
            mbPdSpuLog:{
                pdSpuId:String(this.props.pane[1].data.pdSpuId)
            }         
        };
            this.initList(values,pageSize,Number(page-1))
    }
    //pagesize变化
    pageSizeChange=(value,current,size)=>{
        let values = {
            mbPdSpuLog:{
                pdSpuId:String(this.props.pane[1].data.pdSpuId)
            }         
        };
            this.initList(values,size,0)
    }
    
    //列表数据请求   
    initList=(values,limit,currentPage)=>{
        //新增属性
            values.limit=limit;
            values.currentPage=Number(currentPage);
        console.log(values);
        //分页变化时请求数据
        let result=GetServerData('qerp.web.pd.spulog.list',values);
            result.then((res) => {
                return res;
            }).then((json) => {
                    console.log(json.data)
                    this.setState({
                        dataSource:json.data
                    })
         })
    }


    componentWillMount(){
        this.showConfig();
        this.setState({
            sendid: this.props.pane[1].data.pdSpuId
        })
        
        console.log(this.props.pane[1].data.pdSpuId);
    }

    render(){
        return(
            <EditableTable 
				columns={this.state.columns}
                dataSource={this.state.dataSource}
				pageChange={this.pageChange.bind(this,this.props.values)}
				pageSizeChange={this.pageSizeChange.bind(this,this.props.values)}
				total={this.state.configdataslast.total}
				limit={this.state.configdataslast.limit}
				current={Number(this.props.currentPage)+1}
			/>
            
        )
    }
}

function mapStateToProps(state){
    const {pane,total,limit,currentPage,activeKey} = state.tab;
  
    return {total,limit,currentPage,pane,activeKey}
}
// export default Config;
export default connect(mapStateToProps)(Config);