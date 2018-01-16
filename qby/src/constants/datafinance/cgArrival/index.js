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
const dateFormat = 'YYYY-MM-DD';

class CgArrivalIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:10,
            month:'',
            createTimeST:'',
            createTimeET:''
        };
        this.columns = [{
            title: '供应商名称',
            dataIndex: 'supplierName'
          },{
            title: '到货金额(含税)',
            dataIndex: 'receivedAmount'
          },{
            title: '到货数量',
            dataIndex: 'receivedQty'
          }];
    }

    dateChange = (date, dateString) =>{
        this.setState({
            createTimeST:dateString[0],
            createTimeET:dateString[1]
        })
    }

    //表格的方法
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page-1
        });
    }
    onShowSizeChange=(current, pageSize)=>{
        this.setState({
            limit:pageSize,
            currentPage:current-1
        })
    }

    handleSubmit = (e) =>{
        const self = this;
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            this.setState({
                supplierName:values.supplierName
            },function(){
                let data = {
                    currentPage:0,
                    limit:10,
                    supplierName:this.state.supplierName,
                    createTimeST:this.state.createTimeST,
                    createTimeET:this.state.createTimeET
                }
                self.getServerData(data);
            })
        })
    }

    //导出数据
	exportData = () => {
		
	}

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row'>
                        <Col span={24} className='formbox_col'>
                            <Row>
                                <div className='serach_form'>
                                    <FormItem label='供应商名称'>
                                        {getFieldDecorator('supplierName')(
                                            <Input placeholder="请输入供应商名称"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="收货时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        <RangePicker  
                                            value={this.state.createTimeST?[moment(this.state.createTimeST, dateFormat),moment(this.state.createTimeET, dateFormat)]:null}
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} />
                                    </FormItem>
                                </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary" htmlType="submit" onClick={this.handleSubmit.bind(this)} size='large'>搜索</Button>
                </div>
                </Form>
                <Button 
						type="primary" 
						size='large'
						className='mt20'
						onClick={this.exportData}
					>
                        导出数据
				</Button>
                {/*搜索部分 */}
                <div className='mt15'>
                    <EditableTable 
                        columns={this.columns} 
                        dataSource={this.state.dataSource}
                        footer={true}
                        pageChange={this.pageChange.bind(this)}
                        pageSizeChange={this.onShowSizeChange.bind(this)}
                        total={this.state.total}
                        limit={this.state.limit}
                        current={this.state.currentPage+1}
                        bordered={true}
                        />
                </div>
            </div>
        );
    }

    //获取数据
    getServerData = (values) =>{
        const result=GetServerData('qerp.web.ws.purchasedata.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let dataList = json.purchasedatas;
                if(dataList.length){
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                    }
                }
                this.setState({
                    dataSource:dataList,
                    total:Number(json.total),
                    currentPage:Number(json.currentPage),
                    limit:Number(json.limit)
                })
            }
        })
    }

    componentDidMount(){
        let data = {
            currentPage:0,
            limit:10
        }
        //获取当前时间
        this.getServerData(data);
    }
}

function mapStateToProps(state){
   return {};
}

const CgArrivalIndex = Form.create()(CgArrivalIndexForm);

export default connect(mapStateToProps)(CgArrivalIndex);