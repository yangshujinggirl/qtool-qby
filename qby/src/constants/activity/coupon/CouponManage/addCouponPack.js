import React,{Component} from 'react'
import {Form,Button,Input,Row,Col,message} from 'antd'
import {connect} from 'dva'
import {addCouponPackApi} from '../../../../services/activity/coupon'
const TextArea = Input.TextArea;
const FormItem = Form.Item;

class AddCouponPack extends Component {
  constructor(props){
    super(props);
    this.state={
      couponPackageName:'',
      couponCodes:'',
      updateUserId:'',
      updateUserName:'',
      couponBatchNo:'',
    }
  }
  componentDidMount =()=> {
    const {data} = this.props;
    if(data){
      let {
        couponPackageId,
        couponPackageName,
        couponCodes,
        updateUserId,
        updateUserName,
        couponBatchNo
      } = this.props.data;
      couponCodes = couponCodes&&couponCodes.split(',');
      couponCodes =  couponCodes&&couponCodes.join('\n')
      this.setState({
        couponPackageId,
        couponPackageName,
        couponCodes,
        updateUserId,
        updateUserName,
        couponBatchNo,
      });
    };
  }
  cancel =()=> {
    const {data} = this.props;
    let componkey=this.props.componkey;
    if(data){
      componkey=this.props.componkey+data.couponPackageId
    };
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:componkey
    });
  }
  handleSubmit =()=> {
    let {data,componkey} = this.props;
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        let {couponCodes} = values;
        let tempCodes = [];
        if(couponCodes){
          tempCodes=couponCodes.split('\n');
          tempCodes = tempCodes.filter(item=>item != '');
          tempCodes = tempCodes.map( item=>item.replace(/\s+/g,"") );
        };
        values.couponCodes = tempCodes;
        if(data){
          const {couponPackageId,updateUserId,updateUserName,couponBatchNo} = this.state;
          values.couponPackageId = couponPackageId;
          values.updateUserId = updateUserId;
          values.updateUserName = updateUserName;
          values.couponBatchNo = couponBatchNo;
        };
        addCouponPackApi(values)
        .then(res=>{
          if(res.code == '0'){
            if(data){
              message.success('修改成功');
              componkey = componkey + data.couponPackageId;
            }else{
              message.success('新建成功');
            };
            this.props.dispatch({
              type:'tab/initDeletestate',
              payload:componkey
            });
            this.props.dispatch({
              type:'coupon/fetchManageList',
              payload:{
                ...this.props.data.inputValues,
                limit:this.props.data3.limit,
                currentPage:this.props.data3.currentPage
              }
            })
          };
        });
      };
    });
  }
  render(){
    const {getFieldDecorator} =  this.props.form;
    const {couponPackageName,couponCodes} = this.state;
    const tips=`请输入优惠券批次号，回车分隔. \n最多15条.领取方式为手动领取的优惠券`
    return(
      <Form>
        <FormItem
          label='券包名称'
          labelCol={{span:3}}
          wrapperCol={{span:6}}
          >
        {
          getFieldDecorator('couponPackageName',{
            initialValue:couponPackageName,
            rules:[{required:true,message:'请输入券包名称'}]
          })(
            <Input placeholder='请输入券包名称，15字符以内' maxLength='15'/>
          )
        }
        </FormItem>
        <FormItem
          labelCol={{span:3}}
          wrapperCol={{span:6}}
          label='优惠券批次号'>
        {
          getFieldDecorator('couponCodes',{
            initialValue:couponCodes,
            rules:[{required:true,message:'请输入优惠券批次号'}]
          })(
            <TextArea rows={5} placeholder={tips}/>
          )
        }
        </FormItem>
        <FormItem wrapperCol={{span:10}}>
          <Row type="flex" justify="space-around">
            <Col offset={1}>
              <Button onClick={this.cancel}>取消</Button>
            </Col>
            <Col>
              <Button onClick={this.handleSubmit} type="primary">保存</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    )
  }
}
const AddCouponPacks = Form.create({})(AddCouponPack)
function mapStateToProps(state){
  const {coupon} = state;
  return {coupon};
}
export default connect(mapStateToProps)(AddCouponPacks)
