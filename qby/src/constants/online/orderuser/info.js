import {GetServerData} from '../../../services/services';
import { connect } from 'dva';
import EditableTable from '../../../components/table/tablebasic';
import EditableTableInfo from '../../../components/table/table_info';
import Cardlist from '../../../components/table/cardlist';

class OrdercgInfo extends React.Component{
	constructor(props) {
        super(props);
        this.state={
            orderinfo:[],
            shouinfo:[]

        }
        this.column1 = [
			{
            	title: '商品名称',
            	dataIndex: 'pdName'
			}, 
			{
            	title: '规格',
            	dataIndex: 'pdSkuType'
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
            	dataIndex: 'qtyReceived'
		  	},
			{
				title: '应付价格',
				dataIndex: 'price'
			},
			{
				title: '实付价格',
				dataIndex: 'amount'
			}
		];
        this.column2 = [
			{
            	title: '子单号',
            	dataIndex: 'operateName'
			}, 
			{
            	title: '保税仓库',
            	dataIndex: 'operateTime'
			}, 
			{
            	title: '物流公司',
            	dataIndex: 'operateUser'
            },
            {
            	title: '物流单号',
            	dataIndex: 'operateUser1'
            },
            {
            	title: '获取物流时间',
            	dataIndex: 'operateUser2'
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
            	dataIndex: 'operateUser1'
            }
        ];



        

    }

    //获取订单信息列表
	infofetch=(wsAsnId)=>{
        const wsAsnId={wsAsnId:wsAsnId}
        const result=GetServerData('qerp.web.bs.userinfo',values)
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
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
                const goodinfo=[]
                //物流信息
                const Logisticsinfo=[]
                //订单日志
                const orderLogs=[]
                //子单集合
                childOrderinfs=[]


            }
        }) 
    }
	render(){
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle='订单信息' cardlist={this.state.orderinfo}/>
				</div>
                <div className='mb10'>
					<Cardlist cardtitle='收货信息' cardlist={this.state.shouinfo}/>
				</div>
				<div className='mb10'>
					<EditableTable 
						columns={this.column1} 
						dataSource={this.props.details} 
                        title='商品信息'
                        bordered={true}
						footer={false}
					/>
				</div>
                {







                }

				<div className='mb10'>
					<EditableTable 
						columns={this.column2} 
						dataSource={this.props.logs} 
                        title="物流信息"
                        bordered={true}
						footer={false}/>
				</div>
                <div className='mb10'>
					<EditableTable 
						columns={this.column3} 
						dataSource={this.props.logs} 
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
export default connect(mapStateToProps)(OrdercgInfo);

