import { Form, Row, Col, Input, Button, Icon,Select ,DatePicker,AutoComplete} from 'antd';
import { connect } from 'dva';
import {GetServerData} from '../../../services/services';

const FormItem = Form.Item;

class StockSearchForm extends React.Component {
  state = {
    pdCategorys:[],
    spShopId:null
  };

  //点击搜索按钮获取搜索表单数据
  handleSearch = (e) => {
    this.props.form.validateFields((err, values) => {
        values.spShopId=this.state.spShopId
        this.initStockList(values,this.props.limit,0);
        this.syncState(values);
    });
  }
  //搜索请求数据
  initStockList=(values,limit,currentPage)=>{
        values.limit=limit;
        values.currentPage=currentPage;
        this.props.dispatch({
            type:'dataspcun/fetch',
            payload:{code:'qerp.web.qpos.pd.inv.query',values:values}
        });
        this.props.dispatch({ type: 'tab/loding', payload:true});
    }  

    //同步data
    syncState=(values)=>{
        this.props.dispatch({
            type:'dataspcun/synchronous',
            payload:values
        });
    }

    categorylist=()=>{
        let values={
            getChildren:false,
            enabled:true
        }
        const result=GetServerData('qerp.web.pd.category.list',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
               const pdCategorys=json.pdCategorys
               this.setState({
                    pdCategorys:pdCategorys
               })
               
            }
        })



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
                        {getFieldDecorator('bspname')(
                        <AutoComplete
                            dataSource={this.state.dataSource}
                            onSelect={this.onSelect}
                            onSearch={this.handleSearchs}
                            placeholder='请选择门店名称'
                            filterOption={(inputValue, option) => option.props.children.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1}
                        />
                        )}
                    </FormItem>
                    <FormItem label='商品名称'>
                        {getFieldDecorator('pdSpuName')(
                        <Input placeholder="请输入商品名称" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem label='商品条码'>
                        {getFieldDecorator('barcode')(
                        <Input placeholder="请输入商品条码" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem label='商品编码'>
                        {getFieldDecorator('code')(
                        <Input placeholder="请输入商品编码" autoComplete="off"/>
                        )}
                    </FormItem>
                    <FormItem label='商品分类'>
                        {getFieldDecorator('pdCategoryId')(
                           <Select  placeholder="请选择商品分类" allowClear={true}>
                            {
                                this.state.pdCategorys.map((item,index)=>{
                                    return (<Option value={String(item.pdCategoryId)} key={index}>{item.name}</Option>)
       
                                })
                            }
                            </Select>
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
      this.categorylist()
    this.handleSearch()

}
  
}
function mapStateToProps(state) {
    const {limit,currentPage} = state.dataspcun;
    return {limit,currentPage};
}

const DataspcunSearch = Form.create()(StockSearchForm);
export default connect(mapStateToProps)(DataspcunSearch);