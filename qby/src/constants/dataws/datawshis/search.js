import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker} from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import {getCategoryApi} from "../../../services/goodsCenter/baseGoods"
import {removeSpace} from '../../../utils/meth';
const FormItem = Form.Item;
const Option = Select.Option
const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

class BatchStockSearchForm extends React.Component {
  state = {
    date:null,
    categoryList2:[]
  };

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        values.date=this.state.date
        this.initList(values,this.props.limit,0);
        this.syncState(values);
    });
  }

  //搜索请求数据
  initList=(values,limit,currentPage)=>{
        values.date=this.state.date
        values.limit=limit;
        values.currentPage=currentPage;
        removeSpace(values);
        this.props.dispatch({
            type:'datawshis/fetch',
            payload:{code:'qerp.web.pd.historyInvdata.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'datawshis/synchronous',
            payload:values
        });
    }

    hindtimeChange=(date,dateString)=>{
        this.setState({
            date:dateString
        })

    }
    //分类发生变化
    onChange=(value)=>{
      if(!value){
        this.setState({
          categoryList2:[]
        });
        this.props.form.resetFields(["pdCategory2Id"])
      };
    }
    //一级分类选中
    onSelect=(value)=>{
      this.props.form.resetFields(["pdCategory2Id"])
      getCategoryApi({level:2,parentId:value,status:1})
      .then(res=>{
        if(res.code == "0" ){
          this.setState({
            categoryList2:res.pdCategory
          })
        }
      })
    }

  render() {
      const { getFieldDecorator } = this.props.form;
      const {categoryList} = this.props;
      const {categoryList2} = this.state;
      const adminType=eval(sessionStorage.getItem('adminType'));
    return (
      <Form  className='formbox'>
        <Row gutter={40} className='formbox_row'>
            <Col span={24} className='formbox_col'>
                <Row>
                <div className='serach_form'>
                <FormItem label='商品名称'>
                {getFieldDecorator('pdSpuName')(
                <Input placeholder="请输入商品名称" autoComplete="off"/>
                )}
            </FormItem>
            <FormItem label='商品编码'>
                {getFieldDecorator('pdCode')(
                    <Input placeholder="请输入商品编码" autoComplete="off"/>
                )}
            </FormItem>
            <FormItem label='商品条码'>
                {getFieldDecorator('pdBarcode')(
                <Input placeholder="请输入商品条码" autoComplete="off"/>
                )}
            </FormItem>
            <FormItem label='选择时间'>
                {getFieldDecorator('ccname',{
                      initialValue:moment(this.state.date, dateFormat)
                })(
                    <DatePicker
                        format={dateFormat}
                        onChange={this.hindtimeChange.bind(this)}
                        className='noant-calendar-picker'
                        allowClear={false}
                    />
                )}
            </FormItem>
            <FormItem label='一级分类'>
               {getFieldDecorator('pdCategory1Id')(
                 <Select
                   placeholder="请选择一级分类"
                   allowClear={true}
                   onSelect={this.onSelect}
                   onChange={this.onChange}
                   >
                   {
                    categoryList.length>0 && categoryList.map((el) => (
                       <Select.Option
                         value={el.pdCategoryId}
                         key={el.pdCategoryId}>{el.name}</Select.Option>
                     ))
                   }
                 </Select>
               )}
             </FormItem>
             <FormItem label='二级分类'>
                {getFieldDecorator('pdCategory2Id')(
                  <Select disabled={!categoryList2.length>0} placeholder="请选择二级分类" allowClear={true}>
                    {
                     categoryList2.length>0 && categoryList2.map((el) => (
                        <Select.Option
                          value={el.pdCategoryId}
                          key={el.pdCategoryId}>{el.name}</Select.Option>
                      ))
                    }
                  </Select>
                )}
            </FormItem>

                </div>
                </Row>
            </Col>
        </Row>
        <div style={{'position':'absolute','right':'0','bottom':'20px'}}>
            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
        </div>
      </Form>
    );
  }
  componentDidMount(){
    var myDate=new Date()
    myDate.setTime(myDate.getTime()-24*60*60*1000);
    const yesterday=String(myDate.getFullYear()+'-'+("0"+(myDate.getMonth()+1)).slice(-2)+'-'+("0"+myDate.getDate()).slice(-2))
    this.setState({
        date:yesterday
    },function(){
        this.handleSearch()
    })

  }
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.datawshis;
    return {limit,currentPage};
}

const DatawshisSearch = Form.create()(BatchStockSearchForm);
export default connect(mapStateToProps)(DatawshisSearch);
