import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row, Col} from 'antd';
import { Link } from 'dva/router';
import EditableTable from '../../../components/table/tablebasic';
import {GetServerData} from '../../../services/services';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM';
const confirm = Modal.confirm;

class CostCheckIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[]
        };
        this.columns = [{
            title: '月份',
            dataIndex: 'name'
        },{
            title: '成本核算表',
            dataIndex: 'warn',
            render: (text, record) => {
              return (
                this.state.dataSource.length > 0 ?
                (
                  (!text && record.url)?
                  <div onClick = {this.onDownloadCheck.bind(this,record)} style={{color: '#35bab0', cursor:'pointer'}}>下载</div>
                  :<div>{text}</div>
                ) : null
              );
            }
        },{
              title: '预售订单信息',
              dataIndex: 'preSellwarn',
              render: (text, record) => {
                return (
                  this.state.dataSource.length > 0 ?
                  (
                    (!text && record.preSellUrl)?
                    <div onClick = {this.downloadPreSale.bind(this,record)} style={{color: '#35bab0', cursor:'pointer'}}>下载</div>
                    :<div>{text}</div>
                  ) : null
                );
              }
        }];
    }

    onDownloadCheck = (record) => {
        // this.exportData('71',record.url)
        window.open(record.url)
    }

   

    //预售订单下载
    downloadPreSale = (record) =>{
        // this.exportData('72',record.preSellUrl)
        window.open(record.preSellUrl)
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <EditableTable 
                    columns={this.columns} 
                    dataSource={this.state.dataSource}
                    footer={false}
                    bordered={true}
                    />
            </div>
        );
    }

    //获取数据
    getServerData = (values) =>{
        this.props.dispatch({ type: 'tab/loding', payload:true});
        const result=GetServerData('qerp.web.pd.costmonthdata.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            this.props.dispatch({ type: 'tab/loding', payload:false});
            if(json.code=='0'){
                let dataList = json.costmonthdatas;
                if(dataList.length){
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                    }
                }
                this.setState({
                    dataSource:dataList
                })
            }
        })
    }

    componentDidMount(){
        let values = {};
        this.getServerData(values);
    }
}

function mapStateToProps(state){
   return {};
}

const CostCheckIndex = Form.create()(CostCheckIndexForm);

export default connect(mapStateToProps)(CostCheckIndex);