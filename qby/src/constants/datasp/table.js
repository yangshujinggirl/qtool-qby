import React from 'react';
import { connect } from 'dva';
import EditableTable from '../../components/table/tablebasic';
import TableLink from '../../components/table/tablelink';

class SpselldataTable extends React.Component {
	constructor(props) {
        super(props);
        this.columns1 = [{
          title: '排名',
          dataIndex: 'rank'
        }, {
          title: '门店名称',
          dataIndex: 'name'
        },{
          title: '订货商品数量',
          dataIndex: 'qbyQty'
        },{
          title: '订货金额',
          dataIndex: 'qbyAmount'
        },{
            title: '销售商品数量',
            dataIndex: 'posQty'
        },{
            title: '销售金额',
            dataIndex: 'posAmount'
        }];

        this.columns2 = [{
            title: '序号',
            dataIndex: 'rank'
          }, {
            title: '门店名称',
            dataIndex: 'name'
          },{
            title: '历史七天订购商品数量',
            dataIndex: 'qbyQty'
          },{
            title: '历史七天订购金额',
            dataIndex: 'qbyAmount'
          },{
              title: '历史七天销售商品数量',
              dataIndex: 'posQty'
          },{
              title: '历史七天销售金额',
              dataIndex: 'posAmount'
          },{
              title: '销购比',
              dataIndex: 'saleRatio'
          }];

          this.columns3 = [{
            title: '序号',
            dataIndex: 'rank'
          }, {
            title: '门店名称',
            dataIndex: 'name'
          },{
            title: '未订货天数',
            dataIndex: 'noOrder'
          }];
    }

   
    
    render() {
        return (
          <EditableTable 
            dataSource={this.props.tabledatasouce} 
            columns={this.props.data.id=='1'?this.columns1:(this.props.data.id=='4'?this.columns3:this.columns2)} 
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
                type:'dataspsell/soucetetch',
                payload:{code:'qerp.web.rp.shop.rank.list',values:values}
            })
        }
        if(this.props.data.id=='2'){
            this.props.dispatch({
                type:'dataspsell/soucetetch',
                payload:{code:'qerp.web.rp.shop.study.list',values:values}
            })
        }
        if(this.props.data.id=='3'){
            this.props.dispatch({
                type:'dataspsell/soucetetch',
                payload:{code:'qerp.web.rp.shop.guidance.list',values:values}
            })
        }
        if(this.props.data.id=='4'){
            this.props.dispatch({
                type:'dataspsell/soucetetch',
                payload:{code:'qerp.web.rp.shop.careful.list',values:values}
            })
        }
    }

}

function mapStateToProps(state) {
    const {tabledatasouce} = state.dataspsell;
    return {tabledatasouce};
}

export default connect(mapStateToProps)(SpselldataTable);
 


