import React from 'react';
import { connect } from 'dva';
import { Table, Input, Icon, Button, Popconfirm ,Tabs,Form, Select,Radio,Modal,message,DatePicker,Tooltip,Pagination,Row,Col} from 'antd';
import { Link } from 'dva/router';
import '../../style/dataManage.css';
import EditableTable from '../../components/table/tablebasic';
import {GetServerData} from '../../services/services';
import {timeForMattoday} from '../../utils/meth';
import {removeSpace} from '../../utils/meth';
import moment from 'moment';
import Appmodelone  from '../ordermd/modal';
import RemarkText from './remarkModal';
const FormItem = Form.Item;
const Option = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
const confirm = Modal.confirm;


const averageRecPricesd=<Tooltip placement="top" title='Q掌柜预订后仓库尚未发货的商品数量'>预定未发货数量&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
const diffQtysd=<Tooltip placement="top" title='仓库（包含门店）已经发货本门店尚未收货的商品数量'>发货未收货数量&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;
const adjustAmount=<Tooltip placement="top" title='Q掌柜预订或者其他门店调拨本门店尚未收货的商品数量'>预订未收货数量&nbsp;<Icon type="exclamation-circle-o" /></Tooltip>;


class Onwaying extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            inputValues:{},
            dataSource:[],
            total:0,
            currentPage:0,
            limit:15,
            searchvalue:{}
        };
        this.columns = [{
            title: '商品条码',
            dataIndex: 'goodCode',
        },{
            title: '商品名称',
            dataIndex: 'goodName',
        },{
            title: '规格',
            dataIndex: 'displayName',
        },{
            title: averageRecPricesd,
            dataIndex: 'waitDeliveryQty',
        },{
            title: diffQtysd,
            dataIndex: 'receivingQty',
        },{
            title: adjustAmount,
            dataIndex: 'waitReceiveQty',
        }];
    }


    //分页1
    pageChange =(current,limit)=> {
        const {inputValues} = this.state;
        const currentPage = current - 1;
        const values = {currentPage,limit,...inputValues};
        this.setState({
            limit,
            currentPage
        },function(){
            this.sendRequest(values)
        })
    }
    //分页2
    onShowSizeChange =(currentPage, limit)=> {
        const {inputValues} = this.state;
        const values = {limit,...inputValues};
        this.setState({
            limit
        },function(){
            this.sendRequest(values);
        });
    }
    sendRequest =(values)=> {
      this.props.dispatch({ type: 'tab/loding', payload:true});
      const result = GetServerData('qerp.web.qpos.pd.unreceived.query',values)
      result.then((res) => {
          return res;
      }).then((json) => {
          this.props.dispatch({ type: 'tab/loding', payload:false});
          if(json.code=='0'){
            const goods = json.goods;
            for(let i=0;i<goods.length;i++){
                goods[i].key = i+1;
            };
            this.setState({
                searchvalue:values,
                dataSource:goods,
                total:Number(json.total),
                limit:json.limit,
                currentPage:json.currentPage
            });
          };
      });
    }
    //搜索
    handleSearch = (e) =>{
        this.props.form.validateFields((err, values) => {
          values.spShopId=this.props.shopId;
          values.limit = this.state.limit;
          removeSpace(values);
          const {limit,..._values} = values;
          this.setState({
            inputValues:_values
          });
          this.sendRequest(values);
        });
    }



    //导出数据
    exportDatas =()=> {
      const data = removeSpace(this.state.searchvalue);
      this.exportData(87,data)
    }
    exportData = (type,data) => {
      removeSpace(data);
  		const values={
  			type:type,
  			downloadParam:data,
  		};
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
  			};
  		})
	}
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="daily-bill border-top-style">
                <div>
                <Form  className='formbox'>
                    <Row gutter={40} className='formbox_row' style={{marginTop:"20px"}}>
                        <Col span={24} className='formbox_col'>
                            <Row>
                                <div className='serach_form'>
                                <FormItem
                                    label="商品名称"
                                    >
                                    {getFieldDecorator('name')(
                                        <Input placeholder="请输入商品名称" autoComplete="off"/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label="商品条码"
                                    >
                                    {getFieldDecorator('code')(
                                        <Input placeholder="请输入商品条码" autoComplete="off"/>
                                    )}
                                </FormItem>
                                </div>
                            </Row>
                        </Col>
                    </Row>
                    <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
                        <Button type="primary"  onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
                    </div>
                </Form>
                <Button
      						type="primary"
      						size='large'
      						className='mt20'
      						onClick={this.exportDatas.bind(this)}
      					>
      						导出数据
      					</Button>
                <div className="mt15">
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
            </div>
        );
    }

    componentDidMount(){
        this.handleSearch();
    }
}



const Onwayingindex = Form.create()(Onwaying);

export default connect()(Onwayingindex);
