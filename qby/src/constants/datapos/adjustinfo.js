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
			}, {
          title: '商品名称',
          dataIndex: 'name',
      }, {
				title: '商品规格',
				dataIndex: 'displayName',
			}, {
				title: '成本价',
				dataIndex: 'averageRecPrice',
			}, {
				title: '损益数量',
				dataIndex: 'diffQty',
      }, {
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
        const result=GetServerData('qerp.web.pd.adjust.detail',values);
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
              const headTit=[{
                lable:'订单号',
                text:this.props.data.adjustNo
              },{
                lable:'创建人',
                text:this.props.data.operater
              },{
                lable:'损益时间',
                text:this.props.data.operateTime
              },{
                lable:'损益类型',
                text:this.props.data.typeStr
              },{
                lable:'损益备注',
                text:this.props.data.remark
              }]
              const pdSpus=json.adjustSpus
              this.setState({
                pdSpus:pdSpus,
                headTit:headTit
              })
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

