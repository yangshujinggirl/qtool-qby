import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class InventoryInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column =  [
			{
				title: '订单号',
				dataIndex: 'barcode'
			}, 
		  	{
            	title: '盘点sku数量',
            	dataIndex: 'spuName',
		  	},
			{
				title: '商品盘点数量',
				dataIndex: 'pdSkuType',
				
			},
			{
				title: '创建人',
				dataIndex: 'qty',
			},
			{
				title: '创建时间',
				dataIndex: 'recQty',
            }
        ];
        this.column1=[{
            title: '操作记录',
            dataIndex: 'barcode'
        }, 
          {
            title: '操作人',
            dataIndex: 'spuName',
          },
        {
            title: '操作时间',
            dataIndex: 'pdSkuType',
            
        }]


        this.state={
            headTit:[],
            details:[],
            details1:[]
        }

    }

    //请求信息
    infofetch=()=>{
        // const values={type:'1'}
        // const result=GetServerData('qerp.web.ws.warehouse.all.list',values);
        // result.then((res) => {
        //    return res;
        // }).then((json) => {
        //     if(json.code=='0'){
        //         const warehouses=json.warehouses
        //         this.setState({
        //             warehouses:warehouses
        //         })
        //     }else{
        //        message.error(json.message,.8);
        //     }
        // })
    }


	render(){
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle="商品盘点信息" cardlist={this.state.headTit}/>
				</div>
				<div className='mb10'>
					<EditableTable 
						columns={this.column} 
						dataSource={this.state.details} 
                        title="商品信息"
                        bordered={true}
						footer={false}/>
				</div>
                <div className='mb10'>
					<EditableTable 
						columns={this.column1} 
						dataSource={this.state.details1} 
                        title="订单日志"
                        bordered={true}
						footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		// this.infofetch(id)
	}
}


export default connect()(InventoryInfo);

