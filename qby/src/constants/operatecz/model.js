import { Button, Modal, Form, Input,Select } from 'antd';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
import Imgmodel from '../../components/model/modelimg';

const FormItem = Form.Item;
const CollectionCreateForm = Form.create()(
    (props) => {
        const { visible, onCancel, onCreate, form,title,url,repeatNos,hingonCancel} = props;
        const { getFieldDecorator } = form;
        console.log(repeatNos)
        return (
            <Modal
                visible={visible}
                title={title}
                onCancel={hingonCancel}
                footer={[
                    <Button key="back" onClick={onCancel}>审核不通过</Button>,
                    <Button key="submit" type="primary" onClick={onCreate}>审核通过</Button>
                  ]}

            >
                <Form>
                    <FormItem 
                        label="充值门店"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        className='parentinput'
                    >
                        {getFieldDecorator('shopName', {
                        })( 
                            <Input disabled/>
                        )}
                    </FormItem>
                    <FormItem 
                        label="充值金额"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        className='parentinput'
                    >
                        {getFieldDecorator('amount', {
                        })(
                            <Input disabled/>
                        )}
                    </FormItem>
                    <FormItem 
                        label="品牌图片"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                        >
                        {getFieldDecorator('url', {
                        })(
                            <Imgmodel picUrl={url}/>
                        )}
                    </FormItem>
                    {
                        repeatNos.length?
                        (
                            <FormItem
                                style = {{marginBottom:'0'}}
                                wrapperCol={{ offset: 5}}
                            >
                                <p style={{color:'red',lineHeight:'16px',marginBottom:5,marginTop:5}}>
                                    此凭证与
                                    {
                                        repeatNos.join('，')
                                    }
                                    图片相同
                                </p>
                            </FormItem>
                        ):''
                    }
                    <FormItem 
                        label="不通过理由"
                        labelCol={{ span: 5 }}
                        wrapperCol={{ span: 12 }}
                    >
                        {getFieldDecorator('remark', {
                            rules: [{ required: true, message: '请选择' }],
                        })(
                            <Select placeholder='请选择不通过理由'>
                                <Option value='充值金额模糊'>充值金额模糊</Option>
                                <Option value="金额填写不一致">金额填写不一致</Option>
                                <Option value="收款户名错误">收款户名错误</Option>
                                <Option value="收款账号信息错误">收款账号信息错误</Option>
                                <Option value="收款银行信息错误">收款银行信息错误</Option>
                                <Option value="未查收到该笔银行转账">未查收到该笔银行转账</Option>
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Modal>
        );
    }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
        repeatNos:[]
    };
    showModal = () => {
        this.setState({ visible: true },function(){
            const values={spVoucherId:this.props.data.spVoucherId}
            const result=GetServerData('qerp.web.sp.voucher.detail',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                console.log(json)
                if(json.code=='0'){
                    this.setValues()
                    this.setState({
                        repeatNos:json.repeatNos
                    })
                }
            }) 
        });
    }
    onCancel=()=>{
        this.setState({ visible: false });
    }
    handleCancel = () => {
        const form = this.form;
        form.validateFields((err, value) => {
            if (err) {
                return;
            }
            const values={spVoucherId:this.props.data.spVoucherId,status:'2',remark:value.remark}
            const result=GetServerData('qerp.web.sp.voucher.audit',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code=='0'){
                    form.resetFields();
                    this.setState({ visible: false },function(){
                        this.refresh()
                    });
                    
                }
            })
        });
    }

    refresh=()=>{
        const values=this.props.values
        this.props.dispatch({
            type:'operatecz/fetch',
            payload:{code:'qerp.web.sp.voucher.query',values:values}
        })
    }
    handleCreate = () => {
        const values={spVoucherId:this.props.data.spVoucherId,status:'1'}
        const result=GetServerData('qerp.web.sp.voucher.audit',values)
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({ visible: false });
                this.refresh()
            }
        })
    }
    saveFormRef = (form) => {
        this.form = form;
    }
    setValues=()=>{
        const form = this.form;
        const data=this.props.data
        form.setFieldsValue({
            shopName:data.shopName,
            amount:data.amount
        });
    }

    render() {
        return (
            <div style={{display:'inline-block'}}>
                { 
                    this.props.type=='1'
                    ?
                    <div onClick={this.props.types=='1'?this.showModal:null} className={this.props.types=='1'?'theme-color pointer':null}>
                            {this.props.text}
                    </div>
                    :
                    <Button type={this.props.statetype} onClick={this.showModal}>{this.props.text}</Button>
                }
        
                    <CollectionCreateForm
                        ref={this.saveFormRef}
                        visible={this.state.visible}
                        onCancel={this.handleCancel}
                        onCreate={this.handleCreate}
                        hingonCancel={this.onCancel}
                        setValues={this.setValues}
                        data={this.props.data}
                        title={this.props.title}
                        url={this.props.url}
                        repeatNos={this.state.repeatNos}
                    />
            </div>
        );
    }
}

function mapStateToProps(state) {
     const {values} = state.operatecz;
     return {values};
}


export default connect(mapStateToProps)(CollectionsPage);

