import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class AdjustInfo extends React.Component{
	constructor(props) {
        super(props);
        this.column =  [
			{
				title: '商品条码',
				dataIndex: 'barcode'
			}, 
		  	{
            	title: '商品名称',
            	dataIndex: 'spuName',
		  	},
			{
				title: '商品规格',
				dataIndex: 'pdSkuType',
				
			},
			{
				title: '成本价',
				dataIndex: 'qty',
			},
			{
				title: '损益数量',
				dataIndex: 'recQty',
            },
            {
				title: '损益总价',
				dataIndex: 'recQty1',
			}
		];
        this.state={
            headTit:[],
            details:[]

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
					<Cardlist cardtitle="商品损益信息" cardlist={this.state.headTit}/>
				</div>
				<div className='mb10'>
					<EditableTable 
						columns={this.column} 
						dataSource={this.state.details} 
                        title="商品信息"
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


export default connect()(AdjustInfo);

