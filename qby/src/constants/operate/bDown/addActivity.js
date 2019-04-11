import React,{ Component } from 'react';
import { Form,Input, Button,message,DatePicker,Row,Col} from 'antd';
import TableList from './components/Table/index'
import {getInfoApi,addGoodApi,updataGoodApi} from '../../../services/operate/bActPrice'
import GoodList from '../../../components/importData/index'
import moment from 'moment'
import { connect } from 'dva'
const FormItem = Form.Item;
const TextArea = Input.TextArea;
const {RangePicker} = DatePicker;
import './index.less'

import UploadData from './components/Upload'

class Addactivity extends Component {
  constructor(props){
    super(props);
    this.state={
      beginTime:moment().format('YYYY-MM-DD HH:mm:ss'),
      endTime:moment().add(1,'days').format('YYYY-MM-DD HH:mm:ss'),
      goodList:[{pdCode:'',name:'',displayName:'',toBprice:'',costPrice:'',activityPrice:''}]}
  }
  componentDidMount =()=> {
    if(this.props.data.activityId){
      const {activityId} = this.props.data;
      getInfoApi({activityId}).then(res=>{
        if(res.code=='0'){
          const {activityInfo,goodsInfos} = res;
          this.setState({
            name:activityInfo.name,
            beginTime:activityInfo.beginTime,
            endTime:activityInfo.endTime,
            remark:activityInfo.remark,
            goodList:goodsInfos
          });
        };
      })
    };
  }
  //保存
  handleSubmit = (e) => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
      if(!err){
        const {time,..._values} = values
        if(time && time[0]){
          _values.beginTime = moment(time[0]).format('YYYY-MM-DD hh:mm:ss');
          _values.endTime = moment(time[0]).format('YYYY-MM-DD hh:mm:ss');
        };
        _values.productList = this.state.goodList;
        _values.type = 2;
        if(this.props.data.activityId){//修改
          _values.activityId = this.props.data.activityId;
          this.sendRequest(_values)
        }else{
          this.sendRequest(_values)
        };
      };
    });
  }
  sendRequest =(values)=> {
    console.log(this.props)
    if(this.props.data.activityId){ //修改
      updataGoodApi(values).then(res=>{
        if(res.code == '0'){
          message.success('修改成功');
          this.props.dispatch({
            type:'tab/initDeletestate',
            payload:this.props.componkey+this.props.data.activityId
          });
          this.props.dispatch({
            type:'bDown/fetchList',
            payload:{type:2,...this.props.data.inputValues}
          })
        };
      })
    }else{
      addGoodApi(values).then(res=>{
        if(res.code == '0'){
          message.success('新增成功');
          this.props.dispatch({
            type:'tab/initDeletestate',
            payload:this.props.componkey
          });
          this.props.dispatch({
            type:'bDown/fetchList',
            payload:{type:2,...this.props.data.inputValues}
          })
        };
      });
    };
  }
  //取消
  cancel =()=> {
    let {componkey} = this.props;
    if(this.props.data.activityId){
      componkey = componkey + this.props.data.activityId;
    };
    this.props.dispatch({
        type:'tab/initDeletestate',
        payload:componkey
    });
  }
  //导入商品list
  getGoodFile=(list)=>{
    this.setState({goodList:list});
  }
  //添加商品
  addGood =()=> {
    const {goodList} = this.state;
    const list={spShopId:'',shopName:''};
    goodList.push(list)
    this.setState({
      goodList
    });
  }
  //删除商品
  deleteGood =(index)=> {
    const {goodList} = this.state;
    goodList.splice(index,1);
    this.props.form.resetFields([`pdCode`+index,'activitySupplyPrice'+index]);
    this.setState({
      goodList
    });
  }
  //改变商品list
  changeGoodList=(list,index)=>{
    const {goodList} = this.state;
    goodList[index] = list;
    this.setState({goodList});
  }
  // 更新商品list
  updataList =(goodList)=> {
    this.setState({goodList});
  }
  //验证生效时间
  validataTime =(rule,value,callback)=> {
    const start = new Date(value[0]).getTime();
    const end = new Date(value[1]).getTime();
    if(end-start > 31536000000){
      callback('活动时间范围不可超过1年')
    };
    callback()
  }
  render(){
    const {
      name,
      goodList,
      beginTime,
      endTime,
      remark
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { cBanner } = this.props;
    return(
      <div className='add_act'>
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="活动名称"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}
            >
              {getFieldDecorator('name', {
                  initialValue:name,
                  rules: [{ required: true, message: '请输入活动名称'}],
                })(
                    <Input
                      style={{width:'280px'}}
                      placeholder="请输入15字以内活动名称"
                      maxLength='15'
                      autoComplete="off"
                    />　
              )}
            </FormItem>
            <FormItem
              label="活动时间"
              labelCol={{ span:3}}
              wrapperCol={{ span:6}}
            >
              {getFieldDecorator('time', {
                  initialValue:[moment(beginTime),moment(endTime)],
                  rules: [
                    { required: true, message: '请输入活动时间'},
                    { validator: this.validataTime}
                  ],
                })(
                  <RangePicker
                    showTime
                    style={{width:'280px'}}
                    format="YYYY-MM-DD HH:mm:ss"/>
                )}
            </FormItem>
            <FormItem
              label="活动备注"
              labelCol={{ span: 3}}
              wrapperCol={{ span: 6}}
              className='act_remark'
            >
              {getFieldDecorator('remark', {
                  initialValue:remark,
                })(
                <TextArea style={{width:'280px'}} placeholder="请输入备注，50字符以内" maxLength='50'/>
              )}
            </FormItem>
            <FormItem
              label="活动商品"
              labelCol={{ span: 3}}
              wrapperCol={{ span: 18}}
              className='table_temp_list b_enter_price_list must-pic'
            >
              <GoodList
                form={this.props.form}
                FormItem={FormItem}
                getFieldDecorator={getFieldDecorator}
                getFile={this.getGoodFile}
                dataSource={goodList}
                delete={this.deleteGood}
                add={this.addGood}
                changeList={this.changeGoodList}
                updataList={this.updataList}
                addText='+商品'
                type='4'/>
            </FormItem>
            <FormItem
              labelCol={{ span: 3}}
              wrapperCol={{ span: 16}}
              className='btn_cancel_save'>
              <Row type="flex" justify="space-around">
                <Col offset={4}>
                  <Button onClick={this.cancel}>取消</Button>
                </Col>
                <Col>
                  <Button onClick={this.handleSubmit} type="primary">保存</Button>
                </Col>
              </Row>
            </FormItem>
        	</Form>
      </div>
    )
  }
}
const Addactivitys = Form.create()(Addactivity);
const mapStateToProps=(state)=>{
  const {bDown} = state;
  return {bDown}
}
export default connect(mapStateToProps)(Addactivitys);
