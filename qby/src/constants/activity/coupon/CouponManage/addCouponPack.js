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
      isLoading:false,
      couponPackageName:'',
      couponCodes:'',
      updateUserId:'',
      updateUserName:'',
      couponBatchNo:'',
    }
  }
  componentDidMount =()=> {
    const {data} = this.props;
    if(data.couponPackageId){
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
    if(data.couponPackageId){
      componkey=this.props.componkey+data.couponPackageId
    };
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:componkey
    });
  }
  handleSubmit =()=> {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      if(!err){
        let {couponCodes} = values;
        let tempCodes = [];
        if(couponCodes){
          tempCodes = couponCodes.split('\n');
          tempCodes = tempCodes.filter(item=>item != '');
          tempCodes = tempCodes.map( item=>item.replace(/\s+/g,"") );
        };
        if(tempCodes.length>15){message.error('最多支持输入15个批次',.8); return;}
        values.couponCodes = tempCodes;
        let {data,componkey} = this.props;
        if(data.couponPackageId){
          const {couponPackageId,updateUserId,updateUserName,couponBatchNo} = this.state;
          values.couponPackageId = couponPackageId;
          values.updateUserId = updateUserId;
          values.updateUserName = updateUserName;
          values.couponBatchNo = couponBatchNo;
        };
        this.setState({isLoading:true})
        addCouponPackApi(values)
        .then(res=>{
          if(res.code == '0'){
            if(data.couponPackageId){
              message.success('修改成功',.8);
              componkey = componkey + data.couponPackageId;
            }else{
              message.success('新建成功',.8);
            };
            this.props.dispatch({
              type:'tab/initDeletestate',
              payload:componkey
            });
            this.props.dispatch({
              type:'coupon/fetchManageList',
              payload:{
                ...this.props.data.inputValues,
                limit:this.props.coupon.data3.limit,
                currentPage:this.props.coupon.data3.currentPage
              }
            })
            this.setState({isLoading:false})
          }else{
            this.setState({isLoading:false})
          }
        });
      };
    });
  }
  formatValue =()=> {

  }
  render(){
    console.log(this.props)
    const {getFieldDecorator} =  this.props.form;
    const {couponPackageName,couponCodes,isLoading} = this.state;
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
            <Input placeholder='请输入券包名称，15字符以内' autoComplete='off' maxLength='15'/>
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
            <TextArea rows={5} placeholder={tips} disabled={this.props.data.couponPackageId}/>
          )
        }
        </FormItem>
        <FormItem wrapperCol={{span:10}}>
          <Row type="flex" justify="space-around">
            <Col offset={1}>
              <Button onClick={this.cancel}>取消</Button>
            </Col>
            <Col>
              <Button onClick={this.handleSubmit} loading={isLoading} type="primary">保存</Button>
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
