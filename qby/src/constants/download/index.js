import EditableTable from '../../components/table/tablebasic';
import {Getexpont} from '../../services/expont';

class DownloadIndex extends React.Component{
    constructor(props) {
		super(props);
		this.columns = [
            {
              title: '数据名称',
              dataIndex: 'voucherNo'
            }, {
              title: '数据申请时间',
              dataIndex: 'shopName'
            },{
              title: '数据产生时间',
              dataIndex: 'amount'
            }, {
              title: '数据状态',
              dataIndex: 'createTime'
            },{
              title: '操作',
              dataIndex: 'statusStr',
              render: (text, record) => {
                return (
                    <div className={record.state=='1'?'theme-color pointer':'placehold-color'} onClick={this.hindDown.bind(this,record)}>下载</div>
                );
              }
            }];  
        
        this.state={
            dataSource:[{
                voucherNo:'123',
                shopName:'2012-01-12',
                amount:'2013-12-13',
                createTime:'已生成',
                state:'1',
                id:'00123',
            }]
        }
    }
    hindDown=(record)=>{
        if(record.state=='1'){
            //调用下载接口
            // const data=this.props.values;
            // const result=Getexpont('qerp.web.ws.inv.bin.export',data)
        }
    }


	render(){
		return(
			<EditableTable bordered={true} dataSource={this.state.dataSource} columns={this.columns}/>
		)
	}
}

export default DownloadIndex;
