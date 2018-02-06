import { connect } from 'dva';
import EditableTable from '../../../components/table/tablemodel';
import TableLink from '../../../components/table/tablelink';


class DataspfenTable extends React.Component {
	constructor(props) {
        super(props);
		this.columns = [{
            title: '门店名称',
            dataIndex: 'shopName'
          },{
            title: '食品类数量',
            dataIndex: 'posQty'
          }, {
            title: '食品类金额',
            dataIndex: 'posAmount'
          },{
            title: '分成金额',
            dataIndex: 'intoAmount'
		  },{
            title: '非食品数量',
            dataIndex: 'notPosQty'
		  },{
            title: '非食品金额',
            dataIndex: 'notPosAmount'
          },{
            title: '分成金额',
            dataIndex: 'notIntoAmount'
          },{
            title: '下载',
			dataIndex: 'notIntoAmount',
			render: (text, record) => {
                return (
                    <TableLink text='下载' hindClick={this.lookInfo.bind(this,record)} type='1'/>
                );
            }
          }];   
    }
	

	lookInfo=(record)=>{
		const data={
			shopId:record.shopId,
			startRpDate:record.startRpDate,
		}
		this.exportData(57,data)

	}

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


	//分页方法
	pageChange=(page,pageSize)=>{
        this.initstockList(this.props.values,pageSize,Number(page-1))
	}
	//pagesize变化
	pageSizeChange=(current,size)=>{
        this.initstockList(this.props.values,size,0)
	}
    
    //列表数据请求   
    initstockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'dataspfen/fetch',
            payload:{code:'qerp.web.rp.shop.Joint.division.page',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    render() {
        return (
			<EditableTable
				dataSource={this.props.divisions} 
				columns={this.columns} 
				pageChange={this.pageChange.bind(this)}
				pageSizeChange={this.pageSizeChange.bind(this)}
				total={this.props.total}
				limit={this.props.limit}
				current={Number(this.props.currentPage)+1}
				/>
        );
	}
	
    
}

function mapStateToProps(state) {
    const {divisions,limit,currentPage,total,values} = state.dataspfen;
    return {divisions,limit,currentPage,total,values};
}

export default connect(mapStateToProps)(DataspfenTable);
