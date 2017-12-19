import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs,Checkbox,message} from 'antd';
import { connect } from 'dva';
import '../../style/base_setting.css';
import BaseItems from './baseItems';

class BasicSetting extends React.Component{
    state = {
        checked:true
    };
    
    //删除当前tab
	deleteTab=()=>{
		const pane = eval(sessionStorage.getItem("pane"));
		if(pane.length<=1){
			return
		}
        this.props.dispatch({
            type:'tab/initDeletestate',
            payload:'120000'
        });
    }
    
    //保存基础设置
    saveBaseSetting = () =>{
        this.props.dispatch({type:'tab/loding',payload:true})
        let data = {};
        data.wareHouseArr = this.props.orderArr;
        const result=GetServerData('qerp.web.ws.sysconfig.update',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({type:'tab/loding',payload:false})
            if(json.code=='0'){
                message.success('基础设置修改成功',.8);
                this.props.dispatch({
                    type:'tab/initDeletestate',
                    payload:'120000'
                });
            }
        })
    }
    
    hindCancel = () =>{
        this.deleteTab()
    }

  	render(){       
     	return(
        	<div className='content_box'>
                <div className='base-info'>
                    <label className='title-label'>分单策略：</label><Checkbox checked={this.state.checked}>整单分配优先</Checkbox>       
                </div>
                <div className='base-info'>
                    <label className='title-label order-label'>分单顺序：</label>
                    <div className='order-wrapper'>
                       {
                           this.props.orderArr.map((ele,index)=>{
                               return <BaseItems key={index} wsId={ele.wsWarehouseId} wsName={ele.name} index={index}/>
                           })
                       }
                    </div>
                    <div className="clearfix"></div>
                </div>
                <div className='footer-div'>
                    <Button className='mr30 mt30' 
                            onClick={this.hindCancel.bind(this)}>
                        取消
                    </Button>
                    <Button  type="primary" onClick={this.saveBaseSetting}>保存</Button>
                </div>
        	</div>
      	)
    }
      
    componentDidMount(){
        this.props.dispatch({
            type:'jedit/fetch',
            payload:{code:'qerp.web.ws.sysconfig.query',values:{}}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true}) 
        //执行初始化数据方法获取list
		// this.initList(this.props.values,this.props.limit,this.props.currentPage);
	}
}

function mapStateToProps(state) {
    const {orderArr} = state.jedit;
    return {orderArr};
}

export default connect(mapStateToProps)(BasicSetting);
