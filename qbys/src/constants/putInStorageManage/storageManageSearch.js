import React from 'react';
import { connect } from 'dva';
import { Input, Row, Col ,Select,DatePicker,Button  } from 'antd';
const Option = Select.Option;
const {  RangePicker } = DatePicker;

class StorageManageSearch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            //首先将需要传输的数据字段以state的方式展示
            pdBarcode: '',
            pdName: '',
            name:'',
            asnNo:'',
            status:null,
            expectedTimeST:'',
            expectedTimeET:'',
            createTimeST:'',
            createTimeET:'',
            currentPage:0
          };
    }

    //点击搜索按钮获取搜索数据
    searchTable = () =>{
        this.props.dispatch({
            type:'storageManage/updateData',
            payload:true
        });
        const data =  this.state;
        this.props.getSearchData(data);
    }

    //对于普通的input输入框,使用该方法
    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]:target.value
        });
      }
    
      //处理select框，传递该select字段
      handleSelectChange = (name,value) =>{
           let selectVal = null;
           if(value){
               selectVal = parseInt(value);
           }else{
               selectVal = null;
           }
           this.setState({
                [name]:selectVal
            });
      }

      //处理datapick,需传递两个字段
      handleTimeChange = (nameStart,nameEnd,date, dateString) =>{
        this.setState({
            [nameStart]:dateString[0],
            [nameEnd]:dateString[1]
        });
      }
    
    render() {
        return (   
    		<div className='search-wrapper'>
                 <Row className='row-wrapper'>
                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <label>商品条码：</label>
                            </Col>
                            <Col span={14}>
                                <Input size="large" placeholder="请输入" name='pdBarcode' 
                                        value={this.state.pdBarcode}
                                        onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <label>商品名称：</label>
                            </Col>
                            <Col span={14}>
                                <Input size="large" placeholder="请输入" name='pdName'
                                    value={this.state.pdName}
                                    onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <label>供应商名称：</label>
                            </Col>
                            <Col span={14}>
                                <Input size="large" placeholder="请输入" name='name'
                                    value={this.state.name}
                                    onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <label>收货单号：</label>
                            </Col>
                            <Col span={14}>
                                <Input size="large" placeholder="请输入" name='asnNo'
                                    value={this.state.asnNo}
                                    onChange={this.handleInputChange.bind(this)}/>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Row className='row-wrapper'>
                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <label>订单状态：</label>
                            </Col>
                            <Col span={14}>
                                <Select defaultValue="" 
                                onChange={this.handleSelectChange.bind(this,'status')} 
                                >
                                    <Option value="">全部</Option>
                                    <Option value="10">待收货</Option>
                                    <Option value="20">收货中</Option>
                                    <Option value="30">已收货</Option>
                                </Select>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={9}>
                                <label>预计送达时间：</label>
                            </Col>
                            <Col span={15}>
                                <RangePicker 
                                    onChange={this.handleTimeChange.bind(this,'expectedTimeST','expectedTimeET')}
                                    />
                            </Col>
                        </Row>

                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <label>订单时间：</label>
                            </Col>
                            <Col span={15}>
                                <RangePicker
                                    onChange={this.handleTimeChange.bind(this,'createTimeST','createTimeET')} 
                                    />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={6}>
                        <Row>
                            <Col span={8}>
                                <Button type="primary" className='search-btn' onClick={this.searchTable.bind(this)}>搜索</Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps)(StorageManageSearch);