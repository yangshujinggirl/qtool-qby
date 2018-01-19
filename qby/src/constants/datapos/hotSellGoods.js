import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Pagination,Row, Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import moment from 'moment';
import {GetServerData} from '../../services/services';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

//热销商品
class HotSellGoodsForm extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            dataSource:[],
            total:0,
            currentPage:0,
            limit:10,
            startDate:"",
            endDate:"",
        };
        this.columns = [{
            title: '商品条码',
            dataIndex: 'barcode',
        },{
            title: '商品名称',
            dataIndex: 'name',
        },{
            title: '规格',
            dataIndex: 'displayName',
        },{
            title: '销售数量',
            dataIndex: 'posQty',
        },{
            title: '销售金额',
            dataIndex: 'posAmount',
        },{
            title: '商品剩余库存',
            dataIndex: 'invQty',
        }];
    }

    //时间改变
    dateChange = (date, dateString) =>{
        this.setState({
            startDate:dateString[0],
            endDate:dateString[1]
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

    //获取数据
    getServerData = (values) =>{
        const result=GetServerData('qerp.web.rp.pd.sell.list',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let dataList = json.analysis;
                if(dataList.length){
                    for(let i=0;i<dataList.length;i++){
                        dataList[i].key = i+1;
                    }
                    this.setState({
                        dataSource:dataList,
                        total:Number(json.total),
                        currentPage:Number(json.currentPage),
                        limit:Number(json.limit)
                    });
                }
            }
        })
    }

    //获取当前时间
    getNowFormatDate = () =>{
        const self =this;
        var curDate = new Date();
        var date = new Date(curDate.getTime() - 24*60*60*1000); //前一天;
        var seperator1 = "-";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate;
        this.setState({
            startDate:currentdate,
            endDate:currentdate
        },function(){
            let values = {
                shopId:this.props.shopId,
                currentPage:0,
                limit:10,
                startDate:this.state.startDate,
                endDate:this.state.endDate
            }
            self.getServerData(values);
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            let data = {
                shopId:this.props.shopId,
                currentPage:0,
                limit:10,
                startDate:this.state.startDate,
                endDate:this.state.endDate
            }
            this.getServerData(data);
        })
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="hot-sell">
                <div>
                    {/*搜索部分 */}
                    <Form  className='formbox'>
                        <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                            <Col span={24} className='formbox_col'>
                                <Row>
                                    <div className='serach_form'>
                                    <FormItem
                                    label="选择时间"
                                    labelCol={{ span: 5 }}
                                    wrapperCol={{span: 10}}>
                                        <RangePicker 
                                            value={this.state.startDate?[moment(this.state.startDate, dateFormat), moment(this.state.endDate, dateFormat)]:null}
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
                    <div className="hotSell-wrapper">
                        {
                            this.state.dataSource.length?
                            (
                                this.state.dataSource.length == 1? 
                                <div className="first-flag"></div>:
                                (
                                    this.state.dataSource.length == 2?
                                    <div>
                                        <div className="first-flag"></div>
                                        <div className="second-flag"></div>
                                    </div>
                                    :(
                                        <div>
                                            <div className="first-flag"></div>
                                            <div className="second-flag"></div>
                                            <div className="third-flag"></div>
                                        </div>
                                    )
                                )
                            )
                            :null
                        }
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
                        {/* <CommonTable 
                            columns={this.columns} 
                            dataSource={this.state.dataSource}
                            pagination={false}
                            total={20}
                            current={1}
                            pageSize={10}
                            onShowSizeChange={this.onShowSizeChange}
                            pageChange={this.pageChange}
                            /> */}
                    </div>
                </div>
                <div className="footer-pagefixed">
                    <Pagination 
                        total={this.state.total} 
                        current={this.state.currentPage+1}
                        pageSize={this.state.limit}
                        showSizeChanger 
                        onShowSizeChange={this.onShowSizeChange} 
                        onChange={this.pageChange} 
                        pageSizeOptions={['10','12','15','17','20','50','100','200']}
                        />
                </div>
            </div>
        );
    }

    componentDidMount(){
        //获取当前时间
        this.getNowFormatDate();
    }
}

function mapStateToProps(state){
   return {};
}

const HotSellGoods = Form.create()(HotSellGoodsForm);

export default connect(mapStateToProps)(HotSellGoods);