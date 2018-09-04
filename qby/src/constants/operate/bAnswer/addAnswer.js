import React,{ Component } from 'react';
import { Form, Select, Input, Button , message} from 'antd';
import { connect } from 'dva'
import moment from 'moment';
import EditAction from './components/EditAction/index.js';
import { getDetailApi, getSaveApi } from '../../../services/operate/bAnswer';

const FormItem = Form.Item;
const Option = Select.Option;
import './index.less'

class AddanswerForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      type:'',
      status:'',
      title:'',
      content:[],
      loading:false,
    }
  }
  componentDidMount(){
    this.initData()
  }
  initData =()=> {
    if(this.props.data.pdAnswerId){
      this.getDetail();
    };
  }
  //编辑
  getDetail() {
    const { pdAnswerId } = this.props.data;
    this.props.dispatch({type: 'tab/loding',payload:true});
    getDetailApi({pdAnswerId})
    .then(res => {
      const { code, iPdAnswer, fileDomain } = res;
      if(code != '0') {
        return;
      }
      let content = [];
      if(iPdAnswer.pdAnswerConfig&&iPdAnswer.pdAnswerConfig.content) {
        content = JSON.parse(iPdAnswer.pdAnswerConfig.content)
      }
      content.length>0&&content.map((el,index) => {
        el.key = index;
        if(el.type == '1') {
          return el;
        }
        el.content = [{
          uid:index,
          name:el.content,
          url: `${fileDomain}${el.content}`,
          status:'done'
        }]
        return el;
      })
      this.props.dispatch({type: 'tab/loding',payload:false});
      this.setState({
        type:iPdAnswer.type,
        status:iPdAnswer.status,
        title:iPdAnswer.title,
        content,
        pdAnswerConfigId:iPdAnswer.pdAnswerConfig.pdAnswerConfigId
      });
    })
  }
  //标题
  changeTitle =(e)=> {
    e.persist();
    const value = e.nativeEvent.target.value;
    this.setState({
      title:value
    })
  }
  //保存
  handleSubmit = (e) => {
    this.props.form.validateFieldsAndScroll((err,values)=>{
      // console.log(this.formtParams(values))
      // console.log(values)
      if(err) {
        return;
      }
      values = this.formtParams(values);
      this.goSave({pdAnswer:values})
    })
  }
  //参数格式化
  formtParams(values) {
    let { answerContent,...newValues} = values;
    if(answerContent) {
      answerContent.map((el) => {
        if(el.content instanceof Array) {
          if(el.content[0].response) {
            el.content = el.content[0].response.data[0]
          } else {
            el.content = el.content[0].name
          }
          el.type = '2'
        } else {
          el.type = '1'
        }
        return el;
      })
    }

    let pdAnswerConfig = {
          content:answerContent
        };
    if(this.props.data.pdAnswerId) {
      pdAnswerConfig.pdAnswerConfigId = this.state.pdAnswerConfigId;
      newValues.pdAnswerId = this.props.data.pdAnswerId;
    }
    newValues = { ...newValues,pdAnswerConfig};
    return newValues;
  }
  //提交API
  goSave(values) {
    const { pdAnswerId } = this.props.data;
    let tips;
    if(pdAnswerId) {
      tips = '修改成功';
    } else {
      tips = '新建成功'
    }
    this.setState({
      loading:true
    })
    getSaveApi(values)
    .then(res => {
      const { code } =res;
      if(code == '0') {
        message.success(tips,1);
        this.props.dispatch({
          type:'bAnswer/fetchList',
          payload:{...this.props.data.listParams}
        });
        this.onCancel()
      }
      this.setState({
        loading:false
      })
    })
  }
  //取消
  onCancel(){
    const { key } = this.props.data;
    const pane = eval(sessionStorage.getItem("pane"));
    if(pane.length<=1){return}
    this.props.dispatch({
      type:'tab/initDeletestate',
      payload:key
    });
  }
  render(){
    const {
      type,
      status,
      title,
      content,
      loading
    } = this.state
    const { getFieldDecorator } = this.props.form;
    return(
      <div className="addAnswer-pages">
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
                      <Option value={10} key={10}>运营问题 </Option>
                      <Option value={20} key={20}>商品问题</Option>
                      <Option value={30} key={30}>设计问题</Option>
                      <Option value={40} key={40}>招商问题 </Option>
                      <Option value={50} key={50}>系统问题 </Option>
                      <Option value={60} key={60}>其他 </Option>
                  </Select>
              )}
            </FormItem>
            <FormItem
              label="问题状态"
              labelCol={{ span: 3,offset: 1 }}
              wrapperCol={{ span: 9 }}>
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
              wrapperCol={{ span: 9 }}>
              {getFieldDecorator('title', {
                  rules: [{ required: true, message: '请输入标题'}],
                  initialValue:title,
                  onChange:this.changeTitle
                })(
                  <Input
                    placeholder="请输入30字以内标题"
                    maxLength='30'
                    autoComplete="off"/>
              )}
            </FormItem>
            {
              content&&
              <EditAction
                title={title}
                dataSource={content}
                form={this.props.form}/>
            }
        	</Form>
          <div className='btns-list'>
            <Button className='cancel' onClick={this.onCancel.bind(this)}>取消</Button>
            <Button
              loading={loading}
              type="primary"
              onClick={this.handleSubmit}>确定</Button>
          </div>
      </div>
    )
  }
}
const Addanswers = Form.create()(AddanswerForm);
function mapStateToProps(state){
  const { bAddAnswer } = state;
  return bAddAnswer
}

export default connect(mapStateToProps)(Addanswers);
