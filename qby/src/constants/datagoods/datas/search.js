import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,AutoComplete} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';
import moment from 'moment';

const FormItem = Form.Item;
const dateFormat = 'YYYY-MM-DD';
const RangePicker = DatePicker.RangePicker;

class StockSearchForm extends React.Component {
    state = {
        pdCategorys:[],
        spShopId:null,
        startRpDate:null,
        endRpDate:null
    };

    //点击搜索按钮获取搜索表单数据
    handleSearch = (e) => {
        this.props.form.validateFields((err, values) => {
            values.startRpDate=this.state.startRpDate
            values.endRpDate=this.state.endRpDate
            this.initStockList(values,this.props.limit,0);
            this.syncState(values);
        });
    }
  //搜索请求数据
    initStockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'datas/fetch',
            payload:{code:'qerp.web.rp.spu.data.page',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'datas/synchronous',
            payload:values
        });
    }

    hindDateChange=(date,dateString)=>{
        console.log(dateString)
        this.setState({
            startRpDate:dateString[0],
            endRpDate:dateString[1]
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
                    <FormItem label='商品名称'>
                        {getFieldDecorator('name')(
                        <Input placeholder="请输入商品编码"/>
                        )}
                    </FormItem>
                    <FormItem label='商品条码'>
                        {getFieldDecorator('barcode')(
                        <Input placeholder="请输入商品条码"/>
                        )}
                    </FormItem>
                    <FormItem label='商品编码'>
                        {getFieldDecorator('code')(
                        <Input placeholder="请输入商品条码"/>
                        )}
                    </FormItem>
                    
                    <FormItem 
                        label='销售时间'
                    >
                        {getFieldDecorator('date',{
                            initialValue:[moment(this.state.startRpDate,dateFormat), moment(this.state.startRpDate, dateFormat)]
                        })(
                            
                            <RangePicker
                            showTime
                            format="YYYY-MM-DD"
                            onChange={this.hindDateChange.bind(this)}
                           
                        />
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
    const tody=String(myDate.getFullYear()+'-'+(myDate.getMonth()+1)+'-'+myDate.getDate())
    const startRpDate=tody
    const endRpDate=tody
    this.setState({
        startRpDate:startRpDate,
        endRpDate:endRpDate
    },function(){
        this.handleSearch()
    })

    

}
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.datasphiscun;
    return {limit,currentPage};
}

const DatasphiscunSearch = Form.create()(StockSearchForm);
export default connect(mapStateToProps)(DatasphiscunSearch);