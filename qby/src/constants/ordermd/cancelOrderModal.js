import { Button, Modal, Form, Input, Radio ,message} from 'antd';
import {GetServerData} from '../../services/services';
import { connect } from 'dva';
const FormItem = Form.Item;
const { TextArea } = Input;

const CollectionCreateForm = Form.create()(
  (props) => {
    const { visible, onCancel, onCreate, form } = props;
    const { getFieldDecorator } = form;
    return (
      <Modal
        visible={visible}
        title="取消订单"
        okText="确定"
        onCancel={onCancel}
        onOk={onCreate}
      >
        <Form layout="vertical">
          <FormItem label="取消原因" colon={true}>
            {getFieldDecorator('cancelReason',{
                 rules: [{ required: true, message: '请输入取消原因、必填、100字以下!' }],
             })(<TextArea rows={4} placeholder="请输入取消原因、必填、100字以下" maxLength={100}/>)}
          </FormItem>
        </Form>
      </Modal>
    );
  }
);

class CollectionsPage extends React.Component {
    state = {
        visible: false,
    };
    showModal = () => {
        this.setState({ visible: true });
    }
    handleCancel = () => {
        this.setState({ visible: false });
    }
    handleCreate = () => {
        const form = this.form;
        form.validateFields((err, values) => {
            if (err) {
                return;
            }
            values.spOrderId=this.props.spOrderId;
            const result=GetServerData('qerp.web.sp.order.cancel',values)
            result.then((res) => {
                return res;
            }).then((json) => {
                if(json.code=='0'){
                        form.resetFields();
                        //获取订单信息列表
                        this.props.dispatch({
                            type:'ordermd/infofetch',
                            payload:{code:'qerp.web.sp.order.detail.page',values:{spOrderId:this.props.spOrderId}}
                        });
                        //获取物流和订单日志列表
                        this.props.dispatch({
                            type:'ordermd/infofetchTwo',
                            payload:{code:'qerp.web.sp.order.detail',values:{spOrderId:this.props.spOrderId}}
                        });
                        this.props.dispatch({
                            type:'ordermd/fetch',
                            payload:{code:'qerp.web.sp.order.query',values:this.props.values}
                        });
                        this.setState({ 
                            visible: false 
                        },function(){
                            message.success('订单取消成功',.8)
                        });
                }
            })
        });
    }
    saveFormRef = (form) => {
            this.form = form;
    }
    render() {
        return (
            <div>
                {/* <Button type="primary" onClick={this.showModal}>取消订单</Button> */}
                <CollectionCreateForm
                ref={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
    const {values} = state.ordermd;
	return {values};
}
export default connect(mapStateToProps)(CollectionsPage);