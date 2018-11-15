import { message, Button } from 'antd';
import { connect } from 'dva';
import {dismissAuditApi} from "../../../services/online/orderuser"
import './orderuser.css';

class Tabletitle extends React.Component {
	dismissAudit =()=> {
		const {ecSuborderId} = this.props;
		console.log(this.props);
		this.props.dispatch({
			type:'tab/initDeletestate',
			payload:"801000edit"+this.props.data.id,
		});
		// dismissAuditApi({status:4,ecSuborderId})
		// .then(res => {
		// 	if(res.code == "0"){
		// 		message.success("驳回审核成功");
		// 		this.props.dispatch({
		//       type:'tab/initDeletestate',
		//       payload:"801000edit"+this.props.data.id,
		//     });
		// 	}
		// })
	}
	render() {
		console.log(this.props)
		return (
			<div>
				<div className='clearfix' style={{height:'32px',lineHeight:"32px"}}>
					<div className='fl'>子单{this.props.listindex}信息</div>
					{
						(this.props.postgood && this.props.isdelivery)?
						<div className='fr'>
						<Shipeditmodel
							modeltit={'子单'+this.props.listindex+'信息'}
							ecOrderId={this.props.ecOrderId}
							ecSuborderNo={this.props.ecSuborderNo}
							infofetch={this.props.infofetch}
							ecSuborderId={this.props.ecSuborderId}/>
						</div>:null
					}
				</div>
				<div className='clearfix'>
					<div className='cardlist_item fl'><label>子单号：</label><span>{this.props.ecSuborderNo}</span></div>
					<div className='cardlist_item fl'><label>保税仓库：</label><span>{this.props.warehouseStr}</span></div>
					<div className='cardlist_item fl'><label>子单状态：</label><span>{this.props.statusStr}</span></div>
					<Button type="primary" className="dismiss_audit" onClick={this.dismissAudit}>驳回审核</Button>
				</div>
      </div>
		);
	}
}

function mapStateToProps(state) {
    const {headTitle,headTit,details,logs} = state.ordercg;
	return {headTitle,headTit,details,logs};
}
export default connect(mapStateToProps)({Tabletitle});
