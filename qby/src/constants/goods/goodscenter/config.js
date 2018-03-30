import React from 'react';
import { connect } from 'dva';
import { Table } from 'antd';
import {GetServerDataconfig} from '../../../services/services';
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
                    dataIndex: 'des',   
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
        console.log(values)
        const result=GetServerData('qerp.web.pd.spulog.list',values);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                console.log(json)
                //加定的规则规则
                for(var i=0;i<data.length;i++){
                    data[i].key = i;
                    if(data[i].user=='1'){
                        data[i].operater = data[i].operater+'【定】'
                    }
                }
                console.log(data)
                //商品描述规则
                for(var i=0;i<data.length;i++){
                    if(data[i].operationTypeStr=='2'){
                        //des描述转换
                        let beforeContent=data[i].beforeContent;
                        let afterContent=data[i].afterContent;
                        let operationTypeStr='修改商品信息状态由%s改为%s';
                        
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
			            let des=operationTypeStr.format(beforeContent,afterContent)
                        data[i].des = des;
                    }
                }
                //建立数据源
                this.setState({
                    dataSource:data
                })
            } 
    })
}
    componentDidMount(){
        this.handleSearch();
        console.log(this.props.pane[2].data.pdSpuId);
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