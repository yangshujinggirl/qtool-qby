import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,AutoComplete} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';

import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;
const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
class StockSearchForm extends React.Component {
  state = {
        pdCategorys:[],
        spShopId:null,
        date:null
  };

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        values.spShopId=this.state.spShopId
        values.rpDate=this.state.date
        this.initStockList(values,this.props.limit,0);
        this.syncState(values);
    });
  }
  //搜索请求数据
  initStockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'dataspfen/fetch',
            payload:{code:'qerp.web.rp.shop.Joint.division.page',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'dataspfen/synchronous',
            payload:values
        });
    }

    //智能搜索
    handleSearchs=(value)=>{
        this.setState({
            spShopId:null
        })
        let values={name:value}
        const result=GetServerData('qerp.web.sp.shop.list',values)
            result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                var shopss=json.shops
                var datasouce=[]
                for(var i=0;i<shopss.length;i++){
                    datasouce.push({
                        text:shopss[i].name,
                        value:shopss[i].spShopId
                    })
                }
                this.setState({
                    dataSource:datasouce
                });
            }
        })
    }

    //智能选择
    onSelect=(value)=>{
        this.setState({
            spShopId:value
        })
    }
    timeChange=(date,dateString)=>{
        this.setState({
            date:dateString
        })
    }



  render() {
      const { getFieldDecorator } = this.props.form;
      const adminType=eval(sessionStorage.getItem('adminType'));
    return (
      <Form className='formbox'>
        <Row gutter={40} className='formbox_row'>
            <Col span={24} className='formbox_col'>
                <Row>
                <div className='serach_form'>
                    <FormItem label='门店名称'>
                        {getFieldDecorator('name')(
                        <AutoComplete size="large"
                            dataSource={this.state.dataSource}
                            onSelect={this.onSelect}
                            onSearch={this.handleSearchs}
                            placeholder='请选择门店名称'
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                        )}
                    </FormItem>
                    <FormItem 
                        label='选择时间'
                    >
                        {getFieldDecorator('codes',{
                              initialValue:moment(this.state.date, dateFormat)
                        })(
                            <DatePicker format={dateFormat} className='noant-calendar-picker' onChange={this.timeChange.bind(this)}/>
                        )}
                    </FormItem>


                    </div>
                </Row>
            </Col>
        </Row>
        <div style={{'position':'absolute','right':'0','bottom':'24px'}}>
            <Button type="primary" htmlType="submit" onClick={this.handleSearch.bind(this)} size='large'>搜索</Button>
        </div>
      </Form>
    );
  }

  componentDidMount(){
    var myDate=new Date()
    myDate.setTime(myDate.getTime()-24*60*60*1000);
    const yesterday=String(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate())
    this.setState({
        date:yesterday
    },function(){
        this.handleSearch()
    })
    




    

}
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.dataspfen;
    return {limit,currentPage};
}

const DataspfenSearch = Form.create()(StockSearchForm);
export default connect(mapStateToProps)(DataspfenSearch);