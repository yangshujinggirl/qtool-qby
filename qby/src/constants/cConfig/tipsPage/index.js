import React,{Component} from 'react'
import {Button,Form,Input,Row,Col,message } from 'antd'
import {getInfoApi,saveInfoApi} from '../../../services/cConfig/index.js'
const FormItem = Form.Item
const TextArea = Input.TextArea
import './index.less'

class TipPage extends Component{
  constructor(props){
    super(props)
    this.state={
      dataSource:[
        {label:'国内仓提单页提示'},
        {label:'保税仓提单页提示'},
        {label:'品牌直供提单页提示'},
      ]
    }
  }
  componentWillMount =()=> {
    getInfoApi().then(res=>{
      if(res.code == '0'){
        const {dataSource} = this.state;
        const {configurelist} = res;
        if(configurelist && configurelist[0]){
          dataSource.map((item,index)=>{
            item = Object.assign(item,configurelist[index])
          });
          this.setState({
            dataSource
          });
        };
      };
    })
  }
  handleSubmit =()=> {
    this.props.form.validateFields((err,values)=>{
      if(!err){
        const newValues = this.formate(values);
        saveInfoApi(newValues).then(res=>{
          if(res.code == '0'){
            message.success('保存成功',.8)
          };
        })
      };
    });
  }
  formate =(values)=> {
    const newList = _.cloneDeep(values.list);
    console.log(newList)
    newList.map((item,index) => {
      item.type=index+1;
      item.configureId = this.state.dataSource[index].configureId;
    });
    if(!newList) return;
    values.configurelist = newList
    delete values.list;
    return values
  }
  render(){
    console.log(this.state.dataSource)
    const FormLayout = {
      labelCol:{ span: 6},
      wrapperCol:{ span: 8 }
    };
    const { getFieldDecorator } = this.props.form;
    const {dataSource} = this.state;
    return(
      <div className='tipsBox'>
        <Form>
          {dataSource.map( (item,index) => (
              <FormItem
                key={index}
                labelCol={{span:4}}
                wrapperCol={{span:12}}
                label={item.label}
              >
                {
                  getFieldDecorator(`list[${index}].text`,{
                    initialValue:item.text
                  })(
                    <TextArea rows={4} placeholder='50字符以内' maxLength='50'/>
                  )
                }
                <div className='intro'>
                  <span>若填写，则C端展示，请谨慎填写</span><br/>
                  <span>若清空，则C端不展示</span>
                </div>
              </FormItem>
            ))
          }
          <FormItem wrapperCol={{span:12}} className='btn'>
            <Button size='large' type='primary' onClick={this.handleSubmit}>保存</Button>
          </FormItem>
        </Form>
      </div>
    )
  }
}
const TipsPage = Form.create({})(TipPage);
export default TipsPage
