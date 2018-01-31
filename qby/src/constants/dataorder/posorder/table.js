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
			dataIndex: 'rpDateStr'
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
		this.props.dispatch({ type: 'tab/loding', payload:true});
        const values={startDate:this.state.startDate,endDate:this.state.endDate}
        const result=GetServerData('qerp.web.rp.pos.order.list',values)
        result.then((res) => {
            return res;
        }).then((json) => {
			this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                const posOrderDatas=json.posOrderDatas
                this.setState({
                    posOrderDatas:posOrderDatas
                })
            }
        })
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
    hindChange=(data,datastr)=>{
		this.setState({
            startDate:datastr[0],
            endDate:datastr[1],
        },function(){
            this.initstockList()
        })
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
						allowClear={false}
                    />
                    <Button 
                        type="primary" 
                        className='ml10'
                        onClick={this.exportData.bind(this,41,values)}
                        >导出数据</Button>
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
