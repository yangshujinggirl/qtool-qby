import {GetServerData} from '../../../services/services';
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';
import EditableTableInfo from '../../../components/table/table_info';
import Cardlist from '../../../components/table/cardlist';
import Cardlists from './cardlistedit';
import './orderuser.css';




 //订单信息
 const orderinfo=[
	{lable:'订单号',text:'122'},
	{lable:'有赞订单',text:'122'},
	{lable:'下单时间',text:'122'},
	{lable:'订单状态',text:'122'},
	{lable:'归属门店',text:'122'},
	{lable:'订单金额',text:'122'},
	{lable:'实际支付金额',text:'122'}
]
//收货信息
const shouinfo=[
	{lable:'姓名',text:'122'},
	{lable:'身份证号',text:'122'},
	{lable:'收货人',text:'122'},
	{lable:'收货电话',text:'122'},
	{lable:'收货地址',text:'122'}
]
//商品信息
const goodinfo=[{
	pdName:'商品名称',
	operateTime:'规格',
	pdCode:'商品编码',
	qty:'商品数量',
	price:'商品价格',
	yingprice:'应付价格',
	amount:'实付价格'
}]
//物流信息
const Logisticsinfo=[{
	childorder:'子单号',
	shuiws:'保税仓库',
	wsgong:'物流公司',
	wsorder:'物流单号',
	wstime:'获取物流时间'
}]
//订单日志
const orderLogs=[{
	operateName:'操作',
	operateTime:'操作时间',
	operateUser:'操作人',
	remark:'备注'
}]
//子单集合
const childOrderinfs=[{
	childorder:'子单号',
	childws:'保税仓库',
	childstate:'子单状态',
	data:[{
		pdName:"商品名称",
		operateTime:'规格',
		pdCode:'商品编码',
		qty:'商品数量',
		price:'商品价格',
		yingprice:'应付价格',
		amount:'实付价格'
	}]
}]


class OrderuserInfo extends React.Component{
	constructor(props) {
        super(props);
        this.state={
            orderinfo:orderinfo,
			shouinfo:shouinfo,
			childOrderinfs:childOrderinfs,
			goodinfo:goodinfo,
			Logisticsinfo:Logisticsinfo,
			orderLogs:orderLogs,
			canedit:true
        }
        this.column1 = [
			{
            	title: '商品名称',
            	dataIndex: 'pdName'
			}, 
			{
            	title: '规格',
            	dataIndex: 'operateTime'
			}, 
			{
            	title: '商品编码',
            	dataIndex: 'pdCode'
			},
			{
            	title: '商品数量',
            	dataIndex: 'qty'
			},
			{
            	title: '商品价格',
            	dataIndex: 'price'
		  	},
			{
				title: '应付价格',
				dataIndex: 'yingprice'
			},
			{
				title: '实付价格',
				dataIndex: 'amount'
			}
		];
        this.column2 = [
			{
            	title: '子单号',
            	dataIndex: 'childorder'
			}, 
			{
            	title: '保税仓库',
            	dataIndex: 'shuiws'
			}, 
			{
            	title: '物流公司',
            	dataIndex: 'wsgong'
            },
            {
            	title: '物流单号',
            	dataIndex: 'wsorder'
            },
            {
            	title: '获取物流时间',
            	dataIndex: 'wstime'
			}
        ];
        this.column3 = [
			{
            	title: '操作',
            	dataIndex: 'operateName'
			}, 
			{
            	title: '操作时间',
            	dataIndex: 'operateTime'
			}, 
			{
            	title: '操作人',
            	dataIndex: 'operateUser'
            },
            {
            	title: '备注',
            	dataIndex: 'remark'
            }
		];
    }

    //获取订单信息列表
	infofetch=(wsAsnId)=>{
        // const wsAsnId={wsAsnId:wsAsnId}
        // const result=GetServerData('qerp.web.bs.userinfo',values)
        // result.then((res) => {
        //    return res;
        // }).then((json) => {
        //     if(json.code=='0'){
        //        this.setState({
		// 			orderinfo:orderinfo,
		// 			shouinfo:shouinfo,
		// 			goodinfo:goodinfo,
		// 			Logisticsinfo:Logisticsinfo,
		// 			orderLogs:orderLogs,
		// 			childOrderinfs:childOrderinfs
		// 	   })
		// 	}
        // }) 
    }
	render(){
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle='订单信息' cardlist={this.state.orderinfo}/>
				</div>
                <div className='mb10 list-cad'>
					<Cardlists cardtitle='收货信息' cardlist={this.state.shouinfo} canedit={this.state.canedit}/>
				</div>
				<div className='mb10'>
					<EditableTable 
						columns={this.column1} 
						dataSource={this.state.goodinfo} 
                        title='商品信息'
                        bordered={true}
						footer={false}
					/>
				</div>
                {
					this.state.childOrderinfs.length>0
					?
					this.state.childOrderinfs.map((item,index)=>{
						return (
							<div className='mb10' key={index}>
								<EditableTable 
									columns={this.column1} 
									dataSource={item.data} 
									title={"子单"+(index+1)+'信息'}
									childorder={item.childorder}
									childws={item.childws}
									childstate={item.childstate}
									bordered={true}
									footer={false}/>
							</div>
						)
					})
					:null
                }
				<div className='mb10'>
					<EditableTable 
						columns={this.column2} 
						dataSource={this.state.Logisticsinfo} 
                        title="物流信息"
                        bordered={true}
						footer={false}/>
				</div>
                <div className='mb10'>
					<EditableTable 
						columns={this.column3} 
						dataSource={this.state.orderLogs} 
                        title="订单日志"
                        bordered={true}
						footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		// this.infofetch(this.props.data.wsAsnId)
	}
}

function mapStateToProps(state) {
    const {headTitle,headTit,details,logs} = state.ordercg;
	return {headTitle,headTit,details,logs};
}
export default connect(mapStateToProps)(OrderuserInfo);

