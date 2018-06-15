import { connect } from 'dva';
import { Modal, Button ,Icon,message} from 'antd';
import {GetServerData} from '../../services/services';

class Infomodel extends React.Component {
    state = { 
        visible: false,
        text:'',
        number:'',
        amount:'',
        data:{}
    }

    showModal = (data) => {
        let temAmountSum = data.spOrder.amountSum

        console.log(data)
        this.setState({
            visible: true,
            number:data.spOrder.qtySum,
            amount:temAmountSum,
            data:data
        });
    }

    handleOk = (e) => {
        console.log(this.state.data)

        this.getdata(this.state.data)
    }

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }


    //数据请求
    getdata=(value)=>{
        let result;

        console.log(value)

        if(value.spOrder.createType = '2'){
            result=GetServerData('qerp.web.sp.order.gift.save',value);
        }else{
            result=GetServerData('qerp.web.sp.order.save',value);
        }
        result.then((res) => {
            return res;
        }).then((json) => {
            if(json.code=='0'){
                this.setState({
                    visible: false,
                },function(){
                    message.success('创建成功',.8);
                    this.props.deleteTab();
                    this.props.refreshList();
                });
            }
        })
    }

    render() {
        return (
            <div>
                <Modal
                    className='infomodels'
                    title=""
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={400}
                    closable={false}
                    footer={[
                        <Button key="submit" type="primary"  onClick={this.handleOk}>
                          确定
                        </Button>,
                      ]}
                >
                    <p><span className='ml20 f30' style={{color:'#384162'}}>{this.state.text}</span></p>
                    <p className='f18 mt20 modeltext'>商品数量：{this.state.number}</p>
                    <p className='f18 mb10 modeltext'>订单金额：{this.state.amount}</p>
                </Modal>
            </div>
        );
    }
}

export default Infomodel;
