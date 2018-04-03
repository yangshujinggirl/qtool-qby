import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import {GetServerData} from '../../../services/services';
class Config extends React.Component{
    constructor(){
        super();
        this.state = {
            columns : [
                {
                    title: '操作类型',
                    dataIndex: 'actionType',   
                },
                {
                    title: '操作描述',
                    dataIndex: 'operationTypeStr',   
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
            dataSource : []
        }
    }
    showConfig=(value)=>{
        let values = {
            mbPdSpuLog:{
                pdSpuId:String(this.props.pane[2].data.pdSpuId),
                type:'',
                actionType:'',        
                operationType:'',  
                urUserId:'', 
                createTime:''
            }         
        };
        let pdSpuId = this.props.pane[2].data.pdSpuId;
        //请求日志
        const result=GetServerData('qerp.web.pd.spulog.list',values);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                // console.log(json)
                //加定的规则规则
                // for(var i=0;i<data.length;i++){
                //     data[i].key = i;
                //     if(data[i].user=='1'){
                //         data[i].operater = data[i].operater+'【定】';
                //     }
                // }
                const configdatas = json.data;
                // console.log(configdatas);
                //商品描述规则
                for(var i=0;i<configdatas.length;i++){
                        console.log(configdatas[i]);
                //公共部分函数 
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
                    var code = configdatas[i].pdSpuId;
                    var beforeContent=configdatas[i].beforeContent;
                    var afterContent=configdatas[i].afterContent;

                    //条件判断部分
                    if(configdatas[i].operationType=='SKUXIZ'){
                        // console.log(configdatas[i]);
                    //带%s的描述转换
                       
                        var operationStr="新增商品编码为%s的sku";
                        var operationTypeStr=operationStr.format(code,beforeContent,afterContent);
                        console.log(operationTypeStr)
                            //重新改变返回数据中的商品描述
                        configdatas[i].operationTypeStr = operationTypeStr;
                    // }
                }
                //建立数据源
                this.setState({
                    dataSource:configdatas
                })
            } 
        }
    })
}
    componentDidMount(){
        this.showConfig();
        // console.log(this.props.pane[2].data);
    }

    render(){
        return(
            <Table
                bordered
                columns={this.state.columns}
                dataSource={this.state.dataSource}
          />
        )
    }
}

function mapStateToProps(state){
    const {pane,activeKey} = state.tab;
    return {pane,activeKey}
}
// export default Config;
export default connect(mapStateToProps)(Config);