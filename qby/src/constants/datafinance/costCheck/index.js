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
                  (record.url)?
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
                    (record.preSellUrl)?
                    <div onClick = {this.downloadPreSale.bind(this,record)} style={{color: '#35bab0', cursor:'pointer'}}>下载</div>
                    :<div>{text}</div>
                  ) : null
                );
              }
        },{
            title: '下单未发货数据',
            dataIndex: 'preSellwarn1',
            render: (text, record) => {
              return (
                this.state.dataSource.length > 0 ?
                (
                  record.url?
                    <div onClick = {this.expressData.bind(this,"74",record)} style={{color: '#35bab0', cursor:'pointer'}}>导出</div>
                    :<div>{record.warn}</div>
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

    //导出
    expressData = (type,data) => {
		const values={
			type:type,
			downloadParam:{month:data.name},
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
