import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon,message  } from 'antd';
import { connect } from 'dva';
import {deepcCloneObj} from '../../utils/commonFc';
//search
import OrdercgSearch from './search';
//table
import OrdercgTable from './table';

import {GetLodop} from './print';

class OrdercgIndex extends React.Component{
	state = {};

	addNew = () =>{
		const paneitem={title:'新建采购单',key:'202000edit',componkey:'202000edit',data:null}
  		this.props.dispatch({
	    	type:'tab/firstAddTab',
	    	payload:paneitem
		});
		this.props.dispatch({
            type:'ordercg/initState',
            payload:{}
		});
		this.props.dispatch({
			type:'ordercg/syncTaxRateDisabled',
			payload:true
		})
		this.props.dispatch({
			type:'ordercg/syncNothasFacepay',
			payload:true
		})
	}

	clearChooseInfo=()=>{
		const selectedRows=[];
		const selectedRowKeys = [];
		this.props.dispatch({
			type:'ordercg/select',
			payload:{selectedRowKeys,selectedRows}
		})
  	}
	  
	  //打印采购单
	  printCgorder = () => {
		console.log(this.props.selectedRows)
		if (this.props.selectedRows.length < 1) {
		  message.error('请选择采购单')
		  return;
		}
		for (var i = 0; i < this.props.selectedRows.length; i++) {
		  GetLodop(this.props.selectedRows[i].wsAsnId,'wsAsnOrder', this.props.selectedRows[i].asnNo)
		}
		 this.clearChooseInfo()
	  }

  	render(){
     	return(
        	<div className='content_box'>
                <OrdercgSearch/>
					<Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.addNew.bind(this)}
					>
						新建采购单
					</Button>
                    <Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
						onClick={this.printCgorder}
					>
						打印采购单
					</Button>
					<Button 
						type="primary" 
						size='large'
						className='mt20 ml10'
					>
						导出数据
					</Button>
             		<div className='mt15'><OrdercgTable/></div>
        	</div>
      	)
	}
	  
	componentDidMount(){}
}

function mapStateToProps(state) {
	const {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows} = state.ordercg;
    return {tableList,total,limit,currentPage,values,selectedRowKeys,selectedRows};
}

export default connect(mapStateToProps)(OrdercgIndex);
