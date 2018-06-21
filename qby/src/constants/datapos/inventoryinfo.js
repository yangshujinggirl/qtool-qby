import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';


class InventoryInfo extends React.Component{
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
				title: '系统数量',
				dataIndex: 'invQty',
			},
			{
				title: '盘点数量',
				dataIndex: 'checkQty',
      }, {
				title: '盘点差异',
				dataIndex: 'diffQty',
			}
    ];

    this.column1=[
      {
				title: '操作记录',
				dataIndex: 'action'
			},
		  {
        title: '操作人',
        dataIndex: 'operater',
      },
			{
				title: '操作时间',
				dataIndex: 'operateTime'
			}
    ]
    this.state={
      headTit:[],
      details:[],
      pdSpus:[],
      checkRecords:[]
    }
  }

    //请求信息
    infofetch=(id,no)=>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.pd.check.detail.query',{checkId:id});
        const result1=GetServerData('qerp.web.pd.check.record.query',{checkNo:no});
        result.then((res) => {
           return res;
        }).then((json) => {
            if(json.code=='0'){
              const headTit=[{
                lable:'订单号',
                text:this.props.data.checkNo
              },{
                lable:'盘点SKU数量',
                text:this.props.data.skuSum
              },{
                lable:'盘点商品数量',
                text:this.props.data.qty
              },{
                lable:'创建人',
                text:this.props.data.operater
              },{
                lable:'创建时间',
                text:this.props.data.operateTime
              }]
              this.setState({
                pdSpus:json.checkdetails,
                headTit:headTit
              })
            }
        })
        result1.then((res) => {
          return res;
        }).then((json) => {
          if(json.code=='0'){
            this.setState({
              checkRecords:json.checkRecords,
            })
          }
        })
      this.props.dispatch({ type: 'tab/loding', payload:false});
    }


	render(){
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle="商品盘点信息" cardlist={this.state.headTit}/>
				</div>
				<div className='mb10'>
					<EditableTable columns={this.column} dataSource={this.state.pdSpus} title="商品信息" bordered={true} footer={false}/>
				</div>
        <div className='mb10'>
					<EditableTable columns={this.column1} dataSource={this.state.checkRecords} title="订单日志" bordered={true} footer={false}/>
				</div>

			</div>
		)
	}
	componentDidMount(){
        this.infofetch(this.props.data.id,this.props.data.checkNo)
	}
}

export default connect()(InventoryInfo);

