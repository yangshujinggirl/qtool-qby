import React,{ Component } from 'react';
import { Form, Select, Input, Button , message} from 'antd';
import { getDetailApi } from '../../../services/operate/bAnswer'
import { connect } from 'dva'
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
import './index.less'

class Addanswer extends Component {
  constructor(props){
    super(props);
    this.state = {
      type:null,
      status:null,
      title:null,
      pdAnswerConfig:{},
    }
  }
  componentWillMount(){
    if(this.props.data){
      this.initData();
    };
  }
  initData =()=> {
    const { pdAnswerId } = this.props.data;
    getDetailApi({pdAnswerId})
    .then(res => {
      if(res.code == '0'){
        this.setState({
          type:res.iPdAnswer.typeStr,
          status:res.iPdAnswer.statusStr,
          title:res.iPdAnswer.title,
          pdAnswerConfig:res.iPdAnswer.pdAnswerConfig,
        });
      };
    })
  }
  //保存
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err,values)=>{

    })
  }
  formValue =()=> {

  }
  render(){
    const {
      type,
      status,
      title,
      pdAnswerConfig
    } = this.state
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="addAnswer">
        	<Form className="addUser-form operatebanner-form">
            <FormItem
              label="问题类型"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}>
              {getFieldDecorator('type', {
                  rules: [{ required: true, message: '请输入问题类型'}],
                  initialValue:type
                })(
                  <Select allowClear={true} placeholder="请选择问题类型" className='select'>
                      <Option value={10}>运营问题 </Option>
                      <Option value={20}>商品问题</Option>
                      <Option value={30}>设计问题</Option>
                      <Option value={40}>招商问题 </Option>
                      <Option value={50}>系统问题 </Option>
                      <Option value={60}>其他 </Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              label="问题状态"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('status', {
                  rules: [{ required: true, message: '请输入问题状态'}],
                  initialValue:status
                })(
                  <Select allowClear={true} placeholder="请选择问题状态" className='select'>
                      <Option value={1}>上线</Option>
                      <Option value={0}>下线</Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              label="标题"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}
            >
              {getFieldDecorator('pushTheme', {
                  rules: [{ required: true, message: '请输入标题'}],
                  initialValue:title
                })(
                  <Input placeholder="请输入30字以内标题" maxLength='30' autoComplete="off"/>
              )}
            </FormItem>
        	</Form>
          <div className='ok_btn'>
            <Button className='cancel' onClick={this.cancel}>取消</Button>
            <Button type="primary" onClick={this.handleSubmit}>确定</Button>
          </div>
      </div>
    )
  }
}
const Addanswers = Form.create()(Addanswer);
function mapStateToProps(state){
  const { bAnswer } = state;
  return bAnswer
}

export default connect(mapStateToProps)(Addanswers);
