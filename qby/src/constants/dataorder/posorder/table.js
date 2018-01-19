import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';
import { DatePicker,Switch,Button } from 'antd'
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
import {timeForMat} from '../../../utils/meth';
import {GetServerData} from '../../../services/services';

class DataclassTable extends React.Component {
	constructor(props) {
		super(props);
		this.columns = [{
			title: '时间',
			dataIndex: 'rpDate'
		},{
			title: '总订单数',
			dataIndex: 'orderQtySum'
		}, {
			title: '销售额',
			dataIndex: 'amount'
		},{
			title: '会员订单数',
			dataIndex: 'mbCardQtySum'
		},{
			title: '会员销售额',
			dataIndex: 'mbCardAmount'
		},{
			title: '充值订单数',
			dataIndex: 'chargeQtySum'
		},{
			title: '充值销售额',
			dataIndex: 'chargeAmount'
		},{
			title: '退款订单数',
			dataIndex: 'returnQtySum'
		},{
			title: '退款销售额',
			dataIndex: 'returnAmount'
        }];   
        this.state={
            rpShopOrderDatas:[],
            startDate:null,
            endDate:null
        }
	}
	
	
	
	//列表数据请求   
	initstockList=()=>{
        const values={startDate:this.state.startDate,endDate:this.state.endDate}
        const result=GetServerData('qerp.web.rp.pos.order.list',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const posOrderDatas=json.posOrderDatas
                this.setState({
                    posOrderDatas:posOrderDatas
                })
            }
        })
	}
    hindChange=()=>{

    }
	render() {
        const startDate=timeForMat(7).t2
        const endDate=timeForMat(7).t1
		return (
            <div>
                <p>订单变化数据</p>
                <div className='mt10'>
                    <RangePicker
                        defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                        format={dateFormat}
                        onChange={this.hindChange.bind(this)}
                    />
                    <Button type="primary" className='ml10'>导出数据</Button>
                </div>
                <div className='mt10'>
                <EditableTable
                    dataSource={this.state.posOrderDatas} 
                    columns={this.columns} 
                    footer={false}
                    bordered={true}
                    />
                </div>
            </div>
		);
    }
    componentDidMount(){
        const startDate=timeForMat(7).t2
        const endDate=timeForMat(7).t1
        this.setState({
            startDate:startDate,
            endDate:endDate,
        },function(){
            this.initstockList()
           
        })
    }
	
	
}



export default connect()(DataclassTable);
