import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class OperateinoutInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column = [{
            title: '配货单号',
            dataIndex: 'wsOrderNo'
        }, {
            title: '订单号',
            dataIndex: 'spOrderNos',
            render: (text, record) => {
                return (
                    <ul>
                        {
                            record.spOrderNos.map((item,index)=>{
                                return <li key = {index}>{item}</li>
                            })
                        }
                    </ul>
                );
            }
        },{
            title: '快递单号',
            dataIndex: 'expresses',
            render: (text, record) => {
                return (
                    <ul>
                        {
                            record.expresses.map((item,index)=>{
                                return <li key = {index}>{item.expressCompany+'：'+item.expressCode}</li>
                            })
                        }
                    </ul>
                );
            }
        },{
            title: '发货时间',
            dataIndex: 'expressTime'
        },{
            title: '物流费用',
            dataIndex: 'fee'
        }];
    }

    
	infofetch=(spExpressFeeId)=>{
      //获取订单信息列表
			this.props.dispatch({
				type:'operateinout/infofetch',
				payload:{code:'qerp.web.sp.expressfee.detail',values:{spExpressFeeId:spExpressFeeId}}
            }) 
    }
    
	render(){
		return(
			<div>
				<div className='mb10'><Cardlist cardtitle="物流信息" cardlist={this.props.cardlist}/></div>
				<div className='mb10'>
					<EditableTable  columns={this.column} 
                                    dataSource={this.props.infoList}
                                    bordered={true}
                                    footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.spExpressFeeId)
	}
}

function mapStateToProps(state) {
    const {cardlist,infoList} = state.orderpos;
    return {cardlist,infoList};
}
export default connect(mapStateToProps)(OperateinoutInfo);

