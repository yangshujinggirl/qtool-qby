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
            	dataIndex: 'name',
		  	},
			{
				title: '商品规格',
				dataIndex: 'displayName',
				
			},
			{
				title: '成本价',
				dataIndex: 'averageRecPrice',
			},
			{
				title: '损益数量',
				dataIndex: 'adjustQty',
            },
            {
				title: '损益总价',
				dataIndex: 'adjustAmount',
			}
		];
        this.state={
            headTit:[],
			details:[],
			pdSpus:[]
        }
    }

    //请求信息
    infofetch=(id)=>{
        const values={adjustId:id}
        const result=GetServerData('qerp.pos.pd.adjust.detail',values);
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
				const headTit=[{
					label:'订单号',
					text:this.props.data.adjustNo
				},{
					label:'创建人',
					text:this.props.data.operater
				},{
					label:'损益时间',
					text:this.props.data.operateTime
				},{
					label:'损益类型',
					text:this.props.data.typeStr
				},{
					label:'损益备注',
					text:this.props.data.remark
				}]
                const pdSpus=json.pdSpus
                this.setState({
					pdSpus:pdSpus,
					headTit:headTit
                })
            }else{
               message.error(json.message,.8);
            }
        })
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
						dataSource={this.state.pdSpus} 
                        title="商品信息"
                        bordered={true}
						footer={false}/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.id)
	}
}


export default connect()(AdjustInfo);

