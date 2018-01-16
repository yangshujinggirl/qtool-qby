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

class MdCostIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:10,
            month:'',
        };
        this.columns = [{
            title: '门店名称',
            dataIndex: 'shopName',
        },{
            title: '报表时间',
            dataIndex: 'time',
        },{
            title: '成本报表',
            dataIndex: 'url',
            render:(text, row, index)=>{
                return <span style={{color:"#35BAB0"}} onClick={this.download.bind(this,text)}>下载</span>
            }
        }];
    }

    //下载
    download = (text) =>{
        let data = {
            type:"70",
            downloadParam:text
        };
        const result=GetServerData('qerp.web.sys.doc.task',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){

            }
        });
    }

    dateChange = (date, dateString) =>{
        this.setState({
            month:dateString
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
                spShopId:values.type
            },function(){
                let data = {
                    currentPage:0,
                    limit:10,
                    month:this.state.month,
                }
                self.getServerData(data);
            })
        })
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
                                    <FormItem label='商品名称'>
                                        {getFieldDecorator('name')(
                                        <Input placeholder="请输入商品名称"/>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="选择时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        <DatePicker  
                                            value={this.state.month?moment(this.state.month, dateFormat):null}
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
                {/*搜索部分 */}
                <div className='mt30'>
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
        const result=GetServerData('qerp.web.sp.shopCost.query',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let dataList = json.shopCosts;
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

    //获取当前时间
     getNowFormatDate = () =>{
        const self = this;
        var date = new Date();
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var beforeMonth = date.getMonth();
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (beforeMonth >= 1 && beforeMonth <= 9) {
            beforeMonth = "0" + beforeMonth;
        }
        if(beforeMonth == 0){
            beforeMonth = "12"
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month;
        this.setState({
            month:currentdate,
        },function(){
            let values = {
                currentPage:0,
                limit:10,
                month:this.state.month,
            }
            self.getServerData(values);
        })
    }

    componentDidMount(){
        //获取当前时间
        this.getNowFormatDate();
    }
}

function mapStateToProps(state){
   return {};
}

const MdCostIndex = Form.create()(MdCostIndexForm);

export default connect(mapStateToProps)(MdCostIndex);