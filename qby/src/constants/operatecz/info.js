import React from 'react';
import {GetServerData} from '../../services/services';
import { Button, Icon } from 'antd';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';
import Imgmodel from '../../components/model/modelimg';


class OperateczInfo extends React.Component{
	constructor(props) {
		super(props);
		this.columns = [{
			title: '操作',
			dataIndex: 'operateAction'
		}, {
			title: '操作时间',
			dataIndex: 'operateTime'
		}, {
			title: '充值状态',
			dataIndex: 'statusStr'
		}, {
			title: '操作人',
			dataIndex: 'operateUser'
		}, {
			title: '备注',
			dataIndex: 'remark'
		}];	
    }
	
    infofetch=(id)=>{
        this.props.dispatch({
            type:'operatecz/infofetch',
            payload:{code:'qerp.web.sp.voucher.detail',values:{spVoucherId:id}}
        })
    }

	render(){
		return(
			<div>
            
				<div className='mb10'><Cardlist cardtitle={this.props.cardtitle} cardlist={this.props.cardlist}/></div>
                
                
                <div className='clearfix mt10 mb10'>
                    <div className='fl' style={{lineHeight:'100px'}}>充值金额：{this.props.amount}</div>
                    <div className='fl' style={{marginLeft:'300px'}}>
                            <Imgmodel picUrl={this.props.picUrl}/>
                    </div>
                </div>
				<div className='mb10'>
                    <EditableTable 
                        columns={this.columns} 
                        dataSource={this.props.logs} 
                        title={this.props.logstitle}
                        bordered={true}
                    />
                </div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spVoucherId)
	}
	
}

function mapStateToProps(state) {
	const {cardtitle,cardlist,logstitle,logs,amount,picUrl,fileDomain} = state.operatecz;
	return {cardtitle,cardlist,logstitle,logs,amount,picUrl,fileDomain};
}
export default connect(mapStateToProps)(OperateczInfo);

