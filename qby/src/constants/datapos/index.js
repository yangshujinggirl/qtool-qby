
import {GetServerData} from '../../services/services';
import { Button, Icon,Tabs,Input,Form,AutoComplete} from 'antd';
import { connect } from 'dva';
import { Link } from 'dva/router';
import '../../style/dataManage.css';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

class DataposIndexForm extends React.Component{
	state = {
        shopId:null,
        sureShopId:null,
        dataSources:[],
    };

    //智能搜索框搜索事件
    handleSearch = (value) => {
        let data={name:value};
        const result=GetServerData('qerp.web.sp.shop.list',data);
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                let shopList=json.shops;
                let dataSources=[];
                for(let i=0;i<shopList.length;i++){
                    dataSources.push({
                        text:shopList[i].name,
                        value:shopList[i].spShopId,
                        key:i
                    })
                }
                this.setState({
                    dataSources:dataSources,
                    shopId:null,
                    sureShopId:null
                });
            }
        })
    }

    //在选择的时候
    onSelect=(value)=>{
        this.setState({
            shopId:value
        })
    }

    //保存
	handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                let selectShopId = this.state.shopId;
                this.setState({
                    sureShopId:selectShopId
                },function(){

                })
            }
        })
    }

  	render(){
        const { getFieldDecorator } = this.props.form;       
     	return(
        	<div className='content_box stock-tabs data-pos'>
            {
                !this.state.sureShopId?
                <div style={{width:"100%",paddingTop:"200px",textAlign:"center",verticalAlign:"middle"}}>
                    <Form className="search-shop">
                        <FormItem
                            label="门店名称"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                        >
                            {getFieldDecorator('shopName', {
                                rules: [{ required: true, message: '请选择门店名称'}],
                            })(
                                <AutoComplete
                                    dataSource={this.state.dataSources}
                                    onSelect={this.onSelect}
                                    onSearch={this.handleSearch}
                                    placeholder='请选择门店名称'
                                />
                            )}
                        </FormItem>
                        <Button htmlType="submit" type="primary" style={{marginTop:"1px"}} onClick={this.handleSubmit.bind(this)}>搜索</Button>
                    </Form>
                </div>
                :
                <Tabs defaultActiveKey="1">
                    <TabPane tab="每日对账单" key="1">
                        {/* <DataspsellIndex/> */}
                    </TabPane>
                    <TabPane tab="热销商品" key="2">
                        {/* <DataspcunIndex/> */}
                    </TabPane>
                    <TabPane tab="店员销售" key="3">
                        {/* <DataspsellIndex/> */}
                    </TabPane>
                    <TabPane tab="收货报表" key="4">
                        {/* <DataspsellIndex/> */}
                    </TabPane>
                    <TabPane tab="利润报表" key="5">
                        {/* <DataspsellIndex/> */}
                    </TabPane>
                    <TabPane tab="进销存报表" key="6">
                        {/* <DataspsellIndex/> */}
                    </TabPane>
                </Tabs>
            }
        	</div>
      	)
  	}
}

const DataposIndex = Form.create()(DataposIndexForm);

export default connect()(DataposIndex);
