import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class DataTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns1 = [{
          title: '排名',
          dataIndex: 'rank'
        }, {
          title: '商品编码',
          dataIndex: 'code'
        },{
          title: '商品条码',
          dataIndex: 'barcode'
        },{
          title: '商品名称',
          dataIndex: 'name'
        },{
            title: '商品规格',
            dataIndex: 'displayName'
        },{
            title: '销售数量',
            dataIndex: 'posQty'
        },{
            title: '销售金额',
            dataIndex: 'posAmount'
        }];

        this.columns2 = [{
            title: '排名',
            dataIndex: 'rank'
          }, {
            title: '商品编码',
            dataIndex: 'code'
          },{
            title: '商品条码',
            dataIndex: 'barcode'
          },{
            title: '商品名称',
            dataIndex: 'name'
          },{
              title: '商品规格',
              dataIndex: 'displayName'
          },{
              title: '销售数量',
              dataIndex: 'qbyQty'
          },{
              title: '销售金额',
              dataIndex: 'qbyAmount'
          }];

          this.columns3 = [{
            title: '序号',
            dataIndex: 'rank'
          }, {
            title: '商品编码',
            dataIndex: 'code'
          },{
            title: '商品条码',
            dataIndex: 'barcode'
          },{
            title: '商品名称',
            dataIndex: 'name'
          },{
              title: '商品规格',
              dataIndex: 'displayName'
          },{
              title: '10天销售数量',
              dataIndex: 'qbyQty'
          },{
              title: '可售库存',
              dataIndex: 'qtyErp'
          }];
    }

   
    
    render() {
        return (
          <EditableTable 
            dataSource={this.props.datasouce} 
            columns={this.props.data.id=='1'?this.columns1:(this.props.data.id=='2'?this.columns2:this.columns3)} 
            footer={false}
            bordered={true}
            select={false}
           
            />
        );
    }
    componentDidMount(){
        const values={}
        if(this.props.data.id=='1'){
            this.props.dispatch({
                type:'datagodes/soucetetch',
                payload:{code:'qerp.web.rp.pd.analysis.list',values:values}
            })
        }
        if(this.props.data.id=='2'){
            this.props.dispatch({
                type:'datagodes/soucetetch',
                payload:{code:'qerp.web.rp.qby.sell.list',values:values}
            })
        }
        if(this.props.data.id=='3'){
            this.props.dispatch({
                type:'datagodes/soucetetch',
                payload:{code:'qerp.web.rp.purchase.list',values:values}
            })
        }
        if(this.props.data.id=='4'){
            this.props.dispatch({
                type:'datagodes/soucetetch',
                payload:{code:'qerp.web.rp.pd.analysis.list',values:values}
            })
        }
    }

}

function mapStateToProps(state) {
    const {datasouce} = state.datagodes;
    return {datasouce};
}

export default connect(mapStateToProps)(DataTable);
 


