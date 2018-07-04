import {GetServerData} from '../../services/services';
import { connect } from 'dva';
// import EditableTable from '../../components/table/tablebasic';
import Cardlist from '../../components/table/cardlist';
import TableDefault from '../../components/table/table_default';

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
      pdSpus:[],
			limit:15,
			currentPage:0,
			total:0
    }
    }

    //请求信息
    infofetch=(id)=>{
        const values={adjustId:id,limit:this.state.limit,currentPage:this.state.currentPage}
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
                headTit:headTit,
								limit:json.limit,
								currentPage:json.currentPage,
								total:json.total
              })
            }
        })
    }
		pageChange=(page,pageSize)=>{
			console.log(page)
			console.log(pageSize)
			// this.initList(pageSize,Number(page-1))
			this.setState({
				limit:pageSize,
				currentPage:Number(page-1)
			},()=>{
				this.infofetch(this.props.data.id)
			})

		}
		//pagesize变化
		pageSizeChange=(current,size)=>{
					// this.initList(size,0)
					this.setState({
						limit:size,
						currentPage:Number(current-1)
					},()=> {
						this.infofetch(this.props.data.id)
					})
		}
	render(){
		return(
			<div>
				<div className='mb10'>
					<Cardlist cardtitle="商品损益信息" cardlist={this.state.headTit}/>
				</div>
				<div className='mb10'>
					<TableDefault
						columns={this.column}
						dataSource={this.state.pdSpus}
            title="商品信息"
            bordered={true}
						pageChange={this.pageChange.bind(this)}
						pageSizeChange={this.pageSizeChange.bind(this)}
						total={Number(this.state.total)}
						limit={Number(this.state.limit)}
						current={Number(this.state.currentPage)+1}
						/>
				</div>
			</div>
		)
	}
	componentDidMount(){
		this.infofetch(this.props.data.id)
	}
}


export default connect()(AdjustInfo);
