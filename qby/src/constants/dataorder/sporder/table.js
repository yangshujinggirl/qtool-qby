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
			dataIndex: 'qtySum'
		}, {
			title: '销售额',
			dataIndex: 'amountSum'
		},{
			title: '预售订单数',
			dataIndex: 'preSellQtySum'
		},{
			title: '预售销售额',
			dataIndex: 'preSellAmountSum'
		},{
			title: '直邮订单数',
			dataIndex: 'deQtySum'
		},{
			title: '直邮销售额',
			dataIndex: 'deAmountSum'
		},{
			title: '取消订单数',
			dataIndex: 'cancelQtySum'
		},{
			title: '取消销售额',
			dataIndex: 'cancelAmountSum'
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
        const result=GetServerData('qerp.web.rp.shop.order.list',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                const rpShopOrderDatas=json.rpShopOrderDatas
                this.setState({
                    rpShopOrderDatas:rpShopOrderDatas
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
                    dataSource={this.state.rpShopOrderDatas} 
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
