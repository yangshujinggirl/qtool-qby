import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row, Col,AutoComplete} from 'antd';
import { Link } from 'dva/router';
import EditableTable from '../../../components/table/tablebasic';
import {GetServerData} from '../../../services/services';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker,MonthPicker } = DatePicker;
const dateFormat = 'YYYY-MM';
const confirm = Modal.confirm;


class MdCostIndexForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSources:[],
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            month:'',
            spShopId:null,
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
        // console.log(text)
        // this.exportData(70,text)
        window.open(text)
    }

    

    dateChange = (date, dateString) =>{
        this.setState({
            month:dateString
        })
    }

    
    pageChange=(page,pageSize)=>{
        this.setState({
            currentPage:page-1
        },function(){
            let data = {
                currentPage:0,
                limit:10,
                month:this.state.month,
                spShopId:this.state.spShopId
            }
            this.getServerData(data);
        });
    }
    onShowSizeChange=(current, pageSize)=>{
        this.setState({
            limit:pageSize,
            currentPage:current-1
        },function(){
            let data = {
                currentPage:0,
                limit:10,
                month:this.state.month,
                spShopId:this.state.spShopId
            }
            this.getServerData(data);
        })
    }

    handleSubmit = () =>{
        let data = {
            currentPage:0,
            limit:10,
            month:this.state.month,
            spShopId:this.state.spShopId
        }
        this.getServerData(data);
    }

    //智能搜索
    handleSearchs=(value)=>{
        this.setState({
            spShopId:null
        })
        let values={name:value}
        const result=GetServerData('qerp.web.sp.shop.list',values)
            result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                var shopss=json.shops
                var dataSources=[]
                for(var i=0;i<shopss.length;i++){
                    dataSources.push({
                        text:shopss[i].name,
                        value:shopss[i].spShopId
                    })
                }
                this.setState({
                    dataSources:dataSources
                });
            }
        })
    }

    //智能选择
    onSelect=(value)=>{
        this.setState({
            spShopId:value
        })
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const d = new Date()
        const data=String(d.getFullYear())+'-'+String((d.getMonth()+1))
        return (
            <div>
                <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row'>
                        <Col span={24} className='formbox_col'>
                            <Row>
                                <div className='serach_form'>
                                    <FormItem label='门店名称'>
                                        {getFieldDecorator('name')(
                                            <AutoComplete
                                            dataSource={this.state.dataSources}
                                            onSelect={this.onSelect}
                                            onSearch={this.handleSearchs}
                                            placeholder='请选择门店名称'
                                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                                        />    
                                        )}
                                    </FormItem>
                                    <FormItem
                                        label="选择时间"
                                        labelCol={{ span: 5 }}
                                        wrapperCol={{span: 10}}>
                                        <MonthPicker  
                                            defaultValue={moment(data, 'YYYY-MM')}
                                            className='noant-calendar-picker'
                                            format={dateFormat}
                                            onChange={this.dateChange.bind(this)} allowClear={false}/>
                                            
                                    </FormItem>
                                </div>
                        </Row>
                    </Col>
                </Row>
                <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                    <Button type="primary"  onClick={this.handleSubmit.bind(this)} size='large'>搜索</Button>
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
        var d = new Date()
        const data=String(d.getFullYear())+'-'+String((d.getMonth()+1))
        this.setState({
            month:data,
        },function(){
            let values = {
                currentPage:0,
                limit:10,
                month:this.state.month,
                spShopId:this.state.spShopId
            }
            this.getServerData(values);
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