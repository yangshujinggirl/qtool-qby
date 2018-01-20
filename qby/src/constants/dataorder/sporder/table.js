import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';
import { DatePicker,Switch,Button,Modal } from 'antd'
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
import {timeForMat} from '../../../utils/meth';
import {GetServerData} from '../../../services/services';
const confirm = Modal.confirm;

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
    
    //导出数据
	exportData = (type,data) => {
		const values={
			type:type,
			downloadParam:data,
		}
		const result=GetServerData('qerp.web.sys.doc.task',values);
		result.then((res) => {
			return res;
		}).then((json) => {
			if(json.code=='0'){
				var _dispatch=this.props.dispatch
				confirm({
					title: '数据已经进入导出队列',
					content: '请前往下载中心查看导出进度',
					cancelText:'稍后去',
					okText:'去看看',
					onOk() {
						const paneitem={title:'下载中心',key:'000001',componkey:'000001',data:null}
						_dispatch({
							type:'tab/firstAddTab',
							payload:paneitem
						});
						_dispatch({
							type:'downlaod/fetch',
							payload:{code:'qerp.web.sys.doc.list',values:{limit:15,currentPage:0}}
						});
					},
					onCancel() {
						
					},
	  			});
			}
		})
	
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
        const values={startDate:this.state.startDate,endDate:this.state.endDate}
		return (
            <div>
                <p>订单变化数据</p>
                <div className='mt10'>
                    <RangePicker
                        defaultValue={[moment(startDate, dateFormat), moment(endDate, dateFormat)]}
                        format={dateFormat}
                        onChange={this.hindChange.bind(this)}
                    />
                    <Button 
                        type="primary" 
                        className='ml10'
                        onClick={this.exportData.bind(this,40,values)}
                    >导出数据</Button>
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
