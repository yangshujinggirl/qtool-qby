import { Component } from "react";
import { Modal, Form, Input } from "antd";
import {connect} from 'dva'
const FormItem = Form.Item;

class setModal extends Component {
  constructor(props) {
    super(props);
    this.state={
      perOrderLimit:'',
      perDayLimit:'',
      perUserLimit:'',
    }
  }
  componentWillReceiveProps=(nextProps)=>{
    if(!_.isEqual(nextProps.currentRecord,this.props.currentRecord)){
      this.setState({
        perOrderLimit:nextProps.currentRecord.perOrderLimit,
        perDayLimit:nextProps.currentRecord.perDayLimit,
        perUserLimit:nextProps.currentRecord.perUserLimit,
      })
    }
  }
  onOk = () => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        let goodLists = [...this.props.goodLists];
        let obj = goodLists[this.props.currentIndex];
        obj = {...obj,...values};
        goodLists[this.props.currentIndex] = obj;
        this.props.dispatch({
          type:'ctipActivityAddTwo/refreshLists',
          payload:{goodLists}
        });
        this.props.onVisible();
      }
    });
  };
  onCancel = () => {
    this.props.onVisible();
    this.props.form.resetFields();
  };
  validateActPrice=(rule,value,callback)=>{
    if(value && value>=this.props.currentRecord.sellPrice){
      callback('活动价需小于C端售价')
    };
    callback();
  }
  valideOrder=(rule,value,callback)=>{
    const {perDayLimit,perUserLimit} = this.state;
    if(value && (value >= perDayLimit||value >= perUserLimit) ){
      callback('每单限购小于每天限购小于每账号限购，请重新填写')
    };
    callback()
  }
  valideDay=(rule,value,callback)=>{
    const {perUserLimit} = this.state;
    if(value && (value >= perUserLimit) ){
      callback('每单限购小于每天限购小于每账号限购，请重新填写')
    } 
    callback()
  }
  valideUser=(rule,value,callback)=>{
    const {perDayLimit,perOrderLimit} = this.state;
    if(value && (value <= perDayLimit||value <= perOrderLimit) ){
      callback('每账号限购大于每天限购大于每单限购，请重新填写')
    };
    callback();
  }
  setOrder=(e)=>{
    const {value} = e.target;
    this.setState({
      perOrderLimit:value
    });
  }
  setDay=(e)=>{
    const {value} = e.target;
    this.setState({
      perDayLimit:value
    });
  }
  setUser=(e)=>{
    const {value} = e.target;
    this.setState({
      perUserLimit:value
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { visible,currentRecord } = this.props;
    return (
      <div>
        <Modal
          width='600'
          title="编辑商品"
          visible={visible}
          onOk={this.onOk}
          onCancel={this.onCancel}
          wrapClassName="add_brand"
        >
          <Form>
            <FormItem
              label="商品编码"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <span>{currentRecord.pdCode}</span>
            </FormItem>
            <FormItem
              label="活动价"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("activityPrice", {
                initialValue:currentRecord.activityPrice,
                rules: [
                  { required: true, message: "请输入活动价" },
                  {validator:this.validateActPrice}
                ]
              })(<Input style={{ width: "100px" }} autoComplete="off" />)}
            </FormItem>
            <FormItem
              label="最多可参与活动的商品数"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("maxQty", {
                initialValue:currentRecord.maxQty,
              })(
                <Input style={{ width: "100px" }} autoComplete="off" />
              )}
              <span className="suffix_tips">
                如不填写视为商品的所有库存均参与活动
              </span>
            </FormItem>
            <FormItem
              label="活动期间每人每单限购"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("perOrderLimit", {
                initialValue:currentRecord.perOrderLimit,
                rules:[
                  {validator:this.valideOrder}
                ]
              })(
                <Input onChange={this.setOrder} style={{ width: "100px" }} autoComplete="off" />
              )}
              <span className="suffix_tips">如不填写则不限制购买数量</span>
            </FormItem>
            <FormItem
              label="活动期间每人每天限购"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("perDayLimit", {
                initialValue:currentRecord.perDayLimit,
                rules:[
                  {validator:this.valideDay}
                ]
              })(
                <Input onChange={this.setDay} style={{ width: "100px" }} autoComplete="off" />
              )}
              <span className="suffix_tips">如不填写则不限制购买数量</span>
            </FormItem>
            <FormItem
              label="活动期间每人每账号限购"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              {getFieldDecorator("perUserLimit",{
                initialValue:currentRecord.perUserLimit,
                rules:[
                  {validator:this.valideUser}
                ]
              })(
                <Input onChange={this.setUser} style={{ width: "100px" }} autoComplete="off" />
              )}
              <span className="suffix_tips">如不填写则不限制购买数量</span>
            </FormItem>
          </Form>
        </Modal>
      </div>
    );
  }
}
function mapStateToProps(state){
  const {ctipActivityAddTwo} = state;
  return ctipActivityAddTwo
}
const setModals = Form.create()(setModal);
export default connect(mapStateToProps)(setModals);
